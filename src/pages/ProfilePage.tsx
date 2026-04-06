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

  const settingsOptions = [
    { label: "Preferences", icon: "tune", action: () => alert("Preferences coming soon!") },
    { label: "Notifications", icon: "notifications", action: () => alert("Notifications coming soon!") },
    { label: "Help & Support", icon: "help", action: () => alert("Help and Support page coming soon!") },
  ];

  return (
    <div className="animate-fade-in-up pb-28 px-4 max-w-lg mx-auto">
      {/* Main Profile Card */}
      <div className="bg-white rounded-[2rem] shadow-atmospheric px-6 py-8 mb-6 mt-4 text-center relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-purple/10 rounded-full blur-[80px] pointer-events-none" />

        {/* Profile Header */}
        <div className="relative mb-8 text-center pt-2">
          <div className="w-24 h-24 rounded-[1.5rem] bg-bg-navy/5 border border-bg-navy/10 flex items-center justify-center text-bg-navy font-bold text-4xl shadow-sm font-headline mx-auto mb-4">
            {initials}
          </div>
          <h2 className="font-headline text-3xl font-bold text-text-primary tracking-tight mb-1">{displayName}</h2>
          <p className="text-sm text-text-secondary font-medium">{user?.email}</p>
        </div>

        {/* Stats Grid */}
        <h3 className="font-headline text-lg font-bold text-text-primary mb-4 text-left px-2">Reading Stats</h3>
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-bg-base/80 rounded-2xl p-4 text-center border border-bg-navy/5">
            <span className="material-symbols-outlined text-accent-purple text-[28px] mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
            <p className="text-2xl font-headline font-bold text-text-primary mb-1">{streak.currentStreak}</p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Day Streak</p>
          </div>
          <div className="bg-bg-base/80 rounded-2xl p-4 text-center border border-bg-navy/5">
            <span className="material-symbols-outlined text-bg-navy text-[28px] mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
            <p className="text-2xl font-headline font-bold text-text-primary mb-1">{booksRead}</p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Finished</p>
          </div>
          <div className="bg-bg-base/80 rounded-2xl p-4 text-center border border-bg-navy/5">
            <span className="material-symbols-outlined text-accent-purple text-[28px] mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            <p className="text-2xl font-headline font-bold text-text-primary mb-1">{chaptersRead}</p>
            <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted">Chapters</p>
          </div>
        </div>

        {/* Achievements */}
        <h3 className="font-headline text-lg font-bold text-text-primary mb-4 text-left px-2">Achievements</h3>
        <div className="grid grid-cols-2 gap-3">
          {badges.map((badge, i) => (
            <div
              key={i}
              className={`rounded-2xl p-4 text-center transition-all border ${
                badge.earned
                  ? "bg-bg-base border-bg-navy/5"
                  : "bg-transparent border-bg-navy/5 opacity-50 grayscale"
              }`}
            >
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${badge.earned ? "bg-accent-purple/15 text-accent-purple" : "bg-bg-navy/5 text-text-muted"}`}>
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {badge.icon}
                </span>
              </div>
              <p className={`text-xs font-bold ${badge.earned ? "text-text-primary" : "text-text-muted"}`}>
                {badge.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white rounded-[2rem] shadow-atmospheric px-2 py-4">
        <h3 className="font-headline text-lg font-bold text-text-primary mb-2 px-6 pt-2">Account & Settings</h3>
        <div className="flex flex-col">
          {settingsOptions.map((option, i) => (
            <button
              key={i}
              onClick={option.action}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-bg-base transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-bg-navy/5 flex items-center justify-center group-hover:bg-bg-navy/10 transition-colors">
                  <span className="material-symbols-outlined text-text-secondary">{option.icon}</span>
                </div>
                <span className="text-[15px] font-bold text-text-primary tracking-tight">{option.label}</span>
              </div>
              <span className="material-symbols-outlined text-text-muted text-lg transition-transform group-hover:translate-x-1">chevron_right</span>
            </button>
          ))}

          <div className="h-[1px] bg-bg-navy/5 mx-6 my-2" />

          <button
            onClick={handleLogout}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-error/5 transition-colors group rounded-b-[1.5rem]"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center group-hover:bg-error/20 transition-colors">
                <span className="material-symbols-outlined text-error">logout</span>
              </div>
              <span className="text-[15px] font-bold text-error tracking-tight">Sign Out</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
