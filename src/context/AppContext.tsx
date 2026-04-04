import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import * as db from "../lib/firestore";
import type {
  Book,
  Chapter,
  Question,
  UserBook,
  UserChapter,
  ScheduledReview,
  StreakData,
  GradeResult,
} from "../types";
import {
  CHAPTERS as MOCK_CHAPTERS,
  QUESTIONS as MOCK_QUESTIONS,
} from "../data/mockData";

// Fallback to mock data for static catalog if Firebase is still seeding
const fallbackChapters = MOCK_CHAPTERS;
const fallbackQuestions = MOCK_QUESTIONS;

interface AppState {
  books: Book[];
  userBooks: UserBook[];
  userChapters: UserChapter[];
  scheduledReviews: ScheduledReview[];
  streak: StreakData;
  loading: boolean;
  addBookToShelf: (bookId: string) => Promise<void>;
  removeBookFromShelf: (bookId: string) => Promise<void>;
  markChapterRead: (
    bookId: string,
    chapterId: string,
    chapterNumber: number,
    aiScore?: number,
  ) => Promise<void>;
  submitAnswer: (questionId: string, answer: string, aiScore?: number) => Promise<GradeResult>;
  getBookChapters: (bookId: string) => Chapter[];
  getBookQuestions: (bookId: string, chapterNumber: number) => Question[];
  getUserBook: (bookId: string) => UserBook | undefined;
  getUserChapter: (chapterId: string) => UserChapter | undefined;
  getBookProgress: (bookId: string) => number;
  getBookRetention: (bookId: string) => number | null;
  completeReview: (reviewId: string, score: number) => Promise<void>;
  refreshStreak: () => Promise<void>;
  saveQuizResult: (bookId: string, chapterId: string, score: number) => Promise<void>;
}

