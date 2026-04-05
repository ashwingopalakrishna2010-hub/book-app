import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FirebaseError } from "firebase/app";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { logIn, signUp, signInWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await logIn(email, password);
      } else {
        await signUp(email, password, name);
      }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            setError("This email is already in use.");
            break;
          case "auth/user-not-found":
          case "auth/wrong-password":
            setError("Invalid email or password.");
            break;
          case "auth/weak-password":
            setError("Password should be at least 6 characters.");
            break;
          default:
            setError("An error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      console.error("Google sign in failed:", err);
       if (err instanceof FirebaseError && err.code === "auth/popup-closed-by-user") {
           // Ignore popup closed errors
       } else {
           setError("Failed to sign in with Google.");
       }
       setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-5 relative overflow-hidden bg-bg-navy">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-purple/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-accent-blue/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-sm relative z-10 animate-fade-in-up">
        {/* Logo/Brand */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mx-auto mb-5 flex items-center justify-center border border-white/10">
            <span className="material-symbols-outlined text-accent-purple text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              menu_book
            </span>
          </div>
          <h1 className="font-headline text-4xl text-white mb-2">DeepRead</h1>
          <p className="text-white/50 text-base font-headline italic">
            Remember everything you read.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2),0_1px_2px_rgba(0,0,0,0.1)]">
          <h2 className="text-xl font-bold text-text-primary mb-6 text-center font-headline">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-error/10 text-error text-sm text-center flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3.5 bg-bg-base border border-border-strong rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-bg-navy/30 focus:ring-1 focus:ring-bg-navy/10 transition-all text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3.5 bg-bg-base border border-border-strong rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-bg-navy/30 focus:ring-1 focus:ring-bg-navy/10 transition-all text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3.5 bg-bg-base border border-border-strong rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-bg-navy/30 focus:ring-1 focus:ring-bg-navy/10 transition-all text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 btn-silk rounded-xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-white">refresh</span>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-border-strong"></div>
            <span className="text-[11px] text-text-muted font-bold uppercase tracking-widest">Or</span>
            <div className="flex-1 h-px bg-border-strong"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full mt-6 py-3.5 bg-bg-base rounded-xl font-bold text-sm text-text-primary hover:bg-bg-card-hover transition-all flex items-center justify-center gap-3 disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-8 text-center text-sm text-text-secondary">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              className="text-bg-navy font-bold hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
