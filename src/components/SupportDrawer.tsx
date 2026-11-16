import React, { useState } from 'react';
import { ArrowRight, HelpCircle, MessageSquare, Search, X } from 'lucide-react';
import { COURSES, INSTITUTES, MAJORS } from '../data/catalog';

interface SupportDrawerProps {
  onNavigateBranch: (majorId: string) => void;
  onNavigateCourse: (courseId: string) => void;
}

const FAQ_ITEMS = [
  {
    q: 'Why are different universities from different countries grouped together?',
    a: 'AMii organizes education by Academic Major Branch first. That means Stanford (US), Cambridge (UK), TUM (Germany), NUS (Singapore), and Tokyo (Japan) all sit inside the same Computer Science & IT branch so you can compare syllabi seamlessly.',
  },
  {
    q: 'Are the courses and assessments free?',
    a: 'Yes. Every module and final assessment quiz is free to complete. Digital completion records appear in your Learner Dashboard immediately after passing.',
  },
  {
    q: 'How do I save my learning progress and resume?',
    a: 'Click Log In or Sign Up in the top navigation bar to connect your account. All enrollments, module checkmarks, quiz scores, and Career Hub resumes sync automatically.',
  },
];

export const SupportDrawer: React.FC<SupportDrawerProps> = ({
  onNavigateBranch,
  onNavigateCourse,
}) => {
  const [open, setOpen] = useState(false);
  const [lookup, setLookup] = useState('');

  const trimmed = lookup.trim().toLowerCase();
  const matchedMajors = trimmed
    ? MAJORS.filter((m) => m.name.toLowerCase().includes(trimmed))
    : [];
  const matchedCourses = trimmed
    ? COURSES.filter((c) => {
        const inst = INSTITUTES.find((i) => i.id === c.instituteId);
        return (
          c.title.toLowerCase().includes(trimmed) ||
          inst?.name.toLowerCase().includes(trimmed) ||
          inst?.country.toLowerCase().includes(trimmed)
        );
      })
    : [];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-[#378652] hover:bg-[#2d6e42] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
        aria-label="Open Learner Support and Branch Finder"
      >
        {open ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
      </button>

      {open && (
        <aside
          className="fixed bottom-20 right-5 z-40 w-[340px] sm:w-[380px] max-h-[75vh] bg-white rounded-xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
          role="dialog"
          aria-label="AMii Help & Branch Finder"
        >
          <div className="bg-[#0f2239] text-white px-4 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold">AMii Help &amp; Course Finder</span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 text-slate-300 hover:text-white"
              aria-label="Close help drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 overflow-y-auto space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Quick Search by Major, Country, or Institute
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={lookup}
                  onChange={(e) => setLookup(e.target.value)}
                  placeholder="e.g. Germany, Nursing, Stanford..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-none focus:border-[#378652]"
                />
              </div>
            </div>

            {trimmed && (
              <div className="space-y-2">
                {matchedMajors.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      onNavigateBranch(m.id);
                      setOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-xs font-semibold text-emerald-900 flex items-center justify-between"
                  >
                    <span>Branch: {m.shortName}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ))}
                {matchedCourses.slice(0, 4).map((c) => {
                  const inst = INSTITUTES.find((i) => i.id === c.instituteId);
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => {
                        onNavigateCourse(c.id);
                        setOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-md bg-slate-50 hover:bg-slate-100 text-xs"
                    >
                      <div className="font-semibold text-slate-900">{c.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {inst?.name} ({inst?.country})
                      </div>
                    </button>
                  );
                })}
                {matchedMajors.length === 0 && matchedCourses.length === 0 && (
                  <p className="text-xs text-slate-500">No matching branches or courses found.</p>
                )}
              </div>
            )}

            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wide text-slate-500">
                Frequently Asked Questions
              </h4>
              {FAQ_ITEMS.map((item) => (
                <div key={item.q} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="text-xs font-bold text-slate-900 mb-1">{item.q}</div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};
