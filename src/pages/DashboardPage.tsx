import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
    <section className="mb-8">
      <div className="glass rounded-2xl p-5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-1">
              Weekly Momentum
            </p>
            <h2 className="font-headline text-xl font-bold text-text-primary">Mastery Streak</h2>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-lime/10">
            <span
              className="material-symbols-outlined text-accent-lime text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="text-lg font-headline font-bold text-accent-lime">
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
                    ? "bg-accent-lime h-3"
                    : "bg-bg-glass-strong h-1.5"
                } ${day.isToday && day.isActive ? "shadow-[0_0_8px_rgba(200,245,71,0.4)]" : ""}`}
              />
              <span
                className={`text-[9px] uppercase font-bold tracking-wider ${
                  day.isToday
                    ? "text-accent-lime"
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

function QuoteWidget() {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-headline text-xl text-text-primary">Daily Insight</h2>
      </div>
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-accent-purple rounded-full" />
        <span
          className="material-symbols-outlined absolute -top-2 -right-2 text-accent-purple/10 text-8xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          format_quote
        </span>
        <p className="font-headline italic text-lg text-text-primary leading-relaxed relative z-10 mb-5 pl-4">
          "The soul becomes dyed with the color of its thoughts."
        </p>
        <div className="flex items-center gap-3 relative z-10 pl-4">
          <div className="w-10 h-10 rounded-full bg-accent-purple/20 overflow-hidden border border-accent-purple/30">
            <img
              className="w-full h-full object-cover"
              alt="Marcus Aurelius"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Marcus_Aurelius_Louvre_MR561_n1.jpg/800px-Marcus_Aurelius_Louvre_MR561_n1.jpg"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-text-primary">Marcus Aurelius</p>
            <p className="text-[10px] text-accent-purple font-semibold uppercase tracking-wider">
              From Meditations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { books, userBooks, streak, getBookProgress } = useApp();
  const navigate = useNavigate();

  const activeBooks = userBooks.filter((ub) => ub.status === "reading");
  const shelfBooks = userBooks.slice(0, 6);

  const currentBook = activeBooks[0];
  const currentBookData = currentBook
    ? books.find((b) => b.id === currentBook.bookId)
    : null;

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Reader";
  const firstName = displayName.split(" ")[0];

  return (
    <div className="animate-fade-in-up">
      {/* Greeting — hidden on mobile (shown in TopAppBar) */}
      <div className="hidden lg:block mb-8">
        <h1 className="font-headline text-4xl font-bold text-text-primary mb-1">
          Hi, {firstName}
        </h1>
        <p className="text-text-secondary text-sm">Welcome back to your reading journey.</p>
      </div>

      {/* Mobile greeting */}
      <div className="lg:hidden mb-6">
        <h1 className="font-headline text-3xl font-bold text-text-primary">
          Hi, {firstName}
        </h1>
      </div>

      {/* 1. Streak Widget */}
      <StreakWidget streak={streak.currentStreak} />

      {/* 2. Current Read Hero — Featured card like reference */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-headline text-xl text-text-primary">Continue Reading</h2>
        </div>

        {currentBookData && currentBook ? (
          <div
            className="relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/book/${currentBookData.id}`)}
          >
            {/* Gradient background like the reference's "Discover Weekly" */}
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/20 via-accent-pink/10 to-transparent" />

            <div className="relative z-10 p-6 flex gap-5 items-center">
              {/* Book cover */}
              <div className="w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 group-hover:scale-105 transition-transform duration-500">
                {currentBookData.coverUrl ? (
                  <img
                    className="w-full h-full object-cover"
                    alt={currentBookData.title}
                    src={currentBookData.coverUrl}
                  />
                ) : (
                  <div className="w-full h-full bg-bg-glass flex items-center justify-center">
                    <span className="material-symbols-outlined text-text-muted text-2xl">menu_book</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent-purple mb-2">
                  Currently Reading
                </p>
                <h3 className="font-headline text-xl text-text-primary leading-tight mb-1 line-clamp-2">
                  {currentBookData.title}
                </h3>
                <p className="text-text-secondary text-xs mb-4">
                  {currentBookData.author}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] text-text-muted mb-1.5">
                    <span>Chapter {currentBook.chaptersCompleted + 1}</span>
                    <span>{getBookProgress(currentBookData.id)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="bg-accent-lime h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${getBookProgress(currentBookData.id)}%` }}
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-accent-lime flex items-center justify-center text-text-inverse shadow-[0_4px_16px_rgba(200,245,71,0.3)] hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </button>
                  <button className="w-8 h-8 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent-pink transition-colors">
                    <span className="material-symbols-outlined text-lg">favorite</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass rounded-2xl p-8 text-center">
            <span className="material-symbols-outlined text-4xl text-text-muted mb-3">menu_book</span>
            <h3 className="font-headline text-lg text-text-primary mb-1">No book in progress</h3>
            <p className="text-sm text-text-secondary mb-5">
              Begin your deep reading journey today.
            </p>
            <button
              className="px-6 py-2.5 bg-accent-lime text-text-inverse rounded-xl text-sm font-bold hover:scale-[1.02] transition-transform shadow-[0_4px_16px_rgba(200,245,71,0.2)]"
              onClick={() => navigate("/discover")}
            >
              Discover Books
            </button>
          </div>
        )}
      </section>

      {/* 3. Your Shelf (Horizontal Scroll) */}
      {shelfBooks.length > 0 && (
        <section className="mb-10 -mr-5 lg:-mr-8">
          <div className="flex justify-between items-center mb-4 pr-5 lg:pr-8">
            <h2 className="font-headline text-xl text-text-primary">Your Shelf</h2>
            <button
              onClick={() => navigate("/shelf")}
              className="text-accent-lime text-[11px] font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              See all
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
                  <div className="w-28 h-40 rounded-xl overflow-hidden mb-3 shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-border group-hover:border-accent-lime/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_32px_rgba(200,245,71,0.1)]">
                    {bookMatch.coverUrl ? (
                      <img
                        className="w-full h-full object-cover"
                        alt={bookMatch.title}
                        src={bookMatch.coverUrl}
                      />
                    ) : (
                      <div className="w-full h-full bg-bg-glass flex items-center justify-center">
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
                  <div className="mt-2 w-full h-[3px] bg-bg-glass-strong rounded-full">
                    <div
                      className="bg-accent-lime h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 4. Daily Insight */}
      <QuoteWidget />
    </div>
  );
}
