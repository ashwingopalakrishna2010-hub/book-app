import { initializeApp } from 'firebase/app';
import { initializeAuth, browserLocalPersistence, getAuth, setPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBZrtaP4nR-5q4HCM-wEq_NX-7e03vagdc",
  authDomain: "deepread-app.firebaseapp.com",
  projectId: "deepread-app",
  storageBucket: "deepread-app.firebasestorage.app",
  messagingSenderId: "501405291149",
  appId: "1:501405291149:web:5a715b6d65b964252fc8c4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Explicitly set persistence to LOCAL to ensure auth state survives page reloads
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Failed to set auth persistence:', error);
});
export const db = getFirestore(app);
export { auth };
export default app;
