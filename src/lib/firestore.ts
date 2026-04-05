import {
  collection, doc, getDoc, getDocs, setDoc, updateDoc, addDoc, deleteDoc,
  query, where, orderBy, collectionGroup
} from 'firebase/firestore';
import { db } from './firebase';
import type { 
  Book, Chapter, Question, UserBook, UserChapter, 
  ScheduledReview, GradeResult, StreakData 
} from '../types';

// ============================================
// Books & Chapters (read-only catalog)
// ============================================
export async function getAllBooks(): Promise<Book[]> {
  const snap = await getDocs(collection(db, 'books'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Book));
}

export async function getBookChapters(bookId: string): Promise<Chapter[]> {
  const snap = await getDocs(
    query(collection(db, 'books', bookId, 'chapters'), orderBy('number'))
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as Chapter));
}

export async function getAllChapters(): Promise<Chapter[]> {
  const snap = await getDocs(collectionGroup(db, 'chapters'));
  return snap.docs.map(d => {
    const bookId = d.ref.parent.parent?.id || '';
    return { id: d.id, bookId, ...d.data() } as unknown as Chapter;
  });
}

export async function getBookQuestions(bookId: string, chapterNumber: number): Promise<Question[]> {
  const snap = await getDocs(
    query(
      collectionGroup(db, 'questions'),
      where('bookId', '==', bookId),
      where('chapterNumber', '==', chapterNumber)
    )
  );
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Question));
}

export async function getAllQuestions(): Promise<Question[]> {
  const snap = await getDocs(collectionGroup(db, 'questions'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as unknown as Question));
}

// ============================================
// User Books
// ============================================
export async function getUserBooks(userId: string): Promise<UserBook[]> {
  const snap = await getDocs(collection(db, 'users', userId, 'userBooks'));
  return snap.docs.map(d => ({ bookId: d.id, ...d.data() } as UserBook));
}

export async function addBookToShelf(userId: string, bookId: string): Promise<void> {
  await setDoc(doc(db, 'users', userId, 'userBooks', bookId), {
    status: 'reading',
    overallScore: null,
    chaptersCompleted: 0,
    startedAt: new Date().toISOString(),
    completedAt: null,
  });
}

export async function getUserBook(userId: string, bookId: string): Promise<UserBook | null> {
  const snap = await getDoc(doc(db, 'users', userId, 'userBooks', bookId));
  return snap.exists() ? { bookId: snap.id, ...snap.data() } as UserBook : null;
}

export async function removeBookFromShelf(userId: string, bookId: string): Promise<void> {
  // First, get all userChapters for this book
  const chaptersSnap = await getDocs(collection(db, 'users', userId, 'userBooks', bookId, 'userChapters'));
  
  // Delete all chapters within the subcollection
  const deletePromises = chaptersSnap.docs.map(chapterDoc => deleteDoc(chapterDoc.ref));
  await Promise.all(deletePromises);

  // Then delete the actual book documentation
  await deleteDoc(doc(db, 'users', userId, 'userBooks', bookId));
}

// ============================================
// User Chapters
// ============================================
export async function getUserChapters(userId: string, bookId: string): Promise<UserChapter[]> {
  const snap = await getDocs(collection(db, 'users', userId, 'userBooks', bookId, 'userChapters'));
  return snap.docs.map(d => ({ chapterId: d.id, ...d.data() } as UserChapter));
}

export async function getUserChapter(userId: string, bookId: string, chapterId: string): Promise<UserChapter | null> {
  const snap = await getDoc(doc(db, 'users', userId, 'userBooks', bookId, 'userChapters', chapterId));
  return snap.exists() ? { chapterId: snap.id, ...snap.data() } as UserChapter : null;
}

