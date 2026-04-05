import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function ShelfPage() {
  const [activeTab, setActiveTab] = useState<"reading" | "completed">("reading");
  const { books, userBooks, getBookProgress, getBookRetention } = useApp();
  const navigate = useNavigate();

  const reading = userBooks.filter((ub) => ub.status === "reading");
  const completed = userBooks.filter((ub) => ub.status === "completed");
  const displayedBooks = activeTab === "reading" ? reading : completed;

  const getRetentionColor = (score: number | null) => {
    if (score === null) return "text-text-muted";
    if (score >= 80) return "text-success";
    if (score >= 50) return "text-warning";
    return "text-error";
  };

  return (
    <div className="animate-fade-in-up pb-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-headline text-3xl font-bold text-text-primary mb-1">Your Shelf</h1>
        <p className="text-text-secondary text-sm">
          {userBooks.length} {userBooks.length === 1 ? "book" : "books"} in your library.
        </p>
      </div>

      {/* Pill Tabs */}
      <div className="flex gap-2 mb-8">
        <button
          className={`pill ${activeTab === "reading" ? "pill-active" : "pill-inactive"}`}
          onClick={() => setActiveTab("reading")}
        >
          Reading ({reading.length})
        </button>
        <button
          className={`pill ${activeTab === "completed" ? "pill-active" : "pill-inactive"}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed ({completed.length})
        </button>
      </div>

      {/* Book List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayedBooks.map((ub) => {
          const book = books.find((b) => b.id === ub.bookId);
          if (!book) return null;
          const retention = getBookRetention(ub.bookId);
          const progress = getBookProgress(ub.bookId);

          return (
            <div
              key={book.id}
              className="bg-white rounded-2xl p-5 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(3,22,50,0.08),0_12px_48px_rgba(3,22,50,0.06)] group shadow-atmospheric"
              onClick={() => navigate(`/book/${book.id}`)}
            >
              <div className="flex gap-4">
                <div className="w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(3,22,50,0.12)] group-hover:shadow-[0_8px_24px_rgba(3,22,50,0.15)] transition-all">
                  {book.coverUrl ? (
                    <img className="w-full h-full object-contain bg-bg-base" alt={book.title} src={book.coverUrl} />
                  ) : (
                    <div className="w-full h-full bg-bg-base flex items-center justify-center">
                      <span className="material-symbols-outlined text-text-muted">menu_book</span>
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-headline text-base text-text-primary leading-tight line-clamp-2 mb-1 group-hover:text-bg-navy transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-text-muted text-xs mb-2 line-clamp-1">by {book.author}</p>

                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-[0.1em] ${
                        ub.status === "reading"
                          ? "bg-bg-navy/[0.06] text-bg-navy"
                          : "bg-accent-purple/10 text-accent-purple"
                      }`}
                    >
                      {ub.status === "reading" ? "Reading" : "Completed"}
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-tight text-text-muted">
                        {ub.chaptersCompleted}/{book.totalChapters} Ch.
                      </span>
                      {retention !== null && (
                        <span className={`text-sm font-headline font-bold ${getRetentionColor(retention)}`}>
                          {retention}%
                        </span>
                      )}
                    </div>
                    {ub.status === "reading" && (
                      <div className="w-full h-1.5 bg-bg-base rounded-full overflow-hidden">
                        <div
                          className="h-full bg-bg-navy rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {displayedBooks.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl mt-6 shadow-atmospheric">
          <span className="material-symbols-outlined text-text-muted text-5xl mb-4">book</span>
          <h3 className="font-headline text-2xl text-text-primary mb-2">
            {activeTab === "reading" ? "No books in progress" : "No completed books"}
          </h3>
          <p className="text-text-secondary">
            {activeTab === "reading"
              ? "Discover a book and start reading to see it here."
              : "Keep reading to complete your first book."}
          </p>
          {activeTab === "reading" && (
            <button
              className="mt-6 px-6 py-2.5 btn-silk rounded-xl text-sm hover:scale-[1.02] transition-transform"
              onClick={() => navigate("/discover")}
            >
              Browse Library
            </button>
          )}
        </div>
      )}
    </div>
  );
}
