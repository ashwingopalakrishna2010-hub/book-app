export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  description: string;
  totalChapters: number;
  genre: string;
}

export interface Chapter {
  id: string;
  bookId: string;
  number: number;
  title: string;
  keyConcepts: string[];
  content?: string;
}

export interface UserBook {
  bookId: string;
  status: 'reading' | 'completed';
  overallScore: number | null;
  chaptersCompleted: number;
  startedAt: string;
  completedAt: string | null;
}

export interface UserChapter {
  chapterId: string;
  bookId: string;
  chapterNumber: number;
  status: 'unread' | 'read' | 'reviewed';
  retentionScore: number | null;
  readAt: string | null;
}

export interface Question {
  id: string;
  chapterId: string;
  bookId: string;
  text: string;
  difficulty: 'immediate' | 'day3' | 'week3';
  chapterNumber: number;
  concepts?: string[];
}

export interface ScheduledReview {
  id: string;
  questionId: string;
  bookId: string;
  bookTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  questionPreview: string;
  scheduledFor: string; // ISO date
  status: 'pending' | 'completed';
  difficulty: 'day3' | 'week3';
  userId?: string;
}

export interface GradeResult {
  score: number;
  summary: string;
  gotRight: string[];
  missed: string[];
  misunderstood: string[];
  conceptExplanation: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}
