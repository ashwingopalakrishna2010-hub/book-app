import { useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function BookDetailPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const {
    books,
    getBookChapters,
    getUserBook,
    getUserChapter,
    getBookProgress,
    getBookRetention,
    addBookToShelf,
    removeBookFromShelf,
  } = useApp();

  const book = books.find((b) => b.id === bookId);
  if (!book) return <div className="p-6 text-center font-headline text-text-primary">Book not found</div>;

  const chapters = getBookChapters(book.id);
  const userBook = getUserBook(book.id);
  const progress = getBookProgress(book.id);
  const retention = getBookRetention(book.id);

  const getScoreColor = (score: number | null) => {
    if (score === null) return "text-text-muted";
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-error";
  };

  const handleMarkRead = (chapterNumber: number) => {
    if (!book) return;
    navigate(`/quiz/${book.id}/${chapterNumber}`);
  };

  const handleRemoveBook = async () => {
    if (!book) return;
    const confirm = window.confirm(`Remove "${book.title}" and all progress? This can't be undone.`);
    if (confirm) {
      await removeBookFromShelf(book.id);
      navigate("/");
    }
  };

  return (
    <div className="animate-fade-in-up pb-10">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-bold"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back
        </button>

        {userBook && (
          <button
            onClick={handleRemoveBook}
            className="flex items-center gap-1.5 text-error/70 hover:text-error transition-colors text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-error/10 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
            Remove
          </button>
        )}
      </div>

      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden mb-8">
        {/* Gradient bg */}
        <div className="absolute inset-0 hero-gradient-alt" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 via-transparent to-accent-pink/5" />

        <div className="relative z-10 p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          {/* Cover */}
          <div className="w-36 md:w-48 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_12px_48px_rgba(0,0,0,0.4)] border border-white/10 transform hover:scale-105 transition-transform duration-500">
            {book.coverUrl ? (
              <img src={book.coverUrl} alt={book.title} className="w-full h-full object-contain bg-bg-base/20" />
            ) : (
              <div className="w-full h-full aspect-[2/3] bg-bg-glass flex items-center justify-center">
                <span className="material-symbols-outlined text-text-muted text-3xl">menu_book</span>
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left pt-2">
            <span className="inline-block px-3 py-1 bg-accent-purple/15 text-accent-purple text-[10px] font-bold uppercase tracking-[0.15em] rounded-full mb-4">
              {book.genre}
            </span>
            <h1 className="font-headline text-3xl md:text-4xl text-white leading-tight mb-2">{book.title}</h1>
            <p className="text-white/50 text-base font-headline italic mb-6">by {book.author}</p>

            {userBook ? (
              <>
                {/* Stats Row */}
                <div className="flex justify-center md:justify-start gap-6 mb-5">
                  <div className="text-center md:text-left">
                    <p className="text-2xl font-headline text-white">{progress}%</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Progress</p>
                  </div>
                  <div className="w-px h-10 bg-white/10 self-center" />
                  <div className="text-center md:text-left">
                    <p className={`text-2xl font-headline ${retention !== null && retention >= 80 ? 'text-success' : retention !== null && retention >= 50 ? 'text-warning' : retention !== null ? 'text-error' : 'text-white/40'}`}>{retention ?? "-"}{retention !== null ? "%" : ""}</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Retention</p>
                  </div>
                  <div className="w-px h-10 bg-white/10 self-center" />
                  <div className="text-center md:text-left">
                    <p className="text-2xl font-headline text-white">{userBook.chaptersCompleted}<span className="text-base text-white/40">/{book.totalChapters}</span></p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">Chapters</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-accent-purple rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }} />
                </div>
              </>
            ) : (
              <button
                className="px-8 py-4 bg-white text-bg-navy rounded-xl font-bold hover:scale-[1.02] shadow-[0_4px_24px_rgba(0,0,0,0.15)] transition-all flex items-center justify-center gap-2 mx-auto md:mx-0 w-full md:w-auto active:scale-[0.98]"
                onClick={() => addBookToShelf(book.id)}
              >
                <span className="material-symbols-outlined text-sm">add</span>
                Begin Your Journey
              </button>
            )}
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-purple/8 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
      </div>

      {/* About */}
      <div className="mb-12">
        <h2 className="font-headline text-xl text-text-primary mb-4">About the Book</h2>
        <p className="text-text-secondary text-base leading-relaxed font-headline italic">{book.description}</p>
      </div>

      {/* Table of Contents */}
      <div>
        <h2 className="font-headline text-xl text-text-primary mb-5">Table of Contents</h2>
        <div className="flex flex-col gap-3">
          {chapters.map((chapter) => {
            const uc = getUserChapter(chapter.id);
            const isRead = uc && (uc.status === "read" || uc.status === "reviewed");
            const retentionScore = uc?.retentionScore ?? null;

            return (
              <div
                key={chapter.id}
                className={`p-4 md:p-5 rounded-xl flex items-center gap-4 transition-all duration-200 ${
                  isRead
                    ? "bg-white shadow-atmospheric"
                    : "bg-bg-card hover:bg-bg-card-hover"
                }`}
              >
                {/* Number badge */}
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 font-headline font-bold text-sm ${
                    isRead
                      ? "bg-bg-navy/[0.08] text-bg-navy"
                      : "bg-bg-base text-text-muted"
                  }`}
                >
                  {isRead ? (
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  ) : (
                    chapter.number
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-4">
                  <h3 className={`font-headline text-base truncate ${isRead ? "text-text-primary font-bold" : "text-text-secondary"}`}>
                    {chapter.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    {chapter.keyConcepts.slice(0, 3).map((concept) => (
                      <span key={concept} className="text-[10px] font-semibold text-text-muted">
                        • {concept}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 flex items-center">
                  {isRead ? (
                    <div className="flex flex-col items-end gap-1">
                      {retentionScore !== null && (
                        <span className={`text-sm font-headline font-bold px-2 py-0.5 rounded-lg bg-bg-base ${getScoreColor(retentionScore)}`}>
                          {retentionScore}%
                        </span>
                      )}
                      <button
                        className="flex items-center gap-0.5 text-[10px] uppercase font-bold text-text-muted hover:text-bg-navy transition-colors"
                        onClick={() => navigate(`/quiz/${book.id}/${chapter.number}`)}
                      >
                        Retake <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                      </button>
                    </div>
                  ) : userBook ? (
                    <button
                      className="px-4 py-2 bg-bg-base rounded-xl text-xs uppercase font-bold tracking-[0.1em] text-text-secondary hover:bg-bg-navy hover:text-text-inverse transition-all"
                      onClick={() => handleMarkRead(chapter.number)}
                    >
                      Mark Read
                    </button>
                  ) : (
                    <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-bg-base">
                      <span className="material-symbols-outlined text-text-muted text-sm">lock</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
