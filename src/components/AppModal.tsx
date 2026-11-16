import React, { useState } from 'react';
import { Check, Smartphone, WifiOff, X } from 'lucide-react';

interface AppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppModal: React.FC<AppModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<'android' | 'ios'>('android');
  const [linkCopied, setLinkCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyInstallLink = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Download AMii Mobile App"
    >
      <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          aria-label="Close app modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-2">
          <WifiOff className="w-4 h-4" />
          <span>Offline Study Mode</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Take AMii Courses Offline Anywhere
        </h2>
        <p className="text-sm text-slate-600 mb-5">
          Download full major-branch lessons, lecture transcripts, and practice quizzes for commutes and low-connectivity study.
        </p>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg mb-5">
          <button
            type="button"
            onClick={() => setSelectedPlatform('android')}
            className={`py-2 text-xs font-semibold rounded-md transition-colors ${
              selectedPlatform === 'android'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Android (Google Play)
          </button>
          <button
            type="button"
            onClick={() => setSelectedPlatform('ios')}
            className={`py-2 text-xs font-semibold rounded-md transition-colors ${
              selectedPlatform === 'ios'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            iOS (App Store)
          </button>
        </div>

        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center gap-5 mb-5">
          <div className="w-28 h-28 bg-white border border-slate-200 rounded-lg p-2 grid grid-cols-5 gap-1 shrink-0">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-[1px] ${
                  (i + (selectedPlatform === 'ios' ? 2 : 0)) % 2 === 0 || i < 5 || i % 5 === 0
                    ? 'bg-slate-900'
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#378652]" />
              <span>
                {selectedPlatform === 'android'
                  ? 'AMii for Android 10+'
                  : 'AMii for iPhone & iPad'}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Scan this code with your device camera or copy the direct mobile web-app link to sync your enrolled Major Branches automatically.
            </p>
            <button
              type="button"
              onClick={handleCopyInstallLink}
              className="px-3.5 py-2 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-xs font-semibold inline-flex items-center gap-1.5"
            >
              {linkCopied ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{linkCopied ? 'Link Copied to Clipboard' : 'Copy Direct App Link'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
