// Deepread — Custom Icon Library
// Distinctive, non-generic designs with character

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const defaults: IconProps = {
  size: 24,
  color: "currentColor",
};

// Custom Fire Icon — flame shape with character
export function IconFire({ size = 24, color = "#FF6B6B", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path
        d="M16 2C16 2 10 8 10 14C10 17.3 11.7 20 13.5 21.2C12.9 21.5 12.4 22 12 22.5C7.5 24 4 27.5 4 32C4 29.8 5.4 27.8 7.2 27.1C8.8 28.5 10.5 29.5 12.4 29.5C14.3 29.5 16 28.8 17.5 27.5C19.8 29 21.5 29.5 23.2 28.9C25.1 30.2 26.6 28.2 27.2 26.2C29.2 26.5 31 24.3 31 22C31 16.5 25.5 12 20 11.5C18.8 11.3 17.7 11.2 16.6 11.2C14.8 11.2 13.1 10.1 12.2 8.4C11.6 8.4 11 8.4 10.4 8.4C8.5 8.4 7 6.9 7 5C7 3.5 7.5 2 9 2C10.5 2 12 2.5 13.3 3.5C14.5 2.9 15.5 2.5 16 2Z"
        fill={`url(#fireGrad-${className?.replace(/\s/g, '') || 'default'})`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="fireGrad-default" x1="16" y1="2" x2="16" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF6B6B" />
          <stop offset="0.6" stopColor="#FFA500" />
          <stop offset="1" stopColor="#FFD700" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Custom Book Icon — open book with pages
export function IconBook({ size = 24, color = "#38b2b7", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 6C4 4.9 4.9 4 6 4H10L12 7L14 4H26C27.1 4 28 4.9 28 6V22C28 23.1 27.1 24 26 24H14L12 27L10 24H6C4.9 24 4 23.1 4 22V6Z" />
      <path d="M4 8H12L14 11H26" />
      <path d="M4 24H12L14 21H26" />
    </svg>
  );
}

// Custom Trophy — unique shape
export function IconTrophy({ size = 24, color = "#D4A574", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 4L16 4C17.1 4 18 4.9 18 6V8C18 9.1 17.1 10 16 10H15L13 4H8Z" />
      <path d="M24 4L26 8H22L20 4" />
      <path d="M6 12H26V14C26 15.1 25.1 16 24 16H8C6.9 16 6 15.1 6 14V12Z" />
      <path d="M12 16L14 28H18L20 16" />
      <path d="M10 28V30C10 31.1 10.9 32 12 32H20C21.1 32 22 31.1 22 30V28" />
    </svg>
  );
}

// Custom User Icon — elegant circle
export function IconUser({ size = 24, color = "#8b95a1", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="16" cy="13" r="5" fill={`${color}15`} />
      <path d="M6 25C6 20.6 9.7 17 14 17C18.3 17 22 20.6 22 25" />
    </svg>
  );
}

// Custom Edit Icon — pencil with character
export function IconEdit({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 4L24 20" />
      <path d="M6 18L10 22L14 18L18 22L22 18" />
      <path d="M22 6L26 10L22 14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Custom Logout Icon — arrow
export function IconLogOut({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 12L6 16L8 20" />
      <path d="M24 12L26 16L24 20" />
      <path d="M16 8V4" />
      <path d="M6 16H26" />
      <path d="M16 28V24" />
    </svg>
  );
}

// Custom Chevron Right — custom angle
export function IconChevronRight({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 10L22 16L14 22" />
    </svg>
  );
}

// Custom Clock Icon — with decorative hands
export function IconClock({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="16" cy="16" r="13" />
      <path d="M16 9V16" />
      <path d="M16 16C18.2 16 20 17.8 20 20" />
      <circle cx="16" cy="16" r="1.5" fill={color} />
    </svg>
  );
}

// Custom Target Icon — for quizzes
export function IconTarget({ size = 24, color = "#60a5fa", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="16" cy="16" r="4" fill={`${color}20`} />
      <circle cx="16" cy="16" r="8" strokeDasharray="2 2" />
      <circle cx="16" cy="16" r="12" strokeDasharray="3 3" />
    </svg>
  );
}

// Custom Award Icon — star with ribbon
export function IconAward({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 4L18.5 11.5L26 14L20 19L22 26L16 23L10 26L12 19L6 14L13.5 11.5L16 4Z" />
      <path d="M16 14V26" strokeDasharray="2 2" />
    </svg>
  );
}

// Custom Plus Icon — with flare
export function IconPlus({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" className={className}>
      <line x1="16" y1="8" x2="16" y2="24" />
      <line x1="8" y1="16" x2="24" y2="16" />
    </svg>
  );
}

// Custom Search Icon — elegant magnifying glass
export function IconSearch({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="14" cy="14" r="7" />
      <line x1="21" y1="21" x2="28" y2="28" />
    </svg>
  );
}

// Custom BookShelf Icon — books on shelf
export function IconBookShelf({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 8H6C8 8 10 10 10 12V28C10 30 9 32 7 32H4C2 32 1 31 1 29V10C1 8 2 8 4 8Z" fill={`${color}20`} />
      <path d="M14 5H16C18 5 20 7 20 9V28C20 30 19 32 17 32H14C12 32 11 31 11 29V8C11 6 12 5 14 5Z" fill={`${color}15`} />
      <path d="M24 6H26C28 6 30 8 30 10V28C30 30 29 32 27 32H24C22 32 21 31 21 29V9C21 7 22 6 24 6Z" fill={`${color}10`} />
      <line x1="1" y1="32" x2="31" y2="32" />
    </svg>
  );
}

// Custom Home Icon — with roof
export function IconHome({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 12V26C6 27.1 6.9 28 8 28H24C25.1 28 26 27.1 26 26V12" />
      <path d="M4 12H28" />
      <path d="M12 4V12" />
      <path d="M20 4V12" />
    </svg>
  );
}

// Custom Lightbulb Icon — for ideas
export function IconLightbulb({ size = 24, color = "#FBBF24", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 4C16 4 10 8 10 14C10 17.3 11.7 20 13.5 21.2C13 21.4 12.5 21.7 12 22C8 22.5 5.5 26.2 5.5 30.5C5.5 31.6 6.3 32.5 7.6 32.5H24.4C25.7 32.5 26.5 31.6 26.5 30.5C26.5 26.2 24 22.5 20 22C19.5 21.7 19 21.4 18.5 21.2C20.3 20 21 17.3 21 14C21 8 15.5 4 15.5 4H16Z" fill={`${color}15`} />
      <path d="M13 28L16 25L19 28" />
    </svg>
  );
}

// Custom Lock Icon — for security
export function IconLock({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="6" y="10" width="20" height="16" rx="2" />
      <path d="M6 14V10C6 7.8 7.8 6 10 6H22C24.2 6 26 7.8 26 10V14" />
      <circle cx="16" cy="20" r="1.5" fill={color} />
    </svg>
  );
}

// Custom Close/X Icon
export function IconX({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" className={className}>
      <line x1="10" y1="10" x2="22" y2="22" />
      <line x1="22" y1="10" x2="10" y2="22" />
    </svg>
  );
}

export function IconAlertTriangle({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 6L28 26H4L16 6Z" fill={`${color}15`} />
      <path d="M16 14V18" />
      <circle cx="16" cy="22" r="1" fill={color} />
    </svg>
  );
}

// Custom Star Icon
export function IconStar({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 4L18.5 11.5L26 14L20 19L22 26L16 23L10 26L12 19L6 14L13.5 11.5L16 4Z" fill={`${color}20`} />
    </svg>
  );
}

// Custom Send/Arrow Icon
export function IconSend({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 16C4 12.7 6.7 10 10 10C11.7 10 13.2 10.8 14.3 12L24 22" />
      <path d="M10 22C6.7 22 4 19.3 4 16" />
      <path d="M28 6L24 2" strokeLinecap="round" />
    </svg>
  );
}

// Custom Menu/Hamburger Icon
export function IconMenu({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" className={className}>
      <line x1="6" y1="10" x2="26" y2="10" />
      <line x1="6" y1="16" x2="26" y2="16" />
      <line x1="6" y1="22" x2="26" y2="22" />
    </svg>
  );
}

// Custom Close Icon for nav
export function IconClose({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" className={className}>
      <line x1="8" y1="8" x2="24" y2="24" />
      <line x1="24" y1="8" x2="8" y2="24" />
    </svg>
  );
}

// Custom Check Circle Icon
export function IconCheckCircle({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="16" cy="16" r="14" fill={`${color}15`} />
      <path d="M10 16L14 20L22 12" />
    </svg>
  );
}

// Custom X Circle Icon
export function IconXCircle({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" className={className}>
      <circle cx="16" cy="16" r="14" fill={`${color}15`} />
      <line x1="10" y1="10" x2="22" y2="22" />
      <line x1="22" y1="10" x2="10" y2="22" />
    </svg>
  );
}

// Custom Arrow Right Icon
export function IconArrowRight({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 16L16 8L16 16" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 24L24 16L16 8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Custom Arrow Left Icon
export function IconArrowLeft({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 6L8 16L16 26" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M26 16H8" strokeLinecap="round" />
    </svg>
  );
}

// Custom Check Icon
export function IconCheck({ size = 24, color = "currentColor", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M8 16L14 22L24 10" />
    </svg>
  );
}

// Custom Brain Icon — for reviews/learning
export function IconBrain({ size = 24, color = "#8b95a1", className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 6C12 6 8 10 8 14C8 17.5 10.3 20.5 13 21.3C12.5 21.6 12 22.2 12 22.8C8.5 24.5 6 28.5 6 32C6 29.8 7.4 27.8 9.2 27.1C10.8 28.5 12.5 29.5 14.4 29.5C16.3 29.5 18 28.8 19.5 27.5C21.8 29 23.5 29.5 25.2 28.9C27.1 30.2 28.6 28.2 29.2 26.2C31.2 26.5 33 24.3 33 22C33 16.5 27.5 12 22 11.5C20.8 11.3 19.7 11.2 18.6 11.2C16.8 11.2 15.1 10.1 14.2 8.4C13.6 8.4 13 8.4 12.4 8.4C10.5 8.4 9 6.9 9 5C9 3.5 9.5 2 11 2C12.5 2 14 2.5 15.3 3.5C16.5 2.9 17.5 2.5 18 2Z" fill={`${color}20`} />
      <circle cx="9" cy="7.5" r="1" fill={color} />
      <circle cx="23" cy="7.5" r="1" fill={color} />
    </svg>
  );
}

// Score Ring Component
export function ScoreRing({
  score,
  size = 48,
  strokeWidth = 3,
  className,
}: {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#34d399" : score >= 50 ? "#fbbf24" : "#f87171";

  return (
    <svg width={size} height={size} className={className} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
    </svg>
  );
}

// Logo Icon
export function LogoIcon({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <rect width="32" height="32" rx="8" fill="url(#logoGrad)" />
      <path d="M10 8h8a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-8V8z" fill="white" opacity="0.9" />
      <path d="M10 16h9a4.5 4.5 0 0 1 4.5 4.5v0A4.5 4.5 0 0 1 19 25h-9V16z" fill="white" opacity="0.6" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14a3a8" />
          <stop offset="1" stopColor="#7C5CFC" />
        </linearGradient>
      </defs>
    </svg>
  );
}
