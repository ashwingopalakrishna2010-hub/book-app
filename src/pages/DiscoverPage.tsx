import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const genres = ["All", "Fiction", "Philosophy", "Psychology", "Science"];

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const { books, userBooks, addBookToShelf } = useApp();
  const navigate = useNavigate();

  const filteredBooks = books.filter((b) => {
    const matchesSearch = !searchQuery.trim() ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === "All" || b.genre?.toLowerCase() === activeGenre.toLowerCase();
    return matchesSearch && matchesGenre;
  });

  const isOnShelf = (bookId: string) =>
    userBooks.some((ub) => ub.bookId === bookId);

  const handleAdd = (e: React.MouseEvent, bookId: string) => {
    e.stopPropagation();
    addBookToShelf(bookId);
    setAddedIds((prev) => new Set(prev).add(bookId));
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-headline text-3xl font-bold text-text-primary mb-1">Discover</h1>
        <p className="text-text-secondary text-sm">Find your next deep read.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted z-10">
          search
        </span>
        <input
          type="text"
          className="w-full bg-white pl-12 pr-4 py-3.5 rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-bg-navy/10 transition-all text-sm shadow-atmospheric"
          placeholder="Search books, authors, or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Genre Pills */}
      <div className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar pb-1">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`pill flex-shrink-0 ${
              activeGenre === genre ? "pill-active" : "pill-inactive"
            }`}
            onClick={() => setActiveGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Section Label */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-headline text-lg text-text-primary">
          {searchQuery ? `Results (${filteredBooks.length})` : "Popular Books"}
        </h2>
        <span className="text-text-secondary text-[11px] font-bold uppercase tracking-[0.1em]">
          See all
        </span>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.map((book) => {
          const onShelf = isOnShelf(book.id);
          const justAdded = addedIds.has(book.id);
          return (
            <div
              key={book.id}
              className={`bg-white rounded-2xl p-5 flex flex-col cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(3,22,50,0.08),0_12px_48px_rgba(3,22,50,0.06)] group shadow-atmospheric`}
              onClick={() => (onShelf ? navigate(`/book/${book.id}`) : undefined)}
            >
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(3,22,50,0.12)] group-hover:shadow-[0_8px_24px_rgba(3,22,50,0.15)] transition-all">
                  {book.coverUrl ? (
                    <img className="w-full h-full object-contain bg-bg-base" alt={book.title} src={book.coverUrl} />
                  ) : (
                    <div className="w-full h-full bg-bg-base flex items-center justify-center">
                      <span className="material-symbols-outlined text-text-muted">menu_book</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-headline text-base text-text-primary leading-tight mb-1.5 line-clamp-2 group-hover:text-bg-navy transition-colors">{book.title}</h3>
                  <p className="text-text-secondary text-xs mb-3 line-clamp-1">{book.author}</p>
                  <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-[0.1em]">
                    <span className="px-2 py-0.5 bg-bg-base rounded-md text-text-secondary">{book.totalChapters} Ch.</span>
                    <span className="px-2 py-0.5 bg-accent-purple/10 text-accent-purple rounded-md">{book.genre}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-5 line-clamp-2 flex-1 leading-relaxed">
                {book.description}
              </p>

              {onShelf ? (
                <button
                  className={`w-full py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all duration-300 ${
                    justAdded
                      ? "bg-bg-navy text-text-inverse"
                      : "bg-bg-base text-text-primary hover:bg-bg-card-hover"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/book/${book.id}`);
                  }}
                >
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {justAdded ? "check" : "menu_book"}
                  </span>
                  {justAdded ? "Added to Shelf" : "Read Now"}
                </button>
              ) : (
                <button
                  className="w-full py-3 btn-silk rounded-xl text-sm flex justify-center items-center gap-2 hover:scale-[1.02] transition-all active:scale-[0.98]"
                  onClick={(e) => handleAdd(e, book.id)}
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add to Shelf
                </button>
              )}
            </div>
          );
        })}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl mt-4 shadow-atmospheric">
          <span className="material-symbols-outlined text-text-muted text-5xl mb-4">search_off</span>
          <p className="text-text-primary font-headline text-xl mb-2">No books found</p>
          <p className="text-text-secondary">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
