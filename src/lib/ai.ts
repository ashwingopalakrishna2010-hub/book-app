import type { GradeResult } from '../types';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string;
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'nvidia/nemotron-3-super-120b-a12b:free';

const MAX_RETRIES = 2;
const BASE_DELAY_MS = 2000; // 2 seconds

async function callOpenRouter(messages: { role: string; content: string }[]): Promise<string> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'DeepRead',
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.choices?.[0]?.message?.content?.trim() ?? '';
    }

    // Rate limited — retry with exponential backoff
    if (res.status === 429 && attempt < MAX_RETRIES) {
      const delay = BASE_DELAY_MS * Math.pow(2, attempt); // 4s, 8s, 16s
      console.warn(`Rate limited (429). Retrying in ${delay / 1000}s... (attempt ${attempt + 1}/${MAX_RETRIES})`);
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }

    const errBody = await res.text();
    console.error('OpenRouter API error:', res.status, errBody);
    throw new Error(`OpenRouter API error: ${res.status}`);
  }

  throw new Error('OpenRouter API: max retries exceeded');
}

// ============================================
// Generate a unique question for a chapter
// ============================================
export async function generateQuestion(
  bookTitle: string,
  chapterTitle: string,
  chapterNumber: number,
  keyConcepts: string[],
  chapterContent: string
): Promise<string> {
  const systemPrompt = `You are a friendly reading comprehension tutor. Generate ONE short, clear question about a book chapter. Rules:
- Maximum 1 sentence, under 25 words
- Use simple, everyday language — no academic jargon
- Ask about a specific idea from the chapter but keep it broad enough for an open-ended answer
- Do NOT reference character quotes, literary devices, or author critique
- Good example: "Why does the main character feel conflicted about his plan?"
- Bad example: "In what ways does the protagonist's detached clinical observation reveal the author's critique of abstract intellectual rationalization?"
Output ONLY the question, nothing else.`;

  const userPrompt = `Book: "${bookTitle}"
Chapter ${chapterNumber}: "${chapterTitle}"
Key Concepts: ${keyConcepts.join(', ')}

Chapter Summary:
${chapterContent}

Generate a short, simple question (under 25 words) about this chapter:`;

  try {
    const question = await callOpenRouter([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]);
    return question || 'Explain the main ideas of this chapter in your own words.';
  } catch (err) {
    console.error('Failed to generate question:', err);
    return 'Explain the main ideas of this chapter in your own words and provide an example.';
  }
}

// ============================================
// Analyze and grade the user's response
// ============================================
export async function analyzeResponse(
  bookTitle: string,
  chapterTitle: string,
  chapterNumber: number,
  keyConcepts: string[],
  chapterContent: string,
  question: string,
  userAnswer: string
): Promise<GradeResult> {
  const systemPrompt = `You are a reading comprehension evaluator. Grade the student's answer and return ONLY a JSON object. Keep ALL strings short (under 15 words each).

Format:
{"score":<1-10>,"summary":"<one short sentence>","gotRight":["<short point>"],"missed":["<short point>"],"misunderstood":["<short point>"],"conceptExplanation":"<1-2 short sentences>"}

Rules:
- score: 1-10 integer
- gotRight: 1-3 items, each under 15 words
- missed: 0-2 items (empty array if score>=9), each under 15 words
- misunderstood: 0-1 items (empty array if score>=7), each under 15 words
- conceptExplanation: max 2 sentences, under 40 words total
- summary: max 1 sentence, under 15 words
- Output ONLY valid JSON. No markdown, no code fences, no extra text.`;

  const userPrompt = `Book: "${bookTitle}"
Chapter ${chapterNumber}: "${chapterTitle}"
Key Concepts: ${keyConcepts.join(', ')}

Chapter Summary:
${chapterContent}

Question asked: "${question}"

Student's answer: "${userAnswer}"

Evaluate this answer and respond with JSON:`;

  try {
    const raw = await callOpenRouter([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]);

    // Parse the JSON, stripping markdown fences if present
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned) as GradeResult;

    // Validate and clamp score - if AI returned a percentage (>10), convert to 1-10 scale first
    if (parsed.score > 10) {
      parsed.score = Math.round(parsed.score / 10);
    }
    parsed.score = Math.max(1, Math.min(10, parsed.score));
    parsed.gotRight = parsed.gotRight || [];
    parsed.missed = parsed.missed || [];
    parsed.misunderstood = parsed.misunderstood || [];
    parsed.summary = parsed.summary || 'Your answer has been evaluated.';
    parsed.conceptExplanation = parsed.conceptExplanation || '';

    return parsed;
  } catch (err) {
    console.error('Failed to analyze response:', err);
    // Return a graceful fallback
    return {
      score: 5,
      summary: 'We had trouble analyzing your response with AI. Please try again.',
      gotRight: ['Your answer was received'],
      missed: ['Unable to fully evaluate — AI service encountered an error'],
      misunderstood: [],
      conceptExplanation: 'Please try submitting again. If the issue persists, check your internet connection.',
    };
  }
}
