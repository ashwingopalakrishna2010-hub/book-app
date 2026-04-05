import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function StreakWidget({ streak }: { streak: number }) {
  const dayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date().getDay();

  const days = Array.from({ length: 7 }).map((_, i) => {
    const dayIndex = (today - 6 + i + 7) % 7;
    const daysAgo = 6 - i;
    const isActive = daysAgo < streak;
    const isToday = daysAgo === 0;
    return { label: dayLabels[dayIndex], isActive, isToday };
  });

  return (
    <section className="mb-10">
      <div className="bg-white rounded-2xl p-5 shadow-atmospheric">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted mb-1">
              Weekly Momentum
            </p>
            <h2 className="font-headline text-xl font-bold text-text-primary">Mastery Streak</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-purple/10">
            <span
              className="material-symbols-outlined text-accent-purple text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="text-lg font-headline font-bold text-accent-purple">
              {streak}
            </span>
          </div>
        </div>
        <div className="flex justify-between items-end gap-2">
          {days.map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className={`w-full rounded-full transition-all duration-500 ${
                  day.isActive
                    ? "bg-bg-navy h-3"
                    : "bg-bg-base h-1.5"
                } ${day.isToday && day.isActive ? "shadow-[0_0_8px_rgba(3,22,50,0.15)]" : ""}`}
              />
              <span
                className={`text-[9px] uppercase font-bold tracking-wider ${
                  day.isToday
                    ? "text-bg-navy"
                    : day.isActive
                      ? "text-text-primary"
                      : "text-text-muted"
                }`}
              >
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function DashboardPage() {
  const { books, userBooks, streak, getBookProgress } = useApp();
  const navigate = useNavigate();

  const activeBooks = userBooks.filter((ub) => ub.status === "reading");
  const shelfBooks = userBooks.slice(0, 6);

  const currentBook = activeBooks[0];
  const currentBookData = currentBook
    ? books.find((b) => b.id === currentBook.bookId)
    : null;

  return (
    <div className="animate-fade-in-up">
      {/* 1. Streak Widget */}
      <StreakWidget streak={streak.currentStreak} />

      {/* 2. Current Read Hero — Featured card like reference */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-headline text-xl text-text-primary">Continue Reading</h2>
        </div>

        {currentBookData && currentBook ? (
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/book/${currentBookData.id}`)}
          >
            {/* Navy gradient background */}
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/10 via-transparent to-transparent" />

            <div className="relative z-10 p-6 flex gap-5 items-center">
              {/* Book cover */}
              <div className="w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 group-hover:scale-105 transition-transform duration-500">
                {currentBookData.coverUrl ? (
                  <img
                    className="w-full h-full object-contain bg-bg-base/30"
                    alt={currentBookData.title}
                    src={currentBookData.coverUrl}
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/30 text-2xl">menu_book</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent-purple mb-2">
                  Currently Reading
                </p>
                <h3 className="font-headline text-xl text-white leading-tight mb-1 line-clamp-2">
                  {currentBookData.title}
                </h3>
                <p className="text-white/50 text-xs mb-4">
                  {currentBookData.author}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-white/40 mb-1.5">
                    <span>Chapter {currentBook.chaptersCompleted + 1}</span>
                    <span>{getBookProgress(currentBookData.id)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="bg-accent-purple h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${getBookProgress(currentBookData.id)}%` }}
                    />
                  </div>
                </div>

                {/* Action button */}
                <div className="flex items-center gap-3">
                  <button className="px-5 py-2 rounded-full bg-white text-bg-navy text-xs font-bold shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:scale-105 transition-transform flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    Resume Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center shadow-atmospheric">
            <span className="material-symbols-outlined text-4xl text-text-muted mb-3">menu_book</span>
            <h3 className="font-headline text-lg text-text-primary mb-1">No book in progress</h3>
            <p className="text-sm text-text-secondary mb-5">
              Begin your deep reading journey today.
            </p>
            <button
              className="px-6 py-2.5 btn-silk rounded-xl text-sm hover:scale-[1.02] transition-transform"
              onClick={() => navigate("/discover")}
            >
              Discover Books
            </button>
          </div>
        )}
      </section>

      {/* 3. Your Shelf (Horizontal Scroll) */}
      {shelfBooks.length > 0 && (
        <section className="mb-12 -mr-5 lg:-mr-8">
          <div className="flex justify-between items-center mb-5 pr-5 lg:pr-8">
            <h2 className="font-headline text-xl text-text-primary">Your Shelf</h2>
            <button
              onClick={() => navigate("/shelf")}
              className="text-text-secondary text-[11px] font-bold uppercase tracking-[0.1em] hover:text-text-primary transition-colors"
            >
              View all
            </button>
          </div>
          <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-4 pr-5 lg:pr-8">
            {shelfBooks.map((ub) => {
              const bookMatch = books.find((b) => b.id === ub.bookId);
              if (!bookMatch) return null;

              const progress = getBookProgress(bookMatch.id);

              return (
                <div
                  key={bookMatch.id}
                  className="flex-shrink-0 w-28 cursor-pointer group"
                  onClick={() => navigate(`/book/${bookMatch.id}`)}
                >
                  <div className="w-28 h-40 rounded-xl overflow-hidden mb-3 shadow-[0_4px_16px_rgba(3,22,50,0.1)] group-hover:shadow-[0_8px_24px_rgba(3,22,50,0.15)] transition-all duration-300 group-hover:-translate-y-1">
                    {bookMatch.coverUrl ? (
                      <img
                        className="w-full h-full object-contain bg-bg-base"
                        alt={bookMatch.title}
                        src={bookMatch.coverUrl}
                      />
                    ) : (
                      <div className="w-full h-full bg-bg-card flex items-center justify-center">
                        <span className="material-symbols-outlined text-text-muted">menu_book</span>
                      </div>
                    )}
                  </div>
                  <h4 className="font-headline text-sm text-text-primary leading-tight line-clamp-1">
                    {bookMatch.title}
                  </h4>
                  <p className="text-[10px] text-text-muted mt-0.5 line-clamp-1">
                    {bookMatch.author}
                  </p>
                  <div className="mt-2 w-full h-[3px] bg-bg-card-hover rounded-full">
                    <div
                      className="bg-bg-navy h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
}
