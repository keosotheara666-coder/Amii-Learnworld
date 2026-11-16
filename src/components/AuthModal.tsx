import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { COUNTRIES_LIST, MAJORS } from '../data/catalog';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    authModalMode,
    openAuthModal,
    closeAuthModal,
    signInWithGoogle,
    authError,
    authLoading,
  } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [country, setCountry] = useState('United States');
  const [targetMajor, setTargetMajor] = useState(MAJORS[0].id);

  if (!authModalOpen) return null;

  const isSignup = authModalMode === 'signup';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      await signInWithGoogle({
        displayName: displayName.trim() || undefined,
        country,
        targetMajor,
      });
    } else {
      await signInWithGoogle();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={isSignup ? 'Sign Up for AMii' : 'Log In to AMii'}
    >
      <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-xl relative">
        <button
          type="button"
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#378652] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>AMii Learner Account</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isSignup ? 'Create your free account' : 'Welcome back'}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {isSignup
              ? 'Choose your primary major branch and sync progress across global institutes.'
              : 'Sign in with your verified Google account to access your courses and certificates.'}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-lg mb-5">
          <button
            type="button"
            onClick={() => openAuthModal('login')}
            className={`py-2 text-sm font-semibold rounded-md transition-colors ${
              !isSignup ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => openAuthModal('signup')}
            className={`py-2 text-sm font-semibold rounded-md transition-colors ${
              isSignup ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {authError && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
            {authError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (Optional — defaults to Google profile)
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  maxLength={100}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:border-[#378652]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Country / Region
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#378652]"
                >
                  {COUNTRIES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Academic Major Branch
                </label>
                <select
                  value={targetMajor}
                  onChange={(e) => setTargetMajor(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#378652]"
                >
                  {MAJORS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.shortName}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full py-3 px-4 rounded-md bg-[#378652] hover:bg-[#2d6e42] disabled:opacity-60 text-white text-sm font-semibold flex items-center justify-center gap-2.5 transition-colors"
          >
            <svg className="w-4 h-4 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
              />
            </svg>
            <span>
              {authLoading
                ? 'Connecting...'
                : isSignup
                ? 'Sign Up with Google'
                : 'Log In with Google'}
            </span>
          </button>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#378652] shrink-0" />
            <span>Free course access &amp; saved progress across devices</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#378652] shrink-0" />
            <span>Verified certificates stored securely in your profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};
