import React, { useState } from 'react';
import { Award, GitBranch, Globe2, ShieldCheck } from 'lucide-react';
import { INSTITUTES, MAJORS, TESTIMONIALS } from '../data/catalog';

interface StoriesAboutPageProps {
  mode: 'stories' | 'about';
  onNavigateBranch: (majorId: string) => void;
}

export const StoriesAboutPage: React.FC<StoriesAboutPageProps> = ({ mode, onNavigateBranch }) => {
  const [majorFilter, setMajorFilter] = useState<string>('ALL');

  if (mode === 'stories') {
    const filtered =
      majorFilter === 'ALL'
        ? TESTIMONIALS
        : TESTIMONIALS.filter((t) => t.majorId === majorFilter);

    return (
      <div className="py-10 px-5">
        <div className="max-w-[1240px] mx-auto">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#378652] mb-1">
              Graduate Outcomes
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
              Learner Stories Across 193 Countries
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl mb-5">
              Filter graduate testimonials by Major Branch to see how learners combine courses from international universities.
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setMajorFilter('ALL')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border ${
                  majorFilter === 'ALL'
                    ? 'bg-[#0f2239] text-white border-[#0f2239]'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                All Majors
              </button>
              {MAJORS.slice(0, 6).map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMajorFilter(m.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border ${
                    majorFilter === m.id
                      ? 'bg-[#378652] text-white border-[#378652]'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {m.shortName}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => {
              const major = MAJORS.find((m) => m.id === t.majorId);
              return (
                <article
                  key={t.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-semibold text-sky-700 mb-2">
                      {major?.shortName} · {t.country}
                    </div>
                    <h2 className="text-lg font-bold text-slate-900 mb-2">&ldquo;{t.quote}&rdquo;</h2>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{t.outcome}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigateBranch(t.majorId)}
                      className="text-xs font-semibold text-[#378652] hover:underline"
                    >
                      Explore Branch →
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-5">
      <div className="max-w-[1240px] mx-auto space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#378652] mb-2">
            About AMii &amp; Academic Architecture
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
            One Academic Branch Per Major — Regardless of Country or Institute
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            Traditional catalogs scatter courses by institution name, forcing learners to hunt across dozens of country portals for the same discipline. AMii unifies accredited curricula from {INSTITUTES.length} global institutes into {MAJORS.length} structured Major Branches so you can compare standards and build recognized skills efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <GitBranch className="w-6 h-6 text-[#378652] mb-3" />
            <h2 className="text-base font-bold text-slate-900 mb-1.5">Major-First Taxonomy</h2>
            <p className="text-sm text-slate-600">
              Every institute—whether in Munich, Stanford, London, Tokyo, or Singapore—maps directly into its shared Academic Major Branch.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <Award className="w-6 h-6 text-[#378652] mb-3" />
            <h2 className="text-base font-bold text-slate-900 mb-1.5">CPD &amp; Academic Standards</h2>
            <p className="text-sm text-slate-600">
              Courses follow structured module outcomes and verifiable end-of-course assessment thresholds.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <ShieldCheck className="w-6 h-6 text-[#378652] mb-3" />
            <h2 className="text-base font-bold text-slate-900 mb-1.5">Open Access Worldwide</h2>
            <p className="text-sm text-slate-600">
              Learners in 193 countries can enroll free, complete quizzes, and store verified credentials in their personal dashboard.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-sky-700" />
            <span>Global Partner Directory ({INSTITUTES.length} Institutes)</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {INSTITUTES.map((inst) => (
              <button
                key={inst.id}
                type="button"
                onClick={() => onNavigateBranch(inst.majorIds[0])}
                className="text-left p-3.5 rounded-lg border border-slate-200 hover:border-[#378652] transition-colors"
              >
                <div className="text-sm font-bold text-slate-900">{inst.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {inst.city}, {inst.country} · {inst.accreditation}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
