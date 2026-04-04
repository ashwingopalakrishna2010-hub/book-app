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

  const stats = [
    { label: "Current Streak", value: streak.currentStreak, icon: "local_fire_department", color: "text-accent-lime", bg: "bg-accent-lime/10" },
    { label: "Longest Streak", value: streak.longestStreak, icon: "workspace_premium", color: "text-warning", bg: "bg-warning/10" },
    { label: "Books Finished", value: booksRead, icon: "menu_book", color: "text-accent-purple", bg: "bg-accent-purple/10" },
    { label: "Chapters Read", value: chaptersRead, icon: "description", color: "text-accent-blue", bg: "bg-accent-blue/10" },
  ];

  const badges = [
    { title: "First Chapter", icon: "check_circle", earned: chaptersRead > 0 },
    { title: "Bookworm", icon: "menu_book", earned: booksRead > 0 },
    { title: "7 Day Streak", icon: "local_fire_department", earned: streak.longestStreak >= 7 },
    { title: "Scholar", icon: "school", earned: booksRead >= 5 },
  ];

  return (
    <div className="animate-fade-in-up pb-10">
      {/* Header Profile Card */}
      <div className="glass rounded-3xl p-6 md:p-10 mb-8 mt-4 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-purple/20 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-accent-purple/20 border-4 border-accent-purple/40 flex items-center justify-center text-accent-purple font-bold text-3xl mb-4 shadow-[0_0_30px_rgba(196,167,231,0.3)]">
            {initials}
          </div>
          <h1 className="font-headline text-2xl font-bold text-text-primary mb-1">
            {displayName}
          </h1>
          <p className="text-sm text-text-secondary">{user?.email}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <h2 className="font-headline text-xl text-text-primary mb-4">Reading Stats</h2>
      <div className="grid grid-cols-2 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="glass rounded-2xl p-5 flex flex-col">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg}`}>
              <span className={`material-symbols-outlined text-xl ${stat.color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                {stat.icon}
              </span>
            </div>
            <p className="font-headline text-3xl font-bold text-text-primary mb-1">{stat.value}</p>
            <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="font-headline text-xl text-text-primary mb-4">Achievements</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {badges.map((badge, i) => (
          <div
            key={i}
            className={`rounded-2xl p-4 text-center transition-all ${
              badge.earned
                ? "glass border-accent-lime/30"
                : "bg-bg-card border border-border opacity-50 grayscale"
            }`}
          >
            <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${badge.earned ? "bg-accent-lime/15" : "bg-bg-glass"}`}>
              <span className={`material-symbols-outlined text-2xl ${badge.earned ? "text-accent-lime" : "text-text-muted"}`} style={{ fontVariationSettings: "'FILL' 1" }}>
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
      <div className="space-y-3">
        <button className="w-full glass rounded-xl p-4 flex items-center justify-between hover:bg-bg-card-hover transition-colors">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-text-secondary">dark_mode</span>
            <span className="text-sm font-bold text-text-primary">Theme Appearance</span>
          </div>
          <span className="text-xs text-text-muted px-2 py-1 bg-bg-glass rounded-md">Dark Default</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full glass rounded-xl p-4 flex items-center justify-between hover:border-error/30 hover:bg-error/5 group transition-all"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-error/80 group-hover:text-error transition-colors">logout</span>
            <span className="text-sm font-bold text-error/80 group-hover:text-error transition-colors">Sign Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}
