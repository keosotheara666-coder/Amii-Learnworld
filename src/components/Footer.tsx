import React from 'react';
import { AppRoute } from './Navbar';

interface FooterProps {
  onNavigate: (route: AppRoute) => void;
  onNavigateBranch: (majorId: string) => void;
  onOpenAppModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onNavigateBranch,
  onOpenAppModal,
}) => {
  return (
    <footer className="bg-[#0c1a2c] text-white pt-14 pb-8 text-sm">
      <div className="max-w-[1240px] mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
              Major Branches
            </h3>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateBranch('business-management')}
                  className="hover:text-white hover:underline text-left"
                >
                  Business &amp; Finance
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateBranch('engineering-construction')}
                  className="hover:text-white hover:underline text-left"
                >
                  Engineering &amp; Construction
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateBranch('english-communication')}
                  className="hover:text-white hover:underline text-left"
                >
                  English Language
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateBranch('health-nursing')}
                  className="hover:text-white hover:underline text-left"
                >
                  Health &amp; Nursing
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateBranch('computer-science-it')}
                  className="hover:text-white hover:underline text-left"
                >
                  Information Technology
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateBranch('languages-applied')}
                  className="hover:text-white hover:underline text-left"
                >
                  Global Languages
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateBranch('leadership-operations')}
                  className="hover:text-white hover:underline text-left"
                >
                  Quality &amp; Management
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
              About AMii
            </h3>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline text-left"
                >
                  Our Story &amp; Mission
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline text-left"
                >
                  Global Institute Network
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white hover:underline text-left"
                >
                  Major Branch Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('business')}
                  className="hover:text-white hover:underline text-left"
                >
                  Become a Course Creator
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
              Quality Learning
            </h3>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline text-left"
                >
                  Accreditation Standards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white hover:underline text-left"
                >
                  All Diplomas &amp; Certificates
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('stories')}
                  className="hover:text-white hover:underline text-left"
                >
                  Graduate Testimonials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('premium')}
                  className="hover:text-white hover:underline text-left"
                >
                  Premium Learning
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
              Career Resources
            </h3>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('career')}
                  className="hover:text-white hover:underline text-left"
                >
                  Build Your Resumé
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('career')}
                  className="hover:text-white hover:underline text-left"
                >
                  AMii Career Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('career')}
                  className="hover:text-white hover:underline text-left"
                >
                  Career Aptitude Test
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-white hover:underline text-left"
                >
                  My Learning Transcript
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-4">
              Discover More
            </h3>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('business')}
                  className="hover:text-white hover:underline text-left"
                >
                  Access Free Team LMS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenAppModal}
                  className="hover:text-white hover:underline text-left"
                >
                  Download App &amp; Study Offline
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white hover:underline text-left"
                >
                  Browse by Country
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>© 2026 AMii Learning. All Rights Reserved.</div>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => onNavigate('about')} className="hover:text-white">
              Privacy &amp; Data Protection
            </button>
            <button type="button" onClick={() => onNavigate('about')} className="hover:text-white">
              Terms of Use
            </button>
            <button type="button" onClick={() => onNavigate('about')} className="hover:text-white">
              Academic Integrity
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
