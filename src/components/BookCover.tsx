import { BOOK_COLORS } from "../data/mockData";
import "./BookCover.css";

interface BookCoverProps {
  bookId: string;
  title: string;
  author: string;
  size?: "small" | "medium" | "large";
}

export default function BookCover({
  bookId,
  title,
  author,
  size = "medium",
}: BookCoverProps) {
  const colors = BOOK_COLORS[bookId] || { bg: "#1a1a2e", accent: "#e94560" };
  const words = title.split(/[\s:]+/).filter((w) => w.length > 2);
  const initials = words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`book-cover book-cover-${size} tilt-press`}>
      {/* Layered gradient background */}
      <div
        className="book-cover-bg"
        style={{
          background: `linear-gradient(160deg, ${colors.bg} 0%, ${colors.bg}cc 60%, ${colors.accent}15 100%)`,
        }}
      />

      {/* Noise texture overlay */}
      <div className="book-cover-noise" />

      {/* Decorative accent elements */}
      <div
        className="book-cover-accent-line"
        style={{
          background: `linear-gradient(180deg, ${colors.accent}, transparent)`,
        }}
      />
      <div
        className="book-cover-accent-dot"
        style={{ background: colors.accent }}
      />

      {/* Top accent bar */}
      <div
        className="book-cover-top-bar"
        style={{
          background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent}44)`,
        }}
      />

      {/* Spine */}
      <div
        className="book-cover-spine"
        style={{
          background: `linear-gradient(180deg, ${colors.accent}bb, ${colors.accent}22)`,
        }}
      />

      {/* Content */}
      <div className="book-cover-content">
        <div className="book-cover-initials-wrap">
          <span
            className="book-cover-initials"
            style={{ color: colors.accent }}
          >
            {initials}
          </span>
        </div>
        <div className="book-cover-text">
          <span className="book-cover-title">{title}</span>
          <span className="book-cover-author">{author}</span>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="book-cover-bottom-fade"
        style={{ background: `linear-gradient(transparent, ${colors.bg})` }}
      />
    </div>
  );
}
