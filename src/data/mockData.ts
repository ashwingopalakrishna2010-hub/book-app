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
}

export interface UserBook {
  bookId: string;
  status: "reading" | "completed";
  overallScore: number | null;
  chaptersCompleted: number;
  startedAt: string;
  completedAt: string | null;
}

export interface UserChapter {
  chapterId: string;
  bookId: string;
  chapterNumber: number;
  status: "unread" | "read" | "reviewed";
  retentionScore: number | null;
  readAt: string | null;
}

export interface Question {
  id: string;
  chapterId: string;
  bookId: string;
  text: string;
  difficulty: "immediate" | "day3" | "week3";
  chapterNumber: number;
}

export interface GradeResult {
  score: number;
  summary: string;
  gotRight: string[];
  missed: string[];
  misunderstood: string[];
  conceptExplanation: string;
}

export interface ScheduledReview {
  id: string;
  questionId: string;
  bookId: string;
  bookTitle: string;
  chapterNumber: number;
  chapterTitle: string;
  questionPreview: string;
  scheduledFor: string;
  status: "pending" | "completed";
  difficulty: "day3" | "week3";
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

// ============================================
// MOCK BOOKS
// ============================================
export const BOOKS: Book[] = [
  {
    id: "thinking-fast-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverUrl: "/images/books/cover_thinking_fast_slow_1774707431582.png",
    description:
      "A groundbreaking exploration of the two systems that drive the way we think: System 1, which is fast, intuitive, and emotional; and System 2, which is slower, more deliberative, and logical.",
    totalChapters: 9,
    genre: "Psychology",
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "/images/books/cover_atomic_habits_1774707449231.png",
    description:
      "An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.",
    totalChapters: 8,
    genre: "Self-Improvement",
  },
  {
    id: "sapiens",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    coverUrl: "/images/books/cover_sapiens_1774707462888.png",
    description:
      "A sweeping narrative of humanity's creation and evolution that explores how biology and history have defined us.",
    totalChapters: 10,
    genre: "History",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    coverUrl: "/images/books/cover_deep_work_1774707476715.png",
    description:
      "Rules for focused success in a distracted world. Learn why the ability to focus deeply is becoming increasingly rare and valuable.",
    totalChapters: 7,
    genre: "Productivity",
  },
  {
    id: "man-search-meaning",
    title: "Meditations",
    author: "Marcus Aurelius",
    coverUrl: "/images/books/cover_meditations.png",
    description:
      "Personal writings of the Roman Emperor Marcus Aurelius, offering timeless Stoic wisdom on self-discipline, duty, and finding tranquility in the face of life's challenges.",
    totalChapters: 12,
    genre: "Philosophy",
  },
  {
    id: "psychology-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverUrl: "/images/books/cover_psychology_of_money_1774707504192.png",
    description:
      "Timeless lessons on wealth, greed, and happiness. Explores the strange ways people think about money.",
    totalChapters: 8,
    genre: "Finance",
  },
  {
    id: "crime-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    coverUrl: "/images/books/cover_crime_punishment.png",
    description:
      "A psychological masterpiece following Raskolnikov, a destitute former student who commits murder and wrestles with guilt, morality, and redemption in 19th-century Saint Petersburg.",
    totalChapters: 41,
    genre: "Classic Literature",
  },
];

// ============================================
// MOCK CHAPTERS
// ============================================
export const CHAPTERS: Chapter[] = [
  // Thinking, Fast and Slow
  {
    id: "tfs-1",
    bookId: "thinking-fast-slow",
    number: 1,
    title: "The Characters of the Story",
    keyConcepts: [
      "System 1",
      "System 2",
      "Automatic thinking",
      "Effortful thinking",
    ],
  },
  {
    id: "tfs-2",
    bookId: "thinking-fast-slow",
    number: 2,
    title: "Attention and Effort",
    keyConcepts: [
      "Cognitive load",
      "Attention capacity",
      "Mental energy",
      "Pupil dilation",
    ],
  },
  {
    id: "tfs-3",
    bookId: "thinking-fast-slow",
    number: 3,
    title: "The Lazy Controller",
    keyConcepts: [
      "Self-control",
      "Ego depletion",
      "Cognitive ease",
      "Flow state",
    ],
  },
  {
    id: "tfs-4",
    bookId: "thinking-fast-slow",
    number: 4,
    title: "The Associative Machine",
    keyConcepts: [
      "Associative memory",
      "Priming",
      "Cognitive ease",
      "Coherent stories",
    ],
  },
  {
    id: "tfs-5",
    bookId: "thinking-fast-slow",
    number: 5,
    title: "Cognitive Ease",
    keyConcepts: ["Familiarity", "Repetition", "Clarity", "Good mood"],
  },
  {
    id: "tfs-6",
    bookId: "thinking-fast-slow",
    number: 6,
    title: "Norms, Surprises, and Causes",
    keyConcepts: ["Norm theory", "Causal thinking", "Statistical baselines"],
  },
  {
    id: "tfs-7",
    bookId: "thinking-fast-slow",
    number: 7,
    title: "A Machine for Jumping to Conclusions",
    keyConcepts: ["WYSIATI", "Anchoring", "Confirmation bias"],
  },
  {
    id: "tfs-8",
    bookId: "thinking-fast-slow",
    number: 8,
    title: "How Judgments Happen",
    keyConcepts: ["Mental shotgun", "Intensity matching", "Substitution"],
  },
  {
    id: "tfs-9",
    bookId: "thinking-fast-slow",
    number: 9,
    title: "Answering an Easier Question",
    keyConcepts: ["Heuristics", "Target question", "Substitution"],
  },

  // Atomic Habits
  {
    id: "ah-1",
    bookId: "atomic-habits",
    number: 1,
    title: "The Surprising Power of Atomic Habits",
    keyConcepts: [
      "1% improvement",
      "Compound growth",
      "Plateau of latent potential",
    ],
  },
  {
    id: "ah-2",
    bookId: "atomic-habits",
    number: 2,
    title: "How Your Habits Shape Your Identity",
    keyConcepts: [
      "Identity-based habits",
      "Outcome vs process vs identity",
      "Two-step change",
    ],
  },
  {
    id: "ah-3",
    bookId: "atomic-habits",
    number: 3,
    title: "How to Build Better Habits in 4 Simple Steps",
    keyConcepts: ["Cue", "Craving", "Response", "Reward", "Habit loop"],
  },
  {
    id: "ah-4",
    bookId: "atomic-habits",
    number: 4,
    title: "The Man Who Didn't Look Right",
    keyConcepts: ["Pointing-and-calling", "Habits scorecard", "Awareness"],
  },
  {
    id: "ah-5",
    bookId: "atomic-habits",
    number: 5,
    title: "The Best Way to Start a New Habit",
    keyConcepts: [
      "Implementation intention",
      "Habit stacking",
      "Diderot effect",
    ],
  },
  {
    id: "ah-6",
    bookId: "atomic-habits",
    number: 6,
    title: "Motivation Is Overrated",
    keyConcepts: ["Environment design", "Visual cues", "Context"],
  },
  {
    id: "ah-7",
    bookId: "atomic-habits",
    number: 7,
    title: "The Secret to Self-Control",
    keyConcepts: [
      "Cue reduction",
      "Discipline vs environment",
      "Inversion of the 1st law",
    ],
  },
  {
    id: "ah-8",
    bookId: "atomic-habits",
    number: 8,
    title: "How to Make a Habit Irresistible",
    keyConcepts: [
      "Temptation bundling",
      "Dopamine spike",
      "Supernormal stimuli",
    ],
  },

  // Sapiens
  {
    id: "sap-1",
    bookId: "sapiens",
    number: 1,
    title: "An Animal of No Significance",
    keyConcepts: [
      "Homo sapiens origins",
      "Multiple human species",
      "Cognitive revolution",
    ],
  },
  {
    id: "sap-2",
    bookId: "sapiens",
    number: 2,
    title: "The Tree of Knowledge",
    keyConcepts: [
      "Cognitive revolution",
      "Language",
      "Gossip theory",
      "Fictional reality",
    ],
  },
  {
    id: "sap-3",
    bookId: "sapiens",
    number: 3,
    title: "A Day in the Life of Adam and Eve",
    keyConcepts: ["Forager lifestyle", "Ancient communes", "Animism"],
  },
  {
    id: "sap-4",
    bookId: "sapiens",
    number: 4,
    title: "The Flood",
    keyConcepts: [
      "Human migration",
      "Megafauna extinction",
      "Ecological impact",
    ],
  },
  {
    id: "sap-5",
    bookId: "sapiens",
    number: 5,
    title: "History's Biggest Fraud",
    keyConcepts: [
      "Agricultural revolution",
      "Wheat domestication",
      "Population trap",
    ],
  },
  {
    id: "sap-6",
    bookId: "sapiens",
    number: 6,
    title: "Building Pyramids",
    keyConcepts: ["Imagined orders", "Social hierarchies", "Myths"],
  },
  {
    id: "sap-7",
    bookId: "sapiens",
    number: 7,
    title: "Memory Overload",
    keyConcepts: ["Writing", "Bureaucracy", "Numbers"],
  },
  {
    id: "sap-8",
    bookId: "sapiens",
    number: 8,
    title: "There Is No Justice in History",
    keyConcepts: ["Social constructs", "Caste systems", "Gender inequality"],
  },
  {
    id: "sap-9",
    bookId: "sapiens",
    number: 9,
    title: "The Arrow of History",
    keyConcepts: ["Unification of humankind", "Universal orders", "Trade"],
  },
  {
    id: "sap-10",
    bookId: "sapiens",
    number: 10,
    title: "The Scent of Money",
    keyConcepts: ["Money", "Trust", "Universal convertibility"],
  },

  // Deep Work
  {
    id: "dw-1",
    bookId: "deep-work",
    number: 1,
    title: "Deep Work Is Valuable",
    keyConcepts: ["Skill premium", "Deliberate practice", "Myelin"],
  },
  {
    id: "dw-2",
    bookId: "deep-work",
    number: 2,
    title: "Deep Work Is Rare",
    keyConcepts: ["Open offices", "Social media", "Busyness as proxy"],
  },
  {
    id: "dw-3",
    bookId: "deep-work",
    number: 3,
    title: "Deep Work Is Meaningful",
    keyConcepts: ["Flow states", "Craftsmanship", "Neurological argument"],
  },
  {
    id: "dw-4",
    bookId: "deep-work",
    number: 4,
    title: "Work Deeply",
    keyConcepts: [
      "Monastic philosophy",
      "Bimodal philosophy",
      "Rhythmic philosophy",
    ],
  },
  {
    id: "dw-5",
    bookId: "deep-work",
    number: 5,
    title: "Embrace Boredom",
    keyConcepts: [
      "Attention residue",
      "Internet fasts",
      "Productive meditation",
    ],
  },
  {
    id: "dw-6",
    bookId: "deep-work",
    number: 6,
    title: "Quit Social Media",
    keyConcepts: ["Any-benefit approach", "Craftsman approach", "SNS detox"],
  },
  {
    id: "dw-7",
    bookId: "deep-work",
    number: 7,
    title: "Drain the Shallows",
    keyConcepts: [
      "Fixed schedule productivity",
      "Shallow work audit",
      "Become hard to reach",
    ],
  },

  // Man's Search for Meaning
  {
    id: "msm-1",
    bookId: "man-search-meaning",
    number: 1,
    title: "Experiences in a Concentration Camp",
    keyConcepts: ["Suffering", "Inner freedom", "Psychological phases"],
  },
  {
    id: "msm-2",
    bookId: "man-search-meaning",
    number: 2,
    title: "The Meaning of Suffering",
    keyConcepts: [
      "Unavoidable suffering",
      "Attitude choice",
      "Tragic optimism",
    ],
  },
  {
    id: "msm-3",
    bookId: "man-search-meaning",
    number: 3,
    title: "Logotherapy in a Nutshell",
    keyConcepts: ["Will to meaning", "Existential vacuum", "Noögenic neurosis"],
  },
  {
    id: "msm-4",
    bookId: "man-search-meaning",
    number: 4,
    title: "The Existential Vacuum",
    keyConcepts: ["Sunday neurosis", "Conformism", "Totalitarianism"],
  },
  {
    id: "msm-5",
    bookId: "man-search-meaning",
    number: 5,
    title: "The Meaning of Life",
    keyConcepts: [
      "Meaning through work",
      "Meaning through love",
      "Meaning through suffering",
    ],
  },
  {
    id: "msm-6",
    bookId: "man-search-meaning",
    number: 6,
    title: "The Essence of Existence",
    keyConcepts: ["Responsibility", "Self-transcendence", "Freedom of will"],
  },

  // Psychology of Money
  {
    id: "pm-1",
    bookId: "psychology-money",
    number: 1,
    title: "No One's Crazy",
    keyConcepts: [
      "Personal experience bias",
      "Different worldviews",
      "Financial decisions",
    ],
  },
  {
    id: "pm-2",
    bookId: "psychology-money",
    number: 2,
    title: "Luck & Risk",
    keyConcepts: ["Role of luck", "Risk assessment", "Outcome bias"],
  },
  {
    id: "pm-3",
    bookId: "psychology-money",
    number: 3,
    title: "Never Enough",
    keyConcepts: ["Social comparison", "Moving goalposts", "Enough concept"],
  },
  {
    id: "pm-4",
    bookId: "psychology-money",
    number: 4,
    title: "Confounding Compounding",
    keyConcepts: [
      "Compound interest",
      "Time horizon",
      "Warren Buffett example",
    ],
  },
  {
    id: "pm-5",
    bookId: "psychology-money",
    number: 5,
    title: "Getting Wealthy vs. Staying Wealthy",
    keyConcepts: ["Survival mindset", "Paranoia", "Margin of safety"],
  },
  {
    id: "pm-6",
    bookId: "psychology-money",
    number: 6,
    title: "Tails, You Win",
    keyConcepts: ["Tail events", "Long tail distribution", "Few big wins"],
  },
  {
    id: "pm-7",
    bookId: "psychology-money",
    number: 7,
    title: "Freedom",
    keyConcepts: ["Time freedom", "Controlling your time", "Happiness"],
  },
  {
    id: "pm-8",
    bookId: "psychology-money",
    number: 8,
    title: "Man in the Car Paradox",
    keyConcepts: ["Wealth signaling", "Respect vs admiration", "Humility"],
  },


  // Crime and Punishment — Part I (7 chapters)
  { id: "cp-1", bookId: "crime-punishment", number: 1, title: "Part I, Ch. 1 — The Pawnbroker's Visit", keyConcepts: ["Raskolnikov's poverty", "The idea of 'the thing'", "The pawnbroker Alyona", "St. Petersburg setting"] },
  { id: "cp-2", bookId: "crime-punishment", number: 2, title: "Part I, Ch. 2 — Marmeladov's Confession", keyConcepts: ["Marmeladov the drunkard", "Sonya's sacrifice", "Katerina Ivanovna", "Poverty and degradation"] },
  { id: "cp-3", bookId: "crime-punishment", number: 3, title: "Part I, Ch. 3 — The Letter from Home", keyConcepts: ["Mother's letter", "Dunya's sacrifice", "Luzhin the suitor", "Parallels to Sonya"] },
  { id: "cp-4", bookId: "crime-punishment", number: 4, title: "Part I, Ch. 4 — Raskolnikov's Torment", keyConcepts: ["Internal debate", "Dunya's marriage as sacrifice", "Moral fury", "The drunk girl on the boulevard"] },
  { id: "cp-5", bookId: "crime-punishment", number: 5, title: "Part I, Ch. 5 — The Dream of the Mare", keyConcepts: ["The mare dream", "Childhood innocence", "Violence and compassion", "Subconscious horror"] },
  { id: "cp-6", bookId: "crime-punishment", number: 6, title: "Part I, Ch. 6 — The Plan Solidifies", keyConcepts: ["Lizaveta's absence", "Fate vs free will", "The final decision", "Predestination feeling"] },
  { id: "cp-7", bookId: "crime-punishment", number: 7, title: "Part I, Ch. 7 — The Murder", keyConcepts: ["The axe murder", "Lizaveta's death", "Theory vs reality", "Chaos and panic"] },

  // Crime and Punishment — Part II (7 chapters)
  { id: "cp-8", bookId: "crime-punishment", number: 8, title: "Part II, Ch. 1 — Hiding the Evidence", keyConcepts: ["Hiding the loot", "Police summons", "Fainting at the station", "Guilt and paranoia"] },
  { id: "cp-9", bookId: "crime-punishment", number: 9, title: "Part II, Ch. 2 — Fever and Razumikhin", keyConcepts: ["Delirious fever", "Razumikhin's loyalty", "The arrested painters", "Isolation vs connection"] },
  { id: "cp-10", bookId: "crime-punishment", number: 10, title: "Part II, Ch. 3 — The Investigation Discussed", keyConcepts: ["Murder investigation details", "Razumikhin's analysis", "Luzhin's visit", "Growing anxiety"] },
  { id: "cp-11", bookId: "crime-punishment", number: 11, title: "Part II, Ch. 4 — Luzhin's True Nature", keyConcepts: ["Luzhin's self-interest", "Confrontation", "Rational exploitation", "Parallels to Raskolnikov"] },
  { id: "cp-12", bookId: "crime-punishment", number: 12, title: "Part II, Ch. 5 — Return to the Scene", keyConcepts: ["Near-confession to Zametov", "Returning to the crime scene", "Self-destructive impulse", "Desire to be caught"] },
  { id: "cp-13", bookId: "crime-punishment", number: 13, title: "Part II, Ch. 6 — Marmeladov's Death", keyConcepts: ["Marmeladov's death", "First meeting with Sonya", "Act of generosity", "Humanity vs nihilism"] },
  { id: "cp-14", bookId: "crime-punishment", number: 14, title: "Part II, Ch. 7 — Mother and Sister Arrive", keyConcepts: ["Family reunion", "Guilt and love", "Razumikhin and Dunya", "Impossible closeness"] },

  // Crime and Punishment — Part III (6 chapters)
  { id: "cp-15", bookId: "crime-punishment", number: 15, title: "Part III, Ch. 1 — The Morning After", keyConcepts: ["Confronting Dunya", "Luzhin debate", "Razumikhin's devotion", "Family tensions"] },
  { id: "cp-16", bookId: "crime-punishment", number: 16, title: "Part III, Ch. 2 — Sonya's Visit", keyConcepts: ["Sonya's visit", "Bowing to suffering", "Kindred spirits", "Transgression and empathy"] },
  { id: "cp-17", bookId: "crime-punishment", number: 17, title: "Part III, Ch. 3 — First Interview with Porfiry", keyConcepts: ["First interview with Porfiry", "The 'On Crime' article", "Extraordinary man theory", "Cat-and-mouse game"] },
  { id: "cp-18", bookId: "crime-punishment", number: 18, title: "Part III, Ch. 4 — Nikolai's Confession", keyConcepts: ["Porfiry's trap", "Nikolai's false confession", "Narrow escape", "Temporary reprieve"] },
  { id: "cp-19", bookId: "crime-punishment", number: 19, title: "Part III, Ch. 5 — 'Murderer!'", keyConcepts: ["The stranger's accusation", "'Murderer!'", "Nightmare repetition", "Psychological torment"] },
  { id: "cp-20", bookId: "crime-punishment", number: 20, title: "Part III, Ch. 6 — Svidrigailov Appears", keyConcepts: ["Svidrigailov introduced", "Dark double", "Ghost of Marfa Petrovna", "Moral freedom without conscience"] },

  // Crime and Punishment — Part IV (6 chapters)
  { id: "cp-21", bookId: "crime-punishment", number: 21, title: "Part IV, Ch. 1 — Svidrigailov's Revelations", keyConcepts: ["Svidrigailov's past", "Dark fascination", "Moral emptiness", "Marfa's inheritance"] },
  { id: "cp-22", bookId: "crime-punishment", number: 22, title: "Part IV, Ch. 2 — Luzhin's Scheming", keyConcepts: ["Luzhin's letter", "Manipulation tactics", "Dunya's resolve", "Family loyalty"] },
  { id: "cp-23", bookId: "crime-punishment", number: 23, title: "Part IV, Ch. 3 — Dismissing Luzhin", keyConcepts: ["Breaking the engagement", "Dunya's strength", "Luzhin's humiliation", "Vow of revenge"] },
  { id: "cp-24", bookId: "crime-punishment", number: 24, title: "Part IV, Ch. 4 — The Lazarus Scene", keyConcepts: ["The Lazarus reading", "Sonya's faith", "Spiritual resurrection theme", "Svidrigailov eavesdropping"] },
  { id: "cp-25", bookId: "crime-punishment", number: 25, title: "Part IV, Ch. 5 — Second Interview with Porfiry", keyConcepts: ["Second Porfiry interview", "Butterfly metaphor", "Raskolnikov's explosion", "The surprise confessor"] },
  { id: "cp-26", bookId: "crime-punishment", number: 26, title: "Part IV, Ch. 6 — The Stranger Apologizes", keyConcepts: ["Stranger's apology", "Multiple witnesses", "Mounting exposure", "Nihilistic exhaustion"] },

  // Crime and Punishment — Part V (5 chapters)
  { id: "cp-27", bookId: "crime-punishment", number: 27, title: "Part V, Ch. 1 — Luzhin's Plot", keyConcepts: ["Luzhin's revenge plot", "Planting the money", "Lebezyatnikov as witness", "Petty villainy"] },
  { id: "cp-28", bookId: "crime-punishment", number: 28, title: "Part V, Ch. 2 — The Funeral Dinner", keyConcepts: ["Funeral dinner", "Katerina's pride", "Poverty and pretension", "Dignity in degradation"] },
  { id: "cp-29", bookId: "crime-punishment", number: 29, title: "Part V, Ch. 3 — Luzhin Exposed", keyConcepts: ["False accusation", "Luzhin exposed", "Lebezyatnikov's testimony", "Decision to confess"] },
  { id: "cp-30", bookId: "crime-punishment", number: 30, title: "Part V, Ch. 4 — Raskolnikov Confesses to Sonya", keyConcepts: ["Confession to Sonya", "Sonya's compassion", "The crossroads", "'I am not a Napoleon'"] },
  { id: "cp-31", bookId: "crime-punishment", number: 31, title: "Part V, Ch. 5 — Katerina's Death", keyConcepts: ["Katerina's madness", "Death scene", "Children's fate", "Svidrigailov's generosity"] },

  // Crime and Punishment — Part VI (8 chapters)
  { id: "cp-32", bookId: "crime-punishment", number: 32, title: "Part VI, Ch. 1 — Porfiry's Ultimatum", keyConcepts: ["Porfiry's final visit", "Direct accusation", "Compassionate ultimatum", "Two days to decide"] },
  { id: "cp-33", bookId: "crime-punishment", number: 33, title: "Part VI, Ch. 2 — 'Become a Sun'", keyConcepts: ["Porfiry's psychology", "Bookish theory critique", "Become a sun", "Life over theory"] },
  { id: "cp-34", bookId: "crime-punishment", number: 34, title: "Part VI, Ch. 3 — Svidrigailov's Leverage", keyConcepts: ["Svidrigailov's leverage", "Overheard confession", "Tavern confrontation", "Parallel transgressors"] },
  { id: "cp-35", bookId: "crime-punishment", number: 35, title: "Part VI, Ch. 4 — Eternity and Spiders", keyConcepts: ["Eternity as a spider room", "Svidrigailov's backstory", "Love and depravity", "The abyss"] },
  { id: "cp-36", bookId: "crime-punishment", number: 36, title: "Part VI, Ch. 5 — Dunya and the Revolver", keyConcepts: ["Dunya and Svidrigailov", "The revolver scene", "Failed blackmail", "Letting go"] },
  { id: "cp-37", bookId: "crime-punishment", number: 37, title: "Part VI, Ch. 6 — Svidrigailov's Last Night", keyConcepts: ["Svidrigailov's nightmares", "Suicide", "Moral freedom's endpoint", "Rain and despair"] },
  { id: "cp-38", bookId: "crime-punishment", number: 38, title: "Part VI, Ch. 7 — Farewell", keyConcepts: ["Goodbye to mother", "Dunya's understanding", "Sonya's cross", "Final preparations"] },
  { id: "cp-39", bookId: "crime-punishment", number: 39, title: "Part VI, Ch. 8 — The Confession", keyConcepts: ["The crossroads", "Kissing the earth", "Police confession", "Surrender"] },

  // Crime and Punishment — Epilogue (2 chapters)
  { id: "cp-40", bookId: "crime-punishment", number: 40, title: "Epilogue, Ch. 1 — Siberia", keyConcepts: ["Siberian exile", "Sonya follows", "Prison life", "Unrepentant pride"] },
  { id: "cp-41", bookId: "crime-punishment", number: 41, title: "Epilogue, Ch. 2 — Resurrection", keyConcepts: ["The plague dream", "Spiritual awakening", "Love as salvation", "Resurrection through suffering"] },

  // Meditations — Book 1 (12 chapters)
  { id: "med-1", bookId: "meditations", number: 1, title: "Book 1 — From My Grandfather Verus", keyConcepts: ["Stoic virtues", "Moral character", "Self-improvement", "Family influence"] },
  { id: "med-2", bookId: "meditations", number: 2, title: "Book 2 — On the River Gran", keyConcepts: ["Impermanence", "Universal reason", "Present moment", "Inner tranquility"] },
  { id: "med-3", bookId: "meditations", number: 3, title: "Book 3 — In Carnuntum", keyConcepts: ["Duty to Rome", "Moral clarity", "Rational action", "Universal nature"] },
  { id: "med-4", bookId: "meditations", number: 4, title: "Book 4 — When Evil Thoughts Arise", keyConcepts: ["Overcoming negativity", "Rational response", "Inner peace", "Mental discipline"] },
  { id: "med-5", bookId: "meditations", number: 5, title: "Book 5 — How to Behave", keyConcepts: ["Social conduct", "Authenticity", "Purposeful action", "Self-awareness"] },
  { id: "med-6", bookId: "meditations", number: 6, title: "Book 6 — On Human Nature", keyConcepts: ["Accepting others", "Universal connection", "Compassion", "Rational understanding"] },
  { id: "med-7", bookId: "meditations", number: 7, title: "Book 7 — What Is Evil", keyConcepts: ["Nature of evil", "Perception vs reality", "Inner judgment", "Moral clarity"] },
  { id: "med-8", bookId: "meditations", number: 8, title: "Book 8 — Personal Reflection", keyConcepts: ["Self-examination", "Continuous improvement", "Wisdom", "Inner guidance"] },
  { id: "med-9", bookId: "meditations", number: 9, title: "Book 9 — Universal Reason", keyConcepts: ["Cosmic order", "Rational universe", "Divine intelligence", "Human purpose"] },
  { id: "med-10", bookId: "meditations", number: 10, title: "Book 10 — On Solitude", keyConcepts: ["Inner solitude", "Self-reliance", "Peaceful mind", "Philosophical refuge"] },
  { id: "med-11", bookId: "meditations", number: 11, title: "Book 11 — The Rational Animal", keyConcepts: ["Human nature", "Rational capacity", "Moral responsibility", "Social duty"] },
  { id: "med-12", bookId: "meditations", number: 12, title: "Book 12 — Accepting Fate", keyConcepts: ["Amor fati", "Accepting destiny", "Inner freedom", "Peaceful resignation"] },
];

// ============================================
// MOCK QUESTIONS
// ============================================
export const QUESTIONS: Question[] = [
  // Thinking, Fast and Slow - Chapter 1
  {
    id: "q-tfs1-1",
    chapterId: "tfs-1",
    bookId: "thinking-fast-slow",
    text: "Kahneman introduces two systems of thinking in this chapter — explain the difference between System 1 and System 2, and give a real-life example of each.",
    difficulty: "immediate",
    chapterNumber: 1,
  },
  {
    id: "q-tfs1-2",
    chapterId: "tfs-1",
    bookId: "thinking-fast-slow",
    text: "You described System 1 as fast — do you think social media is designed to exploit it, and how? Give a specific example.",
    difficulty: "day3",
    chapterNumber: 1,
  },
  {
    id: "q-tfs1-3",
    chapterId: "tfs-1",
    bookId: "thinking-fast-slow",
    text: "Considering what you've learned about System 1 and cognitive ease from Chapter 5, how might advertisers use both concepts together to influence purchasing decisions?",
    difficulty: "week3",
    chapterNumber: 1,
  },

  // Thinking, Fast and Slow - Chapter 2
  {
    id: "q-tfs2-1",
    chapterId: "tfs-2",
    bookId: "thinking-fast-slow",
    text: "What does Kahneman say happens to your pupils when you're engaged in cognitively demanding tasks? What broader point does this illustrate about System 2?",
    difficulty: "immediate",
    chapterNumber: 2,
  },

  // Thinking, Fast and Slow - Chapter 3
  {
    id: "q-tfs3-1",
    chapterId: "tfs-3",
    bookId: "thinking-fast-slow",
    text: 'Explain the concept of "ego depletion." Why might someone be more likely to make impulsive decisions at the end of a long workday?',
    difficulty: "immediate",
    chapterNumber: 3,
  },

  // Atomic Habits - Chapter 1
  {
    id: "q-ah1-1",
    chapterId: "ah-1",
    bookId: "atomic-habits",
    text: 'Clear talks about the "plateau of latent potential." Describe this concept and explain why it causes most people to give up on new habits too early.',
    difficulty: "immediate",
    chapterNumber: 1,
  },
  {
    id: "q-ah1-2",
    chapterId: "ah-1",
    bookId: "atomic-habits",
    text: "The 1% improvement concept sounds simple in theory. What makes it so difficult in practice, and what does Clear suggest as the solution?",
    difficulty: "day3",
    chapterNumber: 1,
  },

  // Atomic Habits - Chapter 2
  {
    id: "q-ah2-1",
    chapterId: "ah-2",
    bookId: "atomic-habits",
    text: "Clear argues that changing your identity is more effective than setting goals. Explain the three layers of behavior change and why identity sits at the core.",
    difficulty: "immediate",
    chapterNumber: 2,
  },

  // Atomic Habits - Chapter 3
  {
    id: "q-ah3-1",
    chapterId: "ah-3",
    bookId: "atomic-habits",
    text: "Describe the four-step habit loop. Create an example of a bad habit using all four steps, then redesign it using Clear's framework.",
    difficulty: "immediate",
    chapterNumber: 3,
  },

  // Sapiens - Chapter 1
  {
    id: "q-sap1-1",
    chapterId: "sap-1",
    bookId: "sapiens",
    text: "Harari claims Homo sapiens wasn't always the only human species. Name at least two other human species that existed alongside us and explain what happened to them.",
    difficulty: "immediate",
    chapterNumber: 1,
  },

  // Sapiens - Chapter 2
  {
    id: "q-sap2-1",
    chapterId: "sap-2",
    bookId: "sapiens",
    text: 'What does Harari mean by "fictional reality"? Why was the ability to create and believe in fictions the key advantage that set Homo sapiens apart from other species?',
    difficulty: "immediate",
    chapterNumber: 2,
  },

  // Deep Work - Chapter 1
  {
    id: "q-dw1-1",
    chapterId: "dw-1",
    bookId: "deep-work",
    text: "Newport argues that deep work is becoming both increasingly valuable and increasingly rare. What two core abilities does he say you must master to thrive in the new economy?",
    difficulty: "immediate",
    chapterNumber: 1,
  },
  {
    id: "q-dw1-2",
    chapterId: "dw-1",
    bookId: "deep-work",
    text: "Explain the concept of 'myelin' and how it biologically supports Newport's argument for deliberate, focused practice.",
    difficulty: "day3",
    chapterNumber: 1,
  },

  // Deep Work - Chapter 2
  {
    id: "q-dw2-1",
    chapterId: "dw-2",
    bookId: "deep-work",
    text: "What is 'busyness as a proxy for productivity', and why does Newport claim it is the default state in modern open-office environments?",
    difficulty: "immediate",
    chapterNumber: 2,
  },

  // Deep Work - Chapter 3
  {
    id: "q-dw3-1",
    chapterId: "dw-3",
    bookId: "deep-work",
    text: "How does the neurological argument presented in this chapter challenge the idea that relaxation and idle time make us happier than deeply focused work?",
    difficulty: "immediate",
    chapterNumber: 3,
  },

  // Man's Search for Meaning - Chapter 1
  {
    id: "q-msm1-1",
    chapterId: "msm-1",
    bookId: "man-search-meaning",
    text: "Frankl observes that those who survived the camps longest often weren't the physically strongest. What psychological trait did they share instead?",
    difficulty: "immediate",
    chapterNumber: 1,
  },
  {
    id: "q-msm1-2",
    chapterId: "msm-1",
    bookId: "man-search-meaning",
    text: "Describe the three psychological phases the inmates experienced, according to Frankl's observations.",
    difficulty: "day3",
    chapterNumber: 1,
  },

  // Man's Search for Meaning - Chapter 2
  {
    id: "q-msm2-1",
    chapterId: "msm-2",
    bookId: "man-search-meaning",
    text: "Explain the philosophy behind 'tragic optimism'. How does one find meaning in unavoidable suffering?",
    difficulty: "immediate",
    chapterNumber: 2,
  },

  // Psychology of Money - Chapter 1
  {
    id: "q-pm1-1",
    chapterId: "pm-1",
    bookId: "psychology-money",
    text: "Housel argues 'No One's Crazy' when it comes to money. Why do two people from different generations often make completely different, yet rational, investment choices?",
    difficulty: "immediate",
    chapterNumber: 1,
  },
  {
    id: "q-pm1-2",
    chapterId: "pm-1",
    bookId: "psychology-money",
    text: "How does your personal experience with the stock market in your early adult years disproportionately affect your lifetime financial decisions?",
    difficulty: "day3",
    chapterNumber: 1,
  },

  // Psychology of Money - Chapter 2
  {
    id: "q-pm2-1",
    chapterId: "pm-2",
    bookId: "psychology-money",
    text: "Explain the concepts of 'Luck and Risk'. Why does Housel suggest we should be careful about attributing all of Bill Gates' success purely to hard work?",
    difficulty: "immediate",
    chapterNumber: 2,
  },

  // Psychology of Money - Chapter 3
  {
    id: "q-pm3-1",
    chapterId: "pm-3",
    bookId: "psychology-money",
    text: "What does Housel mean by the danger of 'moving goalposts', and what is the hardest financial skill to master according to the chapter?",
    difficulty: "immediate",
    chapterNumber: 3,
  },

  // Crime and Punishment — Part I, Ch. 5
  { id: "q-cp5-1", chapterId: "cp-5", bookId: "crime-punishment", text: "What does the dream of the beaten mare reveal about Raskolnikov's subconscious? How does the child in the dream relate to his waking self?", difficulty: "immediate", chapterNumber: 5 },

  // Crime and Punishment — Part I, Ch. 7
  { id: "q-cp7-1", chapterId: "cp-7", bookId: "crime-punishment", text: "How does the murder of Lizaveta fundamentally undermine Raskolnikov's theoretical justification for the crime?", difficulty: "immediate", chapterNumber: 7 },

  // Crime and Punishment — Part II, Ch. 5
  { id: "q-cp12-1", chapterId: "cp-12", bookId: "crime-punishment", text: "Why does Raskolnikov compulsively return to the crime scene and nearly confess to Zametov? What does this reveal about his unconscious desire?", difficulty: "immediate", chapterNumber: 12 },

  // Crime and Punishment — Part III, Ch. 3
  { id: "q-cp17-1", chapterId: "cp-17", bookId: "crime-punishment", text: "Analyze Porfiry Petrovich's interrogation technique. How does he use Raskolnikov's own published article as a psychological weapon against him?", difficulty: "immediate", chapterNumber: 17 },
  { id: "q-cp17-2", chapterId: "cp-17", bookId: "crime-punishment", text: "Compare Raskolnikov's 'extraordinary man' theory with Nietzsche's Übermensch concept. Where does Dostoevsky seem to critique this philosophy?", difficulty: "day3", chapterNumber: 17 },

  // Crime and Punishment — Part IV, Ch. 4
  { id: "q-cp24-1", chapterId: "cp-24", bookId: "crime-punishment", text: "What role does the story of the raising of Lazarus play in Raskolnikov and Sonya's scene? Why is this biblical passage central to the novel's themes of resurrection?", difficulty: "immediate", chapterNumber: 24 },

  // Crime and Punishment — Part V, Ch. 4
  { id: "q-cp30-1", chapterId: "cp-30", bookId: "crime-punishment", text: "When Raskolnikov tells Sonya his real motive—'I wanted to find out whether I was a louse or a man'—what does this confession reveal about the failure of his theory?", difficulty: "immediate", chapterNumber: 30 },

  // Crime and Punishment — Part VI, Ch. 6
  { id: "q-cp37-1", chapterId: "cp-37", bookId: "crime-punishment", text: "How does Svidrigailov's suicide function as Dostoevsky's answer to the question of what happens when someone achieves complete moral freedom without faith or love?", difficulty: "immediate", chapterNumber: 37 },
  { id: "q-cp37-2", chapterId: "cp-37", bookId: "crime-punishment", text: "Compare and contrast Svidrigailov and Raskolnikov as parallel transgressors. Why does one choose suicide while the other chooses confession?", difficulty: "day3", chapterNumber: 37 },

  // Crime and Punishment — Epilogue, Ch. 2
  { id: "q-cp41-1", chapterId: "cp-41", bookId: "crime-punishment", text: "What is the significance of Raskolnikov's final 'plague dream'? How does it serve as Dostoevsky's ultimate critique of ideological certainty?", difficulty: "immediate", chapterNumber: 41 },
  { id: "q-cp41-2", chapterId: "cp-41", bookId: "crime-punishment", text: "Trace the full arc of Raskolnikov's transformation from his 'extraordinary man' theory to the final scene with the New Testament. How does Dostoevsky use suffering, love, and faith as the antidotes to intellectual nihilism?", difficulty: "week3", chapterNumber: 41 },
];

// ============================================
// MOCK GRADE RESULTS
// ============================================
export const MOCK_GRADE_RESULTS: Record<string, GradeResult> = {
  "q-tfs1-1": {
    score: 8,
    summary:
      "Strong understanding of the two systems. Your examples were practical and accurate.",
    gotRight: [
      "Correctly identified System 1 as fast, automatic, and intuitive",
      "Accurately described System 2 as slow, deliberate, and logical",
      "Good real-life example of System 1 (driving on an empty road)",
    ],
    missed: [
      "Didn't mention that System 1 operates effortlessly while System 2 requires attention",
    ],
    misunderstood: [],
    conceptExplanation:
      "System 1 operates automatically with little effort and no sense of voluntary control. System 2 allocates attention to effortful mental activities. Most of what we think and do originates in System 1, but System 2 takes over when things get difficult.",
  },
  "q-ah1-1": {
    score: 7,
    summary:
      "Good grasp of the plateau concept. Could have gone deeper on the psychological impact.",
    gotRight: [
      "Correctly described the plateau as a period where effort doesn't seem to produce results",
      "Mentioned that improvement happens exponentially, not linearly",
    ],
    missed: [
      "Didn't reference Clear's ice cube metaphor that illustrates the breaking point",
      'Could have discussed how this relates to the "valley of disappointment"',
    ],
    misunderstood: [],
    conceptExplanation:
      "The plateau of latent potential is the period when your habits seem to make no difference. Like an ice cube slowly warming from 25° to 31° — nothing visible happens. But at 32°, it starts melting. The work wasn't wasted; it was being stored.",
  },
};

// ============================================
// MOCK SCHEDULED REVIEWS
// ============================================
export const MOCK_REVIEWS: ScheduledReview[] = [
  {
    id: "rev-1",
    questionId: "q-tfs1-2",
    bookId: "thinking-fast-slow",
    bookTitle: "Thinking, Fast and Slow",
    chapterNumber: 1,
    chapterTitle: "The Characters of the Story",
    questionPreview:
      "Do you think social media is designed to exploit System 1?",
    scheduledFor: "2026-03-20",
    status: "pending",
    difficulty: "day3",
  },
  {
    id: "rev-2",
    questionId: "q-ah1-2",
    bookId: "atomic-habits",
    bookTitle: "Atomic Habits",
    chapterNumber: 1,
    chapterTitle: "The Surprising Power of Atomic Habits",
    questionPreview:
      "What makes the 1% improvement concept so difficult in practice?",
    scheduledFor: "2026-03-21",
    status: "pending",
    difficulty: "day3",
  },
  {
    id: "rev-3",
    questionId: "q-tfs1-3",
    bookId: "thinking-fast-slow",
    bookTitle: "Thinking, Fast and Slow",
    chapterNumber: 1,
    chapterTitle: "The Characters of the Story",
    questionPreview:
      "How might advertisers use System 1 and cognitive ease together?",
    scheduledFor: "2026-03-28",
    status: "pending",
    difficulty: "week3",
  },
];

// ============================================
// BOOK COVER COLORS (since we don't have real covers)
// ============================================
export const BOOK_COLORS: Record<string, { bg: string; accent: string }> = {
  "thinking-fast-slow": { bg: "#1a1a2e", accent: "#e94560" },
  "atomic-habits": { bg: "#0f3460", accent: "#16c79a" },
  sapiens: { bg: "#2d132c", accent: "#ee6f57" },
  "deep-work": { bg: "#1b2a4a", accent: "#4a90d9" },
  "man-search-meaning": { bg: "#2c2c34", accent: "#c9b1ff" },
  "psychology-money": { bg: "#1a3a2a", accent: "#f0c040" },
  "crime-punishment": { bg: "#2a0a0a", accent: "#c62828" },
  meditations: { bg: "#1a2a1a", accent: "#d4af37" },
};
