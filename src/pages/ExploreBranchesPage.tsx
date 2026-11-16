import React, { useMemo, useState } from 'react';
import { Building2, Filter, GitBranch, Globe2, Search, X } from 'lucide-react';
import { COURSES, INSTITUTES, MAJORS } from '../data/catalog';
import { useAuth } from '../contexts/AuthContext';
import { CourseCard } from '../components/CourseCard';
import { MajorIcon } from '../components/MajorIcon';

interface ExploreBranchesPageProps {
  selectedMajorId: string;
  selectedCountry?: string;
  selectedInstituteId?: string;
  onSelectBranch: (majorId: string, countryFilter?: string, instituteId?: string) => void;
  onNavigateCourse: (courseId: string) => void;
}

export const ExploreBranchesPage: React.FC<ExploreBranchesPageProps> = ({
  selectedMajorId,
  selectedCountry,
  selectedInstituteId,
  onSelectBranch,
  onNavigateCourse,
}) => {
  const { enrollments } = useAuth();
  const [credentialFilter, setCredentialFilter] = useState<'ALL' | 'Diploma' | 'Certificate'>('ALL');
  const [searchFilter, setSearchFilter] = useState('');

  const activeMajor = MAJORS.find((m) => m.id === selectedMajorId) || MAJORS[0];

  // All institutes across ALL countries that offer this SAME major belong in this SAME branch
  const branchInstitutes = useMemo(
    () => INSTITUTES.filter((inst) => inst.majorIds.includes(activeMajor.id)),
    [activeMajor.id]
  );

  // Group institutes by Country inside the same Major Branch
  const institutesByCountry = useMemo(() => {
    const grouped: Record<string, typeof branchInstitutes> = {};
    branchInstitutes.forEach((inst) => {
      if (!grouped[inst.country]) grouped[inst.country] = [];
      grouped[inst.country].push(inst);
    });
    return grouped;
  }, [branchInstitutes]);

  const countriesInBranch = Object.keys(institutesByCountry);

  const branchCourses = useMemo(() => {
    return COURSES.filter((course) => {
      if (course.majorId !== activeMajor.id) return false;
      const inst = INSTITUTES.find((i) => i.id === course.instituteId);
      if (selectedCountry && inst?.country !== selectedCountry) return false;
      if (selectedInstituteId && course.instituteId !== selectedInstituteId) return false;
      if (credentialFilter !== 'ALL' && course.credentialType !== credentialFilter) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          course.title.toLowerCase().includes(q) ||
          (inst?.name.toLowerCase().includes(q) ?? false) ||
          (inst?.country.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [activeMajor.id, selectedCountry, selectedInstituteId, credentialFilter, searchFilter]);

  return (
    <div className="py-10 px-5">
      <div className="max-w-[1240px] mx-auto">
        {/* Major Branch Selector Strip */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#378652] mb-2">
            <GitBranch className="w-4 h-4" />
            <span>Unified Academic Major Branch Explorer</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            {activeMajor.name}
          </h1>
          <p className="text-sm text-slate-600 max-w-3xl mb-5">
            {activeMajor.description} All partner institutes across {countriesInBranch.length} countries teaching this major are united inside this single branch.
          </p>

          <div className="flex flex-wrap gap-2">
            {MAJORS.map((major) => {
              const active = major.id === activeMajor.id;
              return (
                <button
                  key={major.id}
                  type="button"
                  onClick={() => onSelectBranch(major.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#378652] border-[#378652] text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-[#378652]'
                  }`}
                >
                  <MajorIcon name={major.iconName} className="w-3.5 h-3.5" />
                  <span>{major.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Unified Major Branch Tree: Major -> Countries -> Different Institutes in SAME Branch */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Branch Topology: {activeMajor.shortName} ({countriesInBranch.length} Countries · {branchInstitutes.length} Institutes)
              </h2>
              <p className="text-xs text-slate-500">
                Click any country or institute node below to filter courses inside the {activeMajor.shortName} branch.
              </p>
            </div>
            {(selectedCountry || selectedInstituteId) && (
              <button
                type="button"
                onClick={() => onSelectBranch(activeMajor.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
              >
                <X className="w-3.5 h-3.5" />
                <span>Show All Countries in Branch</span>
              </button>
            )}
          </div>

          {/* Root Branch Node */}
          <div className="flex items-center gap-3 mb-5">
            <div className="px-4 py-2.5 rounded-lg bg-[#0f2239] text-white text-sm font-bold inline-flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-emerald-400" />
              <span>Root Major Branch: {activeMajor.shortName}</span>
            </div>
            <span className="text-xs text-slate-500">
              Unifies {branchInstitutes.length} international institutes under one curriculum branch
            </span>
          </div>

          {/* Country Sub-branches */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-0 sm:pl-4 border-slate-200">
            {countriesInBranch.map((country) => {
              const insts = institutesByCountry[country];
              const isCountryActive = selectedCountry === country;
              return (
                <div
                  key={country}
                  className={`rounded-xl border p-4 transition-colors ${
                    isCountryActive
                      ? 'border-[#378652] bg-[#f4faf6]'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      onSelectBranch(
                        activeMajor.id,
                        isCountryActive ? undefined : country,
                        undefined
                      )
                    }
                    className="w-full flex items-center justify-between text-left mb-3"
                  >
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900">
                      <Globe2 className="w-4 h-4 text-sky-700" />
                      <span>{country}</span>
                    </span>
                    <span className="text-xs font-semibold text-[#378652]">
                      {insts.length} {insts.length === 1 ? 'Institute' : 'Institutes'}
                    </span>
                  </button>

                  <div className="space-y-2">
                    {insts.map((inst) => {
                      const isInstActive = selectedInstituteId === inst.id;
                      const instCourseCount = COURSES.filter(
                        (c) => c.majorId === activeMajor.id && c.instituteId === inst.id
                      ).length;
                      return (
                        <button
                          key={inst.id}
                          type="button"
                          onClick={() =>
                            onSelectBranch(
                              activeMajor.id,
                              inst.country,
                              isInstActive ? undefined : inst.id
                            )
                          }
                          className={`w-full text-left p-2.5 rounded-lg border transition-colors ${
                            isInstActive
                              ? 'bg-[#378652] border-[#378652] text-white'
                              : 'bg-white border-slate-200 hover:border-[#378652] text-slate-800'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold truncate">
                              <Building2 className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{inst.name}</span>
                            </span>
                            <span
                              className={`text-[11px] shrink-0 tabular-nums ${
                                isInstActive ? 'text-emerald-100' : 'text-slate-500'
                              }`}
                            >
                              {instCourseCount} {instCourseCount === 1 ? 'course' : 'courses'}
                            </span>
                          </div>
                          <div
                            className={`text-[11px] mt-0.5 truncate ${
                              isInstActive ? 'text-emerald-100' : 'text-slate-500'
                            }`}
                          >
                            {inst.city} · {inst.accreditation}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Filter Toolbar + Courses in this Major Branch */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <div className="inline-flex bg-white border border-slate-200 p-1 rounded-lg">
              {(['ALL', 'Diploma', 'Certificate'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setCredentialFilter(type)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                    credentialFilter === type
                      ? 'bg-[#0f2239] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {type === 'ALL' ? 'All Credentials' : `${type}s`}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter inside this branch..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#378652]"
            />
          </div>
        </div>

        {branchCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {branchCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrollment={enrollments[course.id]}
                onMoreInfo={onNavigateCourse}
                onStartLearning={onNavigateCourse}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Partner Institute Curriculum Synced
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto mb-5">
              This institute participates in the {activeMajor.shortName} branch. Clear the institute filter to view all available courses across {countriesInBranch.length} countries in this branch.
            </p>
            <button
              type="button"
              onClick={() => {
                setCredentialFilter('ALL');
                setSearchFilter('');
                onSelectBranch(activeMajor.id);
              }}
              className="px-4 py-2 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold"
            >
              Show All Courses in {activeMajor.shortName}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
