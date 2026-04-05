import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: "home", label: "Home" },
  { to: "/discover", icon: "auto_stories", label: "Library" },
  { to: "/reviews", icon: "psychology", label: "Reviews" },
  { to: "/shelf", icon: "bookmark", label: "Shelf" },
  { to: "/profile", icon: "settings", label: "Settings" },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 lg:hidden w-[calc(100%-2.5rem)] max-w-md">
      <div className="flex justify-around items-center px-2 py-2 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-[0_2px_8px_rgba(3,22,50,0.06),0_8px_32px_rgba(3,22,50,0.08)]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex items-center justify-center"
            end={item.to === "/"}
          >
            {({ isActive }) => (
              <div
                className={`w-12 h-12 flex flex-col items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-bg-navy text-text-inverse scale-105 shadow-[0_2px_8px_rgba(3,22,50,0.2)]"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  {item.icon}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