const AppContext = createContext<AppState | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [books, setBooks] = useState<Book[]>([]);
  const [allChapters, setAllChapters] = useState<Chapter[]>(fallbackChapters);
  const [allQuestions, setAllQuestions] =
    useState<Question[]>(fallbackQuestions);

  const [userBooks, setUserBooks] = useState<UserBook[]>([]);
  const [userChapters, setUserChapters] = useState<UserChapter[]>([]);
  const [scheduledReviews, setScheduledReviews] = useState<ScheduledReview[]>(
    [],
  );
  const [streak, setStreak] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: "",
  });
  const [loading, setLoading] = useState(true);

  // Load static catalog on mount
  useEffect(() => {
    const loadCatalog = async () => {
      try {
        const [fetchedBooks, fetchedChapters, fetchedQuestions] = await Promise.all([
          db.getAllBooks(),
          db.getAllChapters(),
          db.getAllQuestions(),
        ]);

        if (fetchedBooks.length > 0) {
          setBooks(fetchedBooks);
          setAllChapters(fetchedChapters);
          setAllQuestions(fetchedQuestions);
        }
      } catch (err) {
        console.error(
          "Failed to load catalog from Firestore, check if seeded",
          err,
        );
      } finally {
        setLoading(false);
      }
    };
    loadCatalog();
  }, []);

  // Refresh streak — call after any reading activity
  const refreshStreak = useCallback(async () => {
    if (!user) return;
    const updated = await db.updateStreak(user.uid);
    setStreak(updated);
  }, [user]);

  // Load user-specific data when auth state changes
  const loadUserData = useCallback(async () => {
    if (!user) {
      setUserBooks([]);
      setUserChapters([]);
      setScheduledReviews([]);
      setStreak({ currentStreak: 0, longestStreak: 0, lastActivityDate: "" });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const [ubs, reviews, currentStreak] = await Promise.all([
        db.getUserBooks(user.uid),
        db.getScheduledReviews(user.uid),
        db.getStreak(user.uid),
      ]);

      const ucs = await Promise.all(
        ubs.map((ub) => db.getUserChapters(user.uid, ub.bookId)),
      );

      setUserBooks(ubs);
      setUserChapters(ucs.flat());
      setScheduledReviews(reviews);
      setStreak(currentStreak);
    } catch (err) {
      console.error("Failed to load user data", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const addBookToShelf = useCallback(
    async (bookId: string) => {
      if (!user) return;
      await db.addBookToShelf(user.uid, bookId);
      await loadUserData();
    },
    [user, loadUserData],
  );

  const removeBookFromShelf = useCallback(
    async (bookId: string) => {
      if (!user) return;
      await db.removeBookFromShelf(user.uid, bookId);
      await loadUserData();
    },
    [user, loadUserData],
  );

  const markChapterRead = useCallback(
    async (bookId: string, chapterId: string, chapterNumber: number, aiScore?: number) => {
      if (!user) return;
      const totalChapters =
        books.find((b) => b.id === bookId)?.totalChapters ||
        allChapters.filter((c) => c.bookId === bookId).length;
      await db.markChapterRead(
        user.uid,
        bookId,
        chapterId,
        chapterNumber,
        totalChapters,
        aiScore,
      );
      await refreshStreak(); // Bump streak on reading activity
      await loadUserData(); // Refresh state
    },
    [user, loadUserData, refreshStreak, books, allChapters],
  );

  const submitAnswer = useCallback(
    async (questionId: string, answer: string, aiScore?: number): Promise<GradeResult> => {
      const result = await db.gradeAnswer(questionId, answer, aiScore);
      return result;
    },
    [],
  );

  const getBookChapters = useCallback(
    (bookId: string) => {
      return allChapters
        .filter((c) => c.bookId === bookId)
        .sort((a, b) => a.number - b.number);
    },
    [allChapters],
  );

  const getBookQuestions = useCallback(
    (bookId: string, chapterNumber: number) => {
      return allQuestions.filter(
        (q) => q.bookId === bookId && q.chapterNumber === chapterNumber,
      );
    },
    [allQuestions],
  );

  const getUserBook = useCallback(
    (bookId: string) => {
      return userBooks.find((ub) => ub.bookId === bookId);
    },
    [userBooks],
  );

  const getUserChapter = useCallback(
    (chapterId: string) => {
      return userChapters.find((uc) => uc.chapterId === chapterId);
    },
    [userChapters],
  );

  const getBookProgress = useCallback(
    (bookId: string) => {
      const book = books.find((b) => b.id === bookId) || {
        totalChapters: getBookChapters(bookId).length,
      };
      const ub = userBooks.find((u) => u.bookId === bookId);
      if (!book || !ub || !book.totalChapters) return 0;
      return Math.round((ub.chaptersCompleted / book.totalChapters) * 100);
    },
    [userBooks, books, getBookChapters],
  );

  const getBookRetention = useCallback(
    (bookId: string) => {
      const chapters = userChapters.filter(
        (uc) => uc.bookId === bookId && uc.retentionScore !== null,
      );
      if (chapters.length === 0) return null;
      const avg =
        chapters.reduce((sum, c) => sum + (c.retentionScore || 0), 0) /
        chapters.length;
      return Math.round(avg);
    },
    [userChapters],
  );

  const completeReview = useCallback(
    async (reviewId: string, score: number) => {
      if (!user) return;

      const review = scheduledReviews.find((r) => r.id === reviewId);
      if (!review) return;

      const chapter = getBookChapters(review.bookId).find(
        (c) => c.number === review.chapterNumber,
      );
      if (!chapter) return;

      const userChapter = getUserChapter(chapter.id);
      if (userChapter) {
        // Update chapter score in Firestore
        const newScore = Math.round(
          ((userChapter.retentionScore || 0) + score) / 2,
        );
        await db.updateChapterScore(
          user.uid,
          review.bookId,
          chapter.id,
          newScore,
        );
      }

      await db.completeReview(user.uid, reviewId, score);
      await refreshStreak(); // Bump streak on review completion
      await loadUserData();
    },
    [user, scheduledReviews, getUserChapter, getBookChapters, refreshStreak, loadUserData],
  );

  const saveQuizResult = useCallback(
    async (bookId: string, chapterId: string, score: number) => {
      if (!user) return;
      const userChapter = getUserChapter(chapterId);
      const newScore = userChapter?.retentionScore 
        ? Math.round((userChapter.retentionScore + score) / 2)
        : score;

      await db.updateChapterScore(user.uid, bookId, chapterId, newScore);
      await refreshStreak();
      await loadUserData();
    },
    [user, getUserChapter, refreshStreak, loadUserData]
  );

  return (
    <AppContext.Provider
      value={{
        books,
        userBooks,
        userChapters,
        scheduledReviews,
        streak,
        loading,
        addBookToShelf,
        removeBookFromShelf,
        markChapterRead,
        submitAnswer,
        getBookChapters,
        getBookQuestions,
        getUserBook,
        getUserChapter,
        getBookProgress,
        getBookRetention,
        completeReview,
        refreshStreak,
        saveQuizResult,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
