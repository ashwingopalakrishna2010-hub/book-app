import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

export default function ProfilePage() {
  const { user, logOut } = useAuth();
  const { userBooks, streak } = useApp();

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Reader";
  const initials = displayName.slice(0, 2).toUpperCase();

  const booksRead = userBooks.filter((b) => b.status === "completed").length;
  const chaptersRead = userBooks.reduce((acc, b) => acc + b.chaptersCompleted, 0);


  const badges = [
    { title: "First Chapter", icon: "check_circle", earned: chaptersRead > 0 },
    { title: "Bookworm", icon: "menu_book", earned: booksRead > 0 },
    { title: "7 Day Streak", icon: "local_fire_department", earned: streak.longestStreak >= 7 },
    { title: "Scholar", icon: "school", earned: booksRead >= 5 },
  ];

  return (
    <div className="animate-fade-in-up pb-10">
      {/* Account Actions */}
      <div className="bg-white rounded-2xl shadow-atmospheric p-10 mb-8 mt-4 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-purple/20 rounded-full blur-[80px] pointer-events-none" />

        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 mb-6 text-center shadow-atmospheric">
          <div className="w-20 h-20 rounded-full bg-bg-navy/10 border-4 border-bg-navy/15 flex items-center justify-center text-bg-navy font-bold text-3xl font-headline mx-auto mb-3">
            {initials}
          </div>
          <h2 className="font-headline text-2xl font-bold text-text-primary">{displayName}</h2>
          <p className="text-sm text-text-secondary">{user?.email}</p>
        </div>

        {/* Stats Grid */}
        <h2 className="font-headline text-xl text-text-primary mb-4">Reading Stats</h2>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-atmospheric">
            <span className="material-symbols-outlined text-accent-purple text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <p className="text-2xl font-headline font-bold text-text-primary">{streak.currentStreak}</p>
            <p className="text-[9px] uppercase font-bold tracking-[0.1em] text-text-muted">Day Streak</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-atmospheric">
            <span className="material-symbols-outlined text-bg-navy text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            <p className="text-2xl font-headline font-bold text-text-primary">{booksRead}</p>
            <p className="text-[9px] uppercase font-bold tracking-[0.1em] text-text-muted">Finished</p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-atmospheric">
            <span className="material-symbols-outlined text-accent-purple text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            <p className="text-2xl font-headline font-bold text-text-primary">{chaptersRead}</p>
            <p className="text-[9px] uppercase font-bold tracking-[0.1em] text-text-muted">Chapters</p>
          </div>
        </div>

        {/* Achievements */}
        <h2 className="font-headline text-xl text-text-primary mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {badges.map((badge, i) => (
            <div
              key={i}
              className={`rounded-2xl p-4 text-center transition-all ${
                badge.earned
                  ? "bg-bg-base"
                  : "bg-bg-base opacity-40 grayscale"
              }`}
            >
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${badge.earned ? "bg-accent-purple/15" : "bg-bg-card-hover"}`}>
                <span className={`material-symbols-outlined text-2xl ${badge.earned ? "text-accent-purple" : "text-text-muted"}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {badge.icon}
                </span>
              </div>
              <p className={`text-xs font-bold ${badge.earned ? "text-text-primary" : "text-text-muted"}`}>
                {badge.title}
              </p>
            </div>
          ))}
        </div>

        {/* Settings / Actions */}
        <h2 className="font-headline text-xl text-text-primary mb-4">Account</h2>
        <button
          className="w-full px-5 py-4 flex items-center justify-center gap-3 hover:bg-bg-card-hover transition-colors rounded-xl"
          onClick={handleLogout}
        >
          <span className="material-symbols-outlined text-error">logout</span>
          <span className="text-sm font-bold text-error">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
