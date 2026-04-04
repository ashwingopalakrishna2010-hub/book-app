import { useAuth } from "../../context/AuthContext";
import { useApp } from "../../context/AppContext";
import { useState, useEffect } from "react";

export default function TopAppBar() {
  const { user } = useAuth();
  const { streak } = useApp();

  const displayName = user?.displayName || user?.email?.split("@")[0] || "Reader";
  const initials = displayName.slice(0, 2).toUpperCase();

  // Scroll state management
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show when at the top
      if (currentScrollY === 0) {
        setIsVisible(true);
        setOpacity(1);
        setLastScrollY(currentScrollY);
        return;
      }

      // Calculate opacity based on scroll distance (0-100px range)
      if (currentScrollY > 50 && currentScrollY > lastScrollY) {
        // Scrolling down - gradually fade out
        const fadeStart = 50;
        const fadeEnd = 150;
        const scrollRange = fadeEnd - fadeStart;
        const scrollProgress = Math.min((currentScrollY - fadeStart) / scrollRange, 1);
        
        setOpacity(1 - scrollProgress);
        
        // Completely hide after fadeEnd
        if (currentScrollY > fadeEnd) {
          setIsVisible(false);
        }
      } 
      // Show immediately when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
        setOpacity(1);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttled scroll handler for performance
    const throttledHandleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 w-full lg:hidden left-0 z-50 flex justify-between items-center px-5 py-4 transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'translate-y-0' 
          : '-translate-y-full'
      }`}
      style={{ opacity: opacity }}
    >
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
