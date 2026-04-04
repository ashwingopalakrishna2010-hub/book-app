import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";

const navItems = [
  { to: "/", icon: "home", label: "Home" },
  { to: "/discover", icon: "auto_stories", label: "Library" },
  { to: "/reviews", icon: "psychology", label: "Reviews" },
  { to: "/shelf", icon: "bookmark", label: "Shelf" },
  { to: "/profile", icon: "settings", label: "Settings" },
];

export default function Sidebar() {
  const { user } = useAuth();
  const { streak } = useApp();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Reader";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-bg-raised/50 backdrop-blur-xl border-r border-border px-6 py-8 z-50">
      {/* Aurora decorations */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-accent-purple/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-accent-pink/6 rounded-full blur-[60px] pointer-events-none" />

      {/* Brand */}
      <div className="flex items-center gap-3 mb-12 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-accent-lime flex items-center justify-center">
          <span className="material-symbols-outlined text-text-inverse text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            menu_book
          </span>
        </div>
        <h1 className="text-2xl font-headline italic text-text-primary">DeepRead</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 relative z-10">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-accent-lime/10 text-accent-lime font-bold"
                  : "text-text-secondary hover:bg-bg-glass hover:text-text-primary"
              }`
            }
            end={item.to === "/"}
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-semibold tracking-wide">
                  {item.label}
                </span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-lime" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Footer */}
      <div className="relative z-10 mt-auto px-3 py-4 rounded-xl glass">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-purple/20 border-2 border-accent-purple/30 flex items-center justify-center text-accent-purple font-bold text-sm">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-text-primary truncate">{displayName}</p>
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-accent-lime text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                local_fire_department
              </span>
              <p className="text-[11px] text-accent-lime font-semibold">
                {streak.currentStreak} day streak
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
