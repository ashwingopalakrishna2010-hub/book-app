import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { BOOKS, CHAPTERS, QUESTIONS } from '../data/mockData';
import { CHAPTER_SUMMARIES } from '../data/chapterSummaries';

const firebaseConfig = {
  apiKey: "AIzaSyBZrtaP4nR-5q4HCM-wEq_NX-7e03vagdc",
  authDomain: "deepread-app.firebaseapp.com",
  projectId: "deepread-app",
  storageBucket: "deepread-app.firebasestorage.app",
  messagingSenderId: "501405291149",
  appId: "1:501405291149:web:5a715b6d65b964252fc8c4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  console.log("Starting seed...");
  
  // Seed Books & Chapters
  for (const book of BOOKS) {
    const bookRef = doc(db, 'books', book.id);
    await setDoc(bookRef, {
      title: book.title,
      author: book.author,
      description: book.description,
      coverUrl: book.coverUrl || "",
      totalChapters: book.totalChapters,
      genre: book.genre
    });
    console.log(`Seeded book: ${book.title}`);

    const bookChapters = CHAPTERS.filter(c => c.bookId === book.id);
    for (const chapter of bookChapters) {
      const chapterRef = doc(db, 'books', book.id, 'chapters', chapter.id);
      await setDoc(chapterRef, {
        number: chapter.number,
        title: chapter.title,
        keyConcepts: chapter.keyConcepts,
        content: CHAPTER_SUMMARIES[chapter.id] || ""
      });
    }
    console.log(`Seeded ${bookChapters.length} chapters for ${book.title}`);
  }

  // Seed Questions
  for (const q of QUESTIONS) {
    const qRef = doc(db, 'questions', q.id);
    await setDoc(qRef, {
      bookId: q.bookId,
      chapterId: q.chapterId,
      chapterNumber: q.chapterNumber,
      text: q.text,
      difficulty: q.difficulty
    });
  }
  console.log(`Seeded ${QUESTIONS.length} questions`);

  console.log("Done!");
  throw new Error("Seeding completed successfully");
}

seed().catch(console.error);
