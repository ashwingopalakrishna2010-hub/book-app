import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { generateQuestion, analyzeResponse } from "../lib/ai";
import { CHAPTER_SUMMARIES } from "../data/chapterSummaries";
import type { GradeResult } from "../types";

export default function QuizPage() {
  const { bookId, chapterNumber } = useParams<{
    bookId: string;
    chapterNumber: string;
  }>();
  const navigate = useNavigate();
  const { books, getBookChapters, markChapterRead } = useApp();

  const book = books.find((b) => b.id === bookId);
  const chapterNum = parseInt(chapterNumber || "1", 10);
  const chapter = getBookChapters(bookId || "").find(
    (c) => c.number === chapterNum
  );

  const [aiQuestion, setAiQuestion] = useState<string>("");
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);

  // Get chapter summary content for AI context
  const chapterContent = chapter ? (CHAPTER_SUMMARIES[chapter.id] || "") : "";

  // Generate AI question on mount
  useEffect(() => {
    if (!book || !chapter) return;

    let cancelled = false;
    setIsLoadingQuestion(true);

    generateQuestion(
      book.title,
      chapter.title,
      chapter.number,
      chapter.keyConcepts,
      chapterContent
    ).then((question) => {
      if (!cancelled) {
        setAiQuestion(question);
        setIsLoadingQuestion(false);
      }
    });

    return () => { cancelled = true; };
  }, [book, chapter, chapterContent]);

  if (!book || !chapter) {
    return <div className="p-6 text-center font-headline text-text-primary">Chapter not found</div>;
  }

  const handleSubmit = async () => {
    if (!currentAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const gradeResult = await analyzeResponse(
        book.title,
        chapter.title,
        chapter.number,
        chapter.keyConcepts,
        chapterContent,
        aiQuestion,
        currentAnswer
      );

      // Convert 1-10 score to percentage
      const pctScore = gradeResult.score;
      await markChapterRead(book.id, chapter.id, chapter.number, pctScore);
      setResult(gradeResult);
    } catch (error) {
      console.error("Quiz evaluation failed:", error);
      await markChapterRead(book.id, chapter.id, chapter.number, 50);
      setResult({
        score: 5,
        summary: "We had trouble analyzing your response. Please try again later.",
        gotRight: ["Your answer was received"],
        missed: ["Unable to fully evaluate — AI service encountered an error"],
        misunderstood: [],
        conceptExplanation: "Please try submitting again or check your internet connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score: number) => {
    const pct = score;
    if (pct >= 80) return "text-success bg-success/10 border-success/30";
    if (pct >= 50) return "text-warning bg-warning/10 border-warning/30";
    return "text-error bg-error/10 border-error/30";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Exceptional";
    if (score >= 7) return "Strong";
    if (score >= 5) return "Partial";
    if (score >= 3) return "Needs Work";
    return "Review Again";
  };

  return (
    <div className="animate-fade-in-up pb-10 max-w-2xl mx-auto px-4 md:px-0">
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-center mt-6 mb-12">
        <button
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-bold bg-bg-glass-strong px-4 py-2 rounded-full border border-border"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
          Exit
        </button>
        <div className="text-right">
          <h1 className="font-headline text-lg text-text-primary">
            {book.title}
          </h1>
          <p className="text-xs text-text-muted font-bold tracking-widest uppercase mt-1">
            Chapter {chapter.number}
          </p>
        </div>
      </div>

      {!result ? (
        <>
          {/* Question Card */}
          <div className="mb-12 animate-fade-in-up">
            {isLoadingQuestion ? (
              <div className="text-center py-16">
                <span
                  className="material-symbols-outlined text-4xl text-accent-purple animate-spin mb-4 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
                <p className="font-headline text-xl text-text-primary mb-2">Generating your question...</p>
                <p className="text-sm text-text-muted">AI is crafting a thought-provoking question about this chapter</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center gap-2 mb-8">
                  <span
                    className="material-symbols-outlined text-accent-purple text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent-purple">
                    AI-Generated Question
                  </span>
                </div>

                <h2 className="font-headline text-3xl md:text-4xl text-text-primary leading-snug mb-12 text-center max-w-xl mx-auto">
                  {aiQuestion}
                </h2>

                <div className="relative max-w-2xl mx-auto">
                  <textarea
                    autoFocus
                    className="w-full bg-transparent border-b-2 border-border/50 p-4 min-h-[120px] text-text-primary placeholder-text-muted/40 focus:outline-none focus:border-accent-lime transition-colors resize-none text-xl md:text-2xl font-serif text-center"
                    placeholder="Share your understanding here..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {!isLoadingQuestion && (
            <div className="flex justify-center mt-8 pb-10">
              <button
                disabled={!currentAnswer.trim() || isSubmitting}
                onClick={handleSubmit}
                className={`px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-300 text-[15px] tracking-wide ${
                  !currentAnswer.trim() || isSubmitting
                    ? "bg-bg-glass-strong text-text-muted border border-border cursor-not-allowed"
                    : "bg-accent-lime text-bg-page hover:scale-[1.02] shadow-[0_8px_24px_rgba(200,245,71,0.25)] active:scale-[0.98]"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>sync</span>
                    Analyzing your response...
                  </>
                ) : (
                  <>
                    Submit Answer
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : (
        /* Result Screen */
        <div className="animate-fade-in-up">
          <div className="relative rounded-2xl overflow-hidden glass p-8 md:p-12 text-center mb-6">
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent-purple/5 to-accent-lime/5" />
            <div className="relative z-10">
               <span
                className="material-symbols-outlined text-6xl text-accent-lime mb-4 drop-shadow-[0_0_15px_rgba(200,245,71,0.4)]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <h2 className="font-headline text-3xl font-bold text-text-primary mb-2">
                Chapter Complete
              </h2>
              <p className="text-text-secondary text-sm mb-10">
                {result.summary}
              </p>

              <div className="flex flex-col md:flex-row justify-center gap-6 mb-10">
                <div className={`p-6 rounded-2xl border ${getScoreColor(result.score)}`}>
                  <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">
                    Retention Score
                  </p>
                  <p className="font-headline text-5xl font-bold">
                    {result.score}%
                  </p>
                  <p className="text-xs font-bold mt-1 opacity-70">
                    {getScoreLabel(result.score)}
                  </p>
                </div>
              </div>

              {/* What you got right */}
              {result.gotRight.length > 0 && (
                <div className="bg-success/5 rounded-xl p-5 text-left border border-success/20 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-success text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    <p className="text-xs font-bold uppercase tracking-widest text-success">What You Got Right</p>
                  </div>
                  <ul className="space-y-2">
                    {result.gotRight.map((item, i) => (
                      <li key={i} className="text-sm text-text-secondary flex gap-2">
                        <span className="text-success mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What you missed */}
              {result.missed.length > 0 && (
                <div className="bg-warning/5 rounded-xl p-5 text-left border border-warning/20 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-warning text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                    <p className="text-xs font-bold uppercase tracking-widest text-warning">Concepts You Missed</p>
                  </div>
                  <ul className="space-y-2">
                    {result.missed.map((item, i) => (
                      <li key={i} className="text-sm text-text-secondary flex gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Misunderstood */}
              {result.misunderstood.length > 0 && (
                <div className="bg-error/5 rounded-xl p-5 text-left border border-error/20 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    <p className="text-xs font-bold uppercase tracking-widest text-error">Needs Clarification</p>
                  </div>
                  <ul className="space-y-2">
                    {result.misunderstood.map((item, i) => (
                      <li key={i} className="text-sm text-text-secondary flex gap-2">
                        <span className="text-error mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Concept Explanation */}
              {result.conceptExplanation && (
                <div className="bg-bg-glass-strong rounded-xl p-5 text-left border border-border mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-accent-purple text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    <p className="text-xs font-bold uppercase tracking-widest text-accent-purple">Key Concept Explanation</p>
                  </div>
                  <p className="text-sm font-serif italic text-text-primary leading-relaxed">
                    "{result.conceptExplanation}"
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3">
             <button
              className="w-full py-4 bg-accent-lime text-text-inverse rounded-xl font-bold hover:scale-[1.02] shadow-[0_4px_24px_rgba(200,245,71,0.25)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
              Return to Book
            </button>
            <button
               className="w-full py-3 glass text-text-primary rounded-xl font-bold hover:bg-bg-glass-strong transition-colors"
                onClick={() => navigate("/")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
