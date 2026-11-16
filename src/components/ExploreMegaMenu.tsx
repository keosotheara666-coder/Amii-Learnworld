import React, { useState } from 'react';
import { ArrowRight, Building2, Globe2, GitBranch, X } from 'lucide-react';
import { COURSES, INSTITUTES, MAJORS } from '../data/catalog';
import { MajorIcon } from './MajorIcon';

interface ExploreMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateBranch: (majorId: string, countryFilter?: string, instituteId?: string) => void;
  onNavigateCourse: (courseId: string) => void;
}

export const ExploreMegaMenu: React.FC<ExploreMegaMenuProps> = ({
  isOpen,
  onClose,
  onNavigateBranch,
  onNavigateCourse,
}) => {
  const [activeMajorId, setActiveMajorId] = useState<string>(MAJORS[0].id);

  if (!isOpen) return null;

  const activeMajor = MAJORS.find((m) => m.id === activeMajorId) || MAJORS[0];
  const branchInstitutes = INSTITUTES.filter((inst) => inst.majorIds.includes(activeMajor.id));
  const branchCountries = Array.from(new Set(branchInstitutes.map((i) => i.country)));
  const branchCourses = COURSES.filter((c) => c.majorId === activeMajor.id);

  return (
    <div
      className="fixed inset-x-0 top-[72px] z-40 bg-white border-b border-slate-200 shadow-xl"
      role="dialog"
      aria-label="Explore Academic Major Branches"
    >
      <div className="max-w-[1240px] mx-auto px-5 py-6">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-5 h-5 text-[#378652]" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Explore by Unified Academic Major Branch
              </h2>
              <p className="text-xs text-slate-500">
                Different institutes across different countries sharing the same academic major stay grouped in one branch.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            aria-label="Close explore menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column: Major Branches */}
          <div className="lg:col-span-4 border-r border-slate-100 pr-0 lg:pr-4 max-h-[420px] overflow-y-auto space-y-1">
            {MAJORS.map((major) => {
              const isSelected = major.id === activeMajor.id;
              const instCount = INSTITUTES.filter((i) => i.majorIds.includes(major.id)).length;
              return (
                <button
                  key={major.id}
                  type="button"
                  onMouseEnter={() => setActiveMajorId(major.id)}
                  onClick={() => {
                    onNavigateBranch(major.id);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-[#f1f7f3] text-[#1f5734] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <MajorIcon
                      name={major.iconName}
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-[#378652]' : 'text-slate-400'
                      }`}
                    />
                    <span className="text-sm truncate">{major.shortName}</span>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 tabular-nums">
                    {instCount} inst.
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right column: Unified Branch Tree (Countries + Institutes + Courses in SAME major) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-xs font-semibold text-[#378652] mb-0.5">
                    Same Major Branch · {branchCountries.length} Countries · {branchInstitutes.length} Institutes
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{activeMajor.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onNavigateBranch(activeMajor.id);
                    onClose();
                  }}
                  className="px-4 py-2 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <span>Open Full Branch Tree</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Institutes grouped by Country inside this same Major Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {branchInstitutes.map((inst) => (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => {
                      onNavigateBranch(activeMajor.id, inst.country, inst.id);
                      onClose();
                    }}
                    className="text-left p-3 rounded-lg border border-slate-200 hover:border-[#378652] hover:bg-[#f8fcf9] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700">
                        <Globe2 className="w-3.5 h-3.5" />
                        {inst.country} · {inst.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 mb-0.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{inst.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1">{inst.summary}</p>
                  </button>
                ))}
              </div>

              {/* Featured Courses in this Branch */}
              {branchCourses.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 mb-2">
                    Featured Courses in {activeMajor.shortName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {branchCourses.slice(0, 4).map((course) => {
                      const inst = INSTITUTES.find((i) => i.id === course.instituteId);
                      return (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => {
                            onNavigateCourse(course.id);
                            onClose();
                          }}
                          className="text-left p-2.5 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors"
                        >
                          <div className="text-xs font-semibold text-slate-900 truncate">
                            {course.title}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate">
                            {inst?.name} · {inst?.country} · {course.credentialType}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
