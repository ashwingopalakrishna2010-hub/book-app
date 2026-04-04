import type { GradeResult } from '../types';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || import.meta.env.GROQ_API_KEY || '';

// Debug: Check if API key is loaded
console.log('Groq API key check:', {
  hasViteKey: !!import.meta.env.VITE_GROQ_API_KEY,
  hasServerKey: !!import.meta.env.GROQ_API_KEY,
  keyLength: GROQ_API_KEY.length,
  keyStart: GROQ_API_KEY.substring(0, 10) + '...'
});

if (!GROQ_API_KEY) {
  console.error('❌ Groq API key not found in any environment variable');
} else {
  console.log('✅ Groq API key loaded successfully');
}
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant'; // Free Groq model

const MAX_RETRIES = 2;
const BASE_DELAY_MS = 2000; // 2 seconds

async function callGroq(messages: { role: string; content: string }[]): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured');
  }

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
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
      return data.choices?.[0]?.message?.content?.trim() || '';
    } else {
      const errorData = await res.json().catch(() => ({}));
      console.error('Groq API error:', res.status, errorData);
      
      if (res.status === 401) {
        throw new Error('Invalid Groq API key. Please check your API key configuration.');
      }
      
      if (attempt === MAX_RETRIES) {
        throw new Error(`Groq API error: ${res.status} - ${errorData.error?.message || 'Unknown error'}`);
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, BASE_DELAY_MS * (attempt + 1)));
    }
  }

  throw new Error('Groq API: max retries exceeded');
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
    const question = await callGroq([
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
{"score":<10-100>,"summary":"<one short sentence>","gotRight":["<short point>"],"missed":["<short point>"],"misunderstood":["<short point>"],"conceptExplanation":"<1-2 short sentences>"}

Rules:
- score: 10-100 percentage (10=poor, 50=average, 100=excellent)
- gotRight: 1-3 items, each under 15 words
- missed: 0-2 items (empty array if score>=80), each under 15 words
- misunderstood: 0-1 items (empty array if score>=70), each under 15 words
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
    const raw = await callGroq([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ]);

    // Parse the JSON, stripping markdown fences if present
    const cleaned = raw.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(cleaned) as GradeResult;

    // Validate and clamp score - convert to percentage scale (10-100)
    if (parsed.score <= 10) {
      // Convert 1-10 scale to percentage (10-100)
      parsed.score = parsed.score * 10;
    }
    parsed.score = Math.max(10, Math.min(100, parsed.score));
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
