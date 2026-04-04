import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { generateQuestion, analyzeResponse } from "../lib/ai";
import { CHAPTER_SUMMARIES } from "../data/chapterSummaries";
import type { GradeResult } from "../types";

export default function ReviewPage() {
  const { userChapters, books, getBookChapters, saveQuizResult } = useApp();
  const navigate = useNavigate();

  // Find all chapters that need review (read but not reviewed, or low retention)
  const chaptersToReview = userChapters
    .filter((c) => c.status === "read" || (c.retentionScore && c.retentionScore < 70))
    .map((c) => {
      const book = books.find((b) => b.id === c.bookId);
      const chapter = getBookChapters(c.bookId).find((ch) => ch.id === c.chapterId);
      if (!book || !chapter) return null;
      return {
        book,
        chapter,
        userChapter: c,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const [activeSession, setActiveSession] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aiQuestion, setAiQuestion] = useState("");
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewResult, setReviewResult] = useState<GradeResult | null>(null);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionScores, setSessionScores] = useState<number[]>([]);

  const currentItem = chaptersToReview[currentIndex];

  // Imperative question loader — called from button handlers, NOT from useEffect
  const loadQuestion = useCallback((index: number) => {
    const item = chaptersToReview[index];
    if (!item) return;

    setIsLoadingQuestion(true);
    setAiQuestion("");

    const chapterContent = CHAPTER_SUMMARIES[item.chapter.id] || "";

    generateQuestion(
      item.book.title,
      item.chapter.title,
      item.chapter.number,
      item.chapter.keyConcepts,
      chapterContent
    )
      .then((question) => {
        setAiQuestion(question);
        setIsLoadingQuestion(false);
      })
      .catch((err) => {
        console.error("Failed to generate review question:", err);
        setAiQuestion(`What are the key ideas from Chapter ${item.chapter.number}: ${item.chapter.title}?`);
        setIsLoadingQuestion(false);
      });
  }, [chaptersToReview]);

  const handleSubmitAnswer = async () => {
    if (!currentItem || !currentAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const chapterContent = CHAPTER_SUMMARIES[currentItem.chapter.id] || "";

    try {
      const gradeResult = await analyzeResponse(
        currentItem.book.title,
        currentItem.chapter.title,
        currentItem.chapter.number,
        currentItem.chapter.keyConcepts,
        chapterContent,
        aiQuestion,
        currentAnswer
      );

      const pctScore = gradeResult.score * 10;
      await saveQuizResult(currentItem.book.id, currentItem.chapter.id, pctScore);
      setSessionScores((prev) => [...prev, pctScore]);
      setReviewResult(gradeResult);
    } catch (error) {
      console.error("Review evaluation failed:", error);
      await saveQuizResult(currentItem.book.id, currentItem.chapter.id, 50);
      setSessionScores((prev) => [...prev, 50]);
      setReviewResult({
        score: 5,
        summary: "We had trouble analyzing your response. Please try again.",
        gotRight: ["Your answer was received"],
        missed: ["Unable to fully evaluate — AI service encountered an error"],
        misunderstood: [],
        conceptExplanation: "Please try submitting again or check your internet connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextReview = () => {
    if (currentIndex < chaptersToReview.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentAnswer("");
      setReviewResult(null);
      loadQuestion(nextIndex);
    } else {
      setSessionComplete(true);
    }
  };

  const handleEndSession = () => {
    setActiveSession(false);
    setCurrentIndex(0);
    setCurrentAnswer("");
    setReviewResult(null);
    setSessionComplete(false);
    setSessionScores([]);
    setAiQuestion("");
    setIsLoadingQuestion(false);
  };

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-text-muted";
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-error";
  };

  const getScoreColorBg = (score: number) => {
    const pct = score * 10;
    if (pct >= 80) return "text-success bg-success/10 border-success/30";
    if (pct >= 50) return "text-warning bg-warning/10 border-warning/30";
    return "text-error bg-error/10 border-error/30";
  };

  return (
    <div className="animate-fade-in-up pb-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-headline text-3xl font-bold text-text-primary mb-1">Review</h1>
        <p className="text-text-secondary text-sm">AI-powered spaced repetition to solidify your knowledge.</p>
      </div>

      {!activeSession ? (
        <>
          <div className="glass rounded-2xl p-6 mb-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent-lime/10 rounded-full blur-[40px] pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
              <div className="w-20 h-20 rounded-full bg-accent-lime/15 border-2 border-accent-lime/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(200,245,71,0.2)]">
                <span className="font-headline font-bold text-3xl text-accent-lime">
                  {chaptersToReview.length}
                </span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-headline text-xl text-text-primary mb-1">Pending Reviews</h2>
                <p className="text-sm text-text-secondary mb-4">
                  These chapters are ready for AI-powered review to improve your long-term retention.
                </p>
                <button
                  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-[0_4px_16px_rgba(200,245,71,0.2)] hover:scale-[1.02] active:scale-[0.98] ${
                    chaptersToReview.length > 0
                       ? "bg-accent-lime text-text-inverse"
                      : "bg-bg-glass text-text-muted cursor-not-allowed shadow-none"
                  }`}
                  disabled={chaptersToReview.length === 0}
                  onClick={() => { setActiveSession(true); loadQuestion(0); }}
                >
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  Start Review Session
                </button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-headline text-lg text-text-primary mb-4">Review Queue</h3>
            <div className="flex flex-col gap-3">
              {chaptersToReview.length > 0 ? (
                chaptersToReview.map((item, idx) => (
                  <div
                    key={`${item.book.id}-${item.chapter.id}-${idx}`}
                    className="glass rounded-xl p-4 flex gap-4 items-center group cursor-pointer hover:bg-bg-card-hover hover:border-accent-lime/30 transition-all"
                    onClick={() => navigate(`/book/${item.book.id}`)}
                  >
                     <div className="w-12 h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                        {item.book.coverUrl ? (
                           <img src={item.book.coverUrl} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <div className="w-full h-full bg-bg-glass flex items-center justify-center">
                            <span className="material-symbols-outlined text-text-muted text-xs">book</span>
                          </div>
                        )}
                     </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted mb-0.5 truncate">
                        {item.book.title}
                      </p>
                      <h4 className="font-headline text-base text-text-primary truncate group-hover:text-accent-lime transition-colors">
                        Ch {item.chapter.number}: {item.chapter.title}
                      </h4>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      {item.userChapter.retentionScore !== undefined && (
                        <span className={`text-sm font-bold block ${getScoreColor(item.userChapter.retentionScore)}`}>
                          {item.userChapter.retentionScore}%
                        </span>
                      )}
                      <span className="text-[10px] text-text-secondary mt-1 block">Due</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 glass rounded-2xl border-dashed">
                  <span className="material-symbols-outlined text-4xl text-success mb-2 drop-shadow-[0_0_10px_rgba(74,222,128,0.4)]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <p className="text-text-primary font-bold">All caught up!</p>
                  <p className="text-sm text-text-secondary mt-1">Check back later or read a new chapter.</p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Active Session View */
        <div className="fixed inset-0 z-[100] bg-bg-base flex flex-col p-5 md:p-10">
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto w-full mb-8 mt-4">
            <div className="flex justify-between items-center mb-2">
              <button
                className="text-text-secondary hover:text-text-primary transition-colors p-2 -ml-2 rounded-lg glass hover:bg-bg-card-hover"
                onClick={handleEndSession}
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
              <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                {currentIndex + 1} / {chaptersToReview.length}
              </span>
            </div>
             <div className="w-full h-1.5 bg-bg-glass-strong rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-lime rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + (reviewResult ? 1 : 0)) / chaptersToReview.length) * 100}%` }}
                />
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center overflow-y-auto">
            {sessionComplete ? (
              /* Session Summary */
              <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-border-strong relative overflow-hidden text-center">
                <div>
                  <span
                    className="material-symbols-outlined text-6xl text-accent-lime mb-4 drop-shadow-[0_0_15px_rgba(200,245,71,0.4)]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    emoji_events
                  </span>
                  <h2 className="font-headline text-3xl font-bold text-text-primary mb-2">Session Complete!</h2>
                  <p className="text-text-secondary text-sm mb-8">
                    You reviewed {chaptersToReview.length} chapter{chaptersToReview.length !== 1 ? "s" : ""}.
                  </p>

                  {sessionScores.length > 0 && (
                    <div className="flex justify-center gap-6 mb-8">
                      <div className="p-6 rounded-2xl border text-success bg-success/10 border-success/30">
                        <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">Average Score</p>
                        <p className="font-headline text-5xl font-bold">
                          {Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length)}%
                        </p>
                      </div>
                    </div>
                  )}

                  <button
                    className="px-8 py-4 bg-accent-lime text-text-inverse rounded-xl font-bold hover:scale-[1.02] shadow-[0_4px_24px_rgba(200,245,71,0.25)] transition-all active:scale-[0.98] w-full"
                    onClick={handleEndSession}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : !reviewResult ? (
              /* Question & Answer Phase */
              <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-border-strong relative overflow-hidden">
                <div className="text-center mb-8">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-accent-lime-dim mb-2">
                    {currentItem?.book.title}
                  </p>
                  <h2 className="font-headline text-2xl text-text-primary">
                    Chapter {currentItem?.chapter.number}: {currentItem?.chapter.title}
                  </h2>
                </div>

                <div>
                  {isLoadingQuestion ? (
                    <div className="text-center py-12">
                      <span
                        className="material-symbols-outlined text-4xl text-accent-lime animate-spin mb-4 block"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        auto_awesome
                      </span>
                      <p className="font-headline text-lg text-text-primary mb-2">Generating review question...</p>
                      <p className="text-sm text-text-secondary">AI is crafting a question to test your memory</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center gap-2 mb-6">
                        <span
                          className="material-symbols-outlined text-accent-lime text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          auto_awesome
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-accent-lime">
                          AI Review Question
                        </span>
                      </div>

                      <h3 className="font-headline text-xl md:text-2xl text-text-primary leading-snug mb-8 text-center">
                        {aiQuestion}
                      </h3>

                      <textarea
                        autoFocus
                        className="w-full bg-bg-base border-2 border-border-strong rounded-xl p-4 min-h-[120px] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-lime transition-colors resize-none text-lg"
                        placeholder="Write your answer here..."
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                      />

                      <div className="flex justify-center mt-8">
                        <button
                          disabled={!currentAnswer.trim() || isSubmitting}
                          onClick={handleSubmitAnswer}
                          className={`px-10 py-4 rounded-full font-bold flex items-center justify-center gap-3 transition-all duration-300 text-[15px] tracking-wide ${
                            !currentAnswer.trim() || isSubmitting
                              ? "bg-bg-glass-strong text-text-muted border border-border cursor-not-allowed"
                              : "bg-accent-lime text-bg-page hover:scale-[1.02] shadow-[0_8px_24px_rgba(200,245,71,0.25)] active:scale-[0.98]"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="material-symbols-outlined animate-spin" style={{ fontVariationSettings: "'FILL' 1" }}>sync</span>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              Submit Answer
                              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                            </>
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              /* Result Phase */
              <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-border-strong relative overflow-hidden">
                <div>
                  <div className="text-center mb-6">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-accent-lime-dim mb-2">
                      {currentItem?.book.title} — Ch {currentItem?.chapter.number}
                    </p>
                    <p className="text-text-secondary text-sm">{reviewResult.summary}</p>
                  </div>

                  <div className="flex justify-center mb-8">
                    <div className={`p-5 rounded-2xl border text-center ${getScoreColorBg(reviewResult.score)}`}>
                      <p className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">Score</p>
                      <p className="font-headline text-4xl font-bold">{reviewResult.score * 10}%</p>
                    </div>
                  </div>

                  {/* What you got right */}
                  {reviewResult.gotRight.length > 0 && (
                    <div className="bg-success/5 rounded-xl p-4 text-left border border-success/20 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-success text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        <p className="text-xs font-bold uppercase tracking-widest text-success">Got Right</p>
                      </div>
                      <ul className="space-y-1.5">
                        {reviewResult.gotRight.map((item, i) => (
                          <li key={i} className="text-sm text-text-secondary flex gap-2">
                            <span className="text-success mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What you missed */}
                  {reviewResult.missed.length > 0 && (
                    <div className="bg-warning/5 rounded-xl p-4 text-left border border-warning/20 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-warning text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                        <p className="text-xs font-bold uppercase tracking-widest text-warning">Missed</p>
                      </div>
                      <ul className="space-y-1.5">
                        {reviewResult.missed.map((item, i) => (
                          <li key={i} className="text-sm text-text-secondary flex gap-2">
                            <span className="text-warning mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Misunderstood */}
                  {reviewResult.misunderstood.length > 0 && (
                    <div className="bg-error/5 rounded-xl p-4 text-left border border-error/20 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-error text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                        <p className="text-xs font-bold uppercase tracking-widest text-error">Needs Clarification</p>
                      </div>
                      <ul className="space-y-1.5">
                        {reviewResult.misunderstood.map((item, i) => (
                          <li key={i} className="text-sm text-text-secondary flex gap-2">
                            <span className="text-error mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Concept Explanation */}
                  {reviewResult.conceptExplanation && (
                    <div className="bg-bg-glass-strong rounded-xl p-4 text-left border border-border mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-accent-purple text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                        <p className="text-xs font-bold uppercase tracking-widest text-accent-purple">Key Concept</p>
                      </div>
                      <p className="text-sm font-serif italic text-text-primary leading-relaxed">
                        "{reviewResult.conceptExplanation}"
                      </p>
                    </div>
                  )}

                  <button
                    className="w-full px-8 py-4 bg-accent-lime text-text-inverse rounded-xl font-bold hover:scale-[1.02] shadow-[0_4px_24px_rgba(200,245,71,0.25)] transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                    onClick={handleNextReview}
                  >
                    {currentIndex < chaptersToReview.length - 1 ? (
                      <>
                        Next Review
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </>
                    ) : (
                      <>
                        Finish Session
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
