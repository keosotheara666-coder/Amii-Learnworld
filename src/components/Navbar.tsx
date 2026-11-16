import React from 'react';
import { ChevronDown, Menu, Smartphone, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export type AppRoute =
  | 'home'
  | 'explore'
  | 'course'
  | 'career'
  | 'business'
  | 'premium'
  | 'dashboard'
  | 'stories'
  | 'about';

interface NavbarProps {
  currentRoute: AppRoute;
  exploreOpen: boolean;
  onToggleExplore: () => void;
  onNavigate: (route: AppRoute) => void;
  onOpenAppModal: () => void;
  showPromo: boolean;
  onDismissPromo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  exploreOpen,
  onToggleExplore,
  onNavigate,
  onOpenAppModal,
  showPromo,
  onDismissPromo,
}) => {
  const { user, profile, openAuthModal } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      {showPromo && (
        <aside className="bg-[#eef7f2] border-b border-[#d9ede2] px-4 py-2 text-xs sm:text-sm text-[#274737]">
          <div className="max-w-[1240px] mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 mx-auto">
              <span className="truncate">
                Join millions using the AMii App for offline study across global institutes.
              </span>
              <button
                type="button"
                onClick={onOpenAppModal}
                className="bg-white border border-[#cce5d6] hover:bg-[#f6fbf8] px-3 py-1 rounded-md text-xs font-semibold text-[#1f5734] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Get App</span>
              </button>
            </div>
            <button
              type="button"
              onClick={onDismissPromo}
              className="p-1 text-slate-500 hover:text-slate-800 shrink-0"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-[1240px] mx-auto px-5 h-[72px] flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span
              className="w-7 h-7 inline-block shrink-0 rounded-sm"
              style={{
                background:
                  'conic-gradient(#e11d48, #f59e0b, #10b981, #3b82f6, #8b5cf6, #e11d48)',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
              }}
              aria-hidden="true"
            />
            <span>AMii</span>
          </button>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={onToggleExplore}
              className={`inline-flex items-center gap-1 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                exploreOpen || currentRoute === 'explore'
                  ? 'text-[#378652] font-semibold'
                  : ''
              }`}
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${exploreOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('career')}
              className={`hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                currentRoute === 'career' ? 'text-[#378652] font-semibold' : ''
              }`}
            >
              Career Hub
            </button>

            <button
              type="button"
              onClick={() => onNavigate('business')}
              className={`hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                currentRoute === 'business' ? 'text-[#378652] font-semibold' : ''
              }`}
            >
              For Business
            </button>

            <button
              type="button"
              onClick={() => onNavigate('premium')}
              className={`hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                currentRoute === 'premium' ? 'text-[#378652] font-semibold' : ''
              }`}
            >
              Go Premium
            </button>

            {user ? (
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className={`hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                  currentRoute === 'dashboard' ? 'text-[#378652] font-semibold' : ''
                }`}
              >
                My Learning
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Log In
              </button>
            )}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-4 py-2 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 max-w-[180px] truncate"
              >
                {profile?.displayName || user.displayName || 'Dashboard'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuthModal('signup')}
                className="px-5 py-2 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                Sign Up
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-5 py-4 space-y-2">
            <button
              type="button"
              onClick={() => {
                onNavigate('explore');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-slate-800"
            >
              Explore Major Branches
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('career');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-slate-800"
            >
              Career Hub
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('business');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-slate-800"
            >
              For Business
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('premium');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm font-medium text-slate-800"
            >
              Go Premium
            </button>
            {user ? (
              <button
                type="button"
                onClick={() => {
                  onNavigate('dashboard');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-sm font-semibold text-[#378652]"
              >
                My Learning Dashboard
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-sm font-semibold text-[#378652]"
              >
                Log In
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
};