export async function markChapterRead(
  userId: string, bookId: string, chapterId: string, chapterNumber: number, totalChapters: number, aiScore?: number
): Promise<void> {
  // Mark the chapter — always 'read' so it enters the review queue.
  // Only the Review page graduates a chapter to 'reviewed'.
  const hasScore = aiScore !== undefined;
  const scorePct = hasScore ? aiScore : null;
  
  await setDoc(doc(db, 'users', userId, 'userBooks', bookId, 'userChapters', chapterId), {
    bookId,
    chapterNumber,
    status: 'read',
    retentionScore: scorePct,
    readAt: new Date().toISOString(),
  });

  // Update book progress and recalculate overall score
  const chapters = await getUserChapters(userId, bookId);
  const completedCount = chapters.filter(c => c.status === 'read' || c.status === 'reviewed').length + 1; // +1 for the current one
  
  const updateData: any = {
    chaptersCompleted: completedCount,
    status: completedCount >= totalChapters ? 'completed' : 'reading',
  };

  // Recalculate average retention score if needed
  const scored = chapters.filter(c => c.retentionScore !== null);
  if (hasScore) {
    scored.push({ retentionScore: scorePct } as any); // include the current one for average
  }
  if (scored.length > 0) {
    updateData.overallScore = Math.round(scored.reduce((sum, c) => sum + (c.retentionScore || 0), 0) / scored.length);
  }

  await updateDoc(doc(db, 'users', userId, 'userBooks', bookId), updateData);
}

export async function updateChapterScore(
  userId: string, bookId: string, chapterId: string, score: number
): Promise<void> {
  await updateDoc(doc(db, 'users', userId, 'userBooks', bookId, 'userChapters', chapterId), {
    retentionScore: score,
    status: 'reviewed',
  });

  // Recalculate overall book score
  const chapters = await getUserChapters(userId, bookId);
  const scored = chapters.filter(c => c.retentionScore !== null);
  if (scored.length > 0) {
    const avg = Math.round(scored.reduce((sum, c) => sum + (c.retentionScore || 0), 0) / scored.length);
    await updateDoc(doc(db, 'users', userId, 'userBooks', bookId), {
      overallScore: avg,
    });
  }
}

// ============================================
// Scheduled Reviews
// ============================================
export async function getScheduledReviews(userId: string): Promise<ScheduledReview[]> {
  const snap = await getDocs(collection(db, 'users', userId, 'reviews'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() } as ScheduledReview));
}

export async function scheduleReview(
  userId: string,
  review: Omit<ScheduledReview, 'id'>
): Promise<void> {
  await addDoc(collection(db, 'users', userId, 'reviews'), review);
}

export async function completeReview(userId: string, reviewId: string, score: number): Promise<void> {
  await updateDoc(doc(db, 'users', userId, 'reviews', reviewId), {
    status: 'completed',
    retentionScore: score,
    completedAt: new Date().toISOString(),
  });
}

// ============================================
// Streak
// ============================================
export async function getStreak(userId: string): Promise<StreakData> {
  const snap = await getDoc(doc(db, 'users', userId));
  const data = snap.data();
  const streak = data?.streak || { currentStreak: 0, longestStreak: 0, lastActivityDate: '' };

  // Auto-detect stale streak: if last activity was more than 1 day ago, reset current streak
  if (streak.lastActivityDate) {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (streak.lastActivityDate !== today && streak.lastActivityDate !== yesterday) {
      streak.currentStreak = 0;
    }
  }

  return streak;
}

export async function updateStreak(userId: string): Promise<StreakData> {
  const today = new Date().toISOString().split('T')[0];
  const snap = await getDoc(doc(db, 'users', userId));
  const data = snap.data();
  const streak = data?.streak || { currentStreak: 0, longestStreak: 0, lastActivityDate: '' };

  if (streak.lastActivityDate === today) return streak; // already counted today

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const isConsecutive = streak.lastActivityDate === yesterday;

  const newStreak = isConsecutive ? streak.currentStreak + 1 : 1;
  const newLongest = Math.max(streak.longestStreak, newStreak);

  const updatedStreak: StreakData = {
    currentStreak: newStreak,
    longestStreak: newLongest,
    lastActivityDate: today,
  };

  await setDoc(doc(db, 'users', userId), { streak: updatedStreak }, { merge: true });

  return updatedStreak;
}

// ============================================
// AI Grading — actual grading is now handled by src/lib/ai.ts
// This function is kept for backward compatibility.
// ============================================
export async function gradeAnswer(_questionId: string, _answer: string, aiScore?: number): Promise<GradeResult> {
  const score = aiScore ?? 50; // Default to 50% instead of 5
  return {
    score,
    summary: 'Answer graded by AI.',
    gotRight: [],
    missed: [],
    misunderstood: [],
    conceptExplanation: '',
  };
}
