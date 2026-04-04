import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

export default function TopAppBar() {
  const { user } = useAuth();
  const { streak } = useApp();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Reader";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="fixed top-0 w-full lg:hidden left-0 z-50 flex justify-between items-center px-5 py-4">
      {/* Frosted glass background */}
      <div className="absolute inset-0 bg-bg-base/70 backdrop-blur-xl border-b border-border" />

      {/* Avatar */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent-purple/20 border-2 border-accent-purple/40 flex items-center justify-center text-accent-purple font-bold text-sm">
          {initials}
        </div>
        <div>
          <p className="text-text-primary font-bold text-sm leading-tight">{displayName}</p>
          {streak.currentStreak > 0 && (
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-accent-lime text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <span className="text-[10px] font-bold text-accent-lime">{streak.currentStreak} day streak</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Icons */}
      <div className="relative z-10 flex items-center gap-2">
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">search</span>
        </button>
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
          <span className="material-symbols-outlined text-xl">notifications</span>
        </button>
      </div>
    </header>
  );
}
