import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  Coins,
  Globe2,
  GraduationCap,
  Search,
  Star,
  Users,
  WifiOff,
} from 'lucide-react';
import {
  COURSES,
  COURSE_IMAGES,
  INSTITUTES,
  MAJORS,
  POPULAR_SKILLS,
  TESTIMONIALS,
} from '../data/catalog';
import { useAuth } from '../contexts/AuthContext';
import { CourseCard } from '../components/CourseCard';
import { MajorIcon } from '../components/MajorIcon';
import { AppRoute } from '../components/Navbar';

interface HomePageProps {
  onNavigate: (route: AppRoute) => void;
  onNavigateBranch: (majorId: string, countryFilter?: string, instituteId?: string) => void;
  onNavigateCourse: (courseId: string) => void;
  onOpenAppModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onNavigateBranch,
  onNavigateCourse,
  onOpenAppModal,
}) => {
  const { enrollments } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModeTab, setActiveModeTab] = useState<'learn' | 'career' | 'earn'>('learn');
  const [activeSkill, setActiveSkill] = useState<string>('Health Care');

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { majors: [], institutes: [], courses: [] };
    return {
      majors: MAJORS.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.shortName.toLowerCase().includes(q) ||
          m.skills.some((s) => s.toLowerCase().includes(q))
      ).slice(0, 3),
      institutes: INSTITUTES.filter(
        (i) => i.name.toLowerCase().includes(q) || i.country.toLowerCase().includes(q)
      ).slice(0, 3),
      courses: COURSES.filter((c) => c.title.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [searchQuery]);

  const diplomas = COURSES.filter((c) => c.credentialType === 'Diploma').slice(0, 4);
  const certificates = COURSES.filter((c) => c.credentialType === 'Certificate').slice(0, 4);

  const skillMatchedCourses = useMemo(() => {
    const matched = COURSES.filter((c) =>
      c.skills.some((s) => s.toLowerCase() === activeSkill.toLowerCase())
    );
    return matched.length > 0 ? matched.slice(0, 4) : COURSES.slice(0, 4);
  }, [activeSkill]);

  const partnerShortcuts = [
    { label: 'Stanford', instId: 'stanford-online', majorId: 'computer-science-it', style: 'font-serif text-[#8c1515]' },
    { label: 'MIT Sloan', instId: 'mit-sloan', majorId: 'business-management', style: 'font-bold text-slate-700' },
    { label: 'University of Cambridge', instId: 'cambridge-digital', majorId: 'computer-science-it', style: 'font-serif text-slate-700' },
    { label: 'TUM Munich', instId: 'tum-munich', majorId: 'computer-science-it', style: 'font-bold text-sky-800' },
    { label: 'ETH Zurich', instId: 'eth-zurich', majorId: 'engineering-construction', style: 'font-bold text-slate-800' },
    { label: 'Johns Hopkins', instId: 'johns-hopkins-health', majorId: 'health-nursing', style: 'font-serif text-sky-900' },
    { label: 'NUS Singapore', instId: 'nus-singapore', majorId: 'computer-science-it', style: 'font-bold text-amber-700' },
  ];

  return (
    <div>
      {/* Sub-Nav Mode Bar (moved cleanly below header per Top Bar Contract) */}
      <div className="bg-white pt-5 pb-2 px-5">
        <div className="max-w-[1240px] mx-auto flex justify-center">
          <div className="inline-flex flex-wrap justify-center bg-slate-100 p-1 rounded-full gap-1">
            <button
              type="button"
              onClick={() => setActiveModeTab('learn')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeModeTab === 'learn'
                  ? 'bg-[#378652] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Learn &amp; Get Certificates</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveModeTab('career');
                onNavigate('career');
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeModeTab === 'career'
                  ? 'bg-[#378652] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Build Your Career</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveModeTab('earn');
                onNavigate('business');
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                activeModeTab === 'earn'
                  ? 'bg-[#378652] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span>Earn &amp; Train Teams</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white pt-8 pb-12 px-5">
        <div className="max-w-[1240px] mx-auto text-center">
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] font-extrabold tracking-tight text-slate-900 mb-3 text-balance max-w-3xl mx-auto">
            Free Online Courses With Certificates &amp; Diplomas
          </h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto mb-7">
            Study across leading institutes from 14+ countries—organized into unified Academic Major Branches so every course in the same major lives in one place.
          </p>

          {/* Interactive Search with Instant Dropdown */}
          <div className="max-w-[680px] mx-auto mb-9 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchResults.majors[0]) {
                  onNavigateBranch(searchResults.majors[0].id);
                } else if (e.key === 'Enter' && searchResults.courses[0]) {
                  onNavigateCourse(searchResults.courses[0].id);
                }
              }}
              placeholder="Search major, course, country, or university (e.g. Nursing, Germany, Python)..."
              className="w-full h-14 pl-12 pr-32 rounded-lg border border-slate-300 text-base text-slate-900 shadow-xs focus:outline-none focus:border-[#378652] focus:ring-2 focus:ring-[#378652]/15"
            />
            <button
              type="button"
              onClick={() => onNavigateBranch(searchResults.majors[0]?.id || MAJORS[0].id)}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold whitespace-nowrap shrink-0"
            >
              Explore
            </button>

            {searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-[60px] bg-white rounded-xl border border-slate-200 shadow-xl z-20 p-4 text-left space-y-3">
                {searchResults.majors.length > 0 && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
                      Major Branches
                    </div>
                    <div className="space-y-1">
                      {searchResults.majors.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => onNavigateBranch(m.id)}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-[#f1f7f3] text-sm font-semibold text-slate-800 flex items-center justify-between"
                        >
                          <span>{m.name}</span>
                          <span className="text-xs text-[#378652]">View Branch →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.institutes.length > 0 && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
                      Institutes &amp; Countries
                    </div>
                    <div className="space-y-1">
                      {searchResults.institutes.map((inst) => (
                        <button
                          key={inst.id}
                          type="button"
                          onClick={() => onNavigateBranch(inst.majorIds[0], inst.country, inst.id)}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm text-slate-700 flex items-center justify-between"
                        >
                          <span>
                            {inst.name} · <span className="text-slate-500">{inst.country}</span>
                          </span>
                          <span className="text-xs text-sky-700">Open in Major Branch →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.courses.length > 0 && (
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400 mb-1.5">
                      Matching Courses
                    </div>
                    <div className="space-y-1">
                      {searchResults.courses.map((course) => (
                        <button
                          key={course.id}
                          type="button"
                          onClick={() => onNavigateCourse(course.id)}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50 text-sm text-slate-800 flex items-center justify-between"
                        >
                          <span className="font-medium truncate">{course.title}</span>
                          <span className="text-xs text-slate-500 shrink-0 ml-2">
                            {course.credentialType}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.majors.length === 0 &&
                  searchResults.institutes.length === 0 &&
                  searchResults.courses.length === 0 && (
                    <p className="text-sm text-slate-500 py-2">
                      No direct match for &ldquo;{searchQuery}&rdquo;. Try &ldquo;Computer Science&rdquo;, &ldquo;Germany&rdquo;, or &ldquo;Health&rdquo;.
                    </p>
                  )}
              </div>
            )}
          </div>

          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">
            Learn From World Leading Academic Institutes
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-9">
            {partnerShortcuts.map((partner) => (
              <button
                key={partner.instId}
                type="button"
                onClick={() => onNavigateBranch(partner.majorId, undefined, partner.instId)}
                className={`text-lg sm:text-xl hover:opacity-100 opacity-85 transition-opacity hover:underline underline-offset-4 ${partner.style}`}
              >
                {partner.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Navy Stats Metrics Bar */}
      <div className="bg-[#0f2239] text-white py-5 px-5">
        <div className="max-w-[1240px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 text-center items-center">
          <div className="flex items-center justify-center gap-2 text-sm font-semibold lg:border-r lg:border-white/15">
            <span>Rated Excellent</span>
            <span className="inline-flex items-center gap-1 bg-[#00b67a] text-white px-2 py-0.5 rounded text-xs font-bold">
              <Star className="w-3 h-3 fill-white" /> Trustpilot
            </span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold tabular-nums lg:border-r lg:border-white/15">
            <Users className="w-4 h-4 text-emerald-300" />
            <span>50+ Million Learners</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold tabular-nums lg:border-r lg:border-white/15">
            <GraduationCap className="w-4 h-4 text-emerald-300" />
            <span>15+ Million Graduates</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold tabular-nums">
            <Globe2 className="w-4 h-4 text-emerald-300" />
            <span>193 Countries</span>
          </div>
        </div>
      </div>

      {/* Meadow Green Major Categories Grid */}
      <section className="bg-[#80a950] py-14 px-5">
        <div className="max-w-[1240px] mx-auto">
          <div className="text-center mb-9">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-balance">
              Explore 6,000+ Free Courses by Major Branch
            </h2>
            <p className="text-sm text-white/90 max-w-2xl mx-auto">
              Select any major below to see all partner universities from different countries grouped together in that single academic branch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {MAJORS.map((major) => {
              const branchInstCount = INSTITUTES.filter((i) =>
                i.majorIds.includes(major.id)
              ).length;
              return (
                <button
                  key={major.id}
                  type="button"
                  onClick={() => onNavigateBranch(major.id)}
                  className="bg-white rounded-2xl p-6 text-center flex flex-col items-center justify-between min-h-[184px] shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#eef7f2] text-[#378652] flex items-center justify-center mb-3">
                    <MajorIcon name={major.iconName} className="w-6 h-6" />
                  </div>
                  <div className="text-[15px] font-bold text-slate-900 leading-snug mb-2">
                    {major.shortName}
                  </div>
                  <div className="text-xs text-slate-500 font-medium tabular-nums">
                    {major.courseCount.toLocaleString()} Courses · {branchInstCount} Institutes →
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Diplomas Section */}
      <section className="py-14 px-5">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Top Diplomas</h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Comprehensive multi-module academic programs from accredited global faculties.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="px-4 py-2 rounded-md border border-[#378652] text-[#378652] hover:bg-[#378652] hover:text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              Explore more Diploma courses
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {diplomas.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrollment={enrollments[course.id]}
                onMoreInfo={onNavigateCourse}
                onStartLearning={onNavigateCourse}
                onSelectMajor={(mId) => onNavigateBranch(mId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills Interactive Filter Band */}
      <section className="bg-white py-12 px-5 border-y border-slate-200">
        <div className="max-w-[1240px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight text-balance">
                Advance Your Career. Learn In-demand Skills.
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                Select a skill below to preview matching certified courses across partner universities.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-700 mb-3">
                Popular Skills Filter
              </div>
              <div className="flex flex-wrap gap-2.5">
                {POPULAR_SKILLS.map((skill) => {
                  const isActive = activeSkill === skill;
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => setActiveSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'border-sky-600 bg-sky-50 text-sky-800 font-semibold'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-[#378652] hover:text-[#378652]'
                      }`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillMatchedCourses.map((course) => (
              <CourseCard
                key={`skill-${course.id}`}
                course={course}
                enrollment={enrollments[course.id]}
                onMoreInfo={onNavigateCourse}
                onStartLearning={onNavigateCourse}
                onSelectMajor={(mId) => onNavigateBranch(mId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Certificates Section */}
      <section className="py-14 px-5">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">Top Certificates</h2>
              <p className="text-sm text-slate-600 mt-0.5">
                Focused 2–6 hour credentials to build verified workplace competencies quickly.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="px-4 py-2 rounded-md border border-[#378652] text-[#378652] hover:bg-[#378652] hover:text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              Explore more Certificate courses
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certificates.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                enrollment={enrollments[course.id]}
                onMoreInfo={onNavigateCourse}
                onStartLearning={onNavigateCourse}
                onSelectMajor={(mId) => onNavigateBranch(mId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 px-5 border-t border-slate-200">
        <div className="max-w-[1240px] mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-10 text-balance">
            Over <span className="text-sky-700">50 million learners</span> have used AMii to advance their education
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-9 text-left">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="bg-[#0d1e38] rounded-2xl p-7 text-white flex flex-col justify-between min-h-[230px]"
              >
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                    Graduate Outcome · {t.country}
                  </div>
                  <p className="text-lg font-bold leading-snug mb-3">&ldquo;{t.quote}&rdquo;</p>
                  <p className="text-xs text-slate-300 leading-relaxed mb-5">{t.outcome}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateBranch(t.majorId)}
                    className="text-xs font-semibold text-emerald-300 hover:underline whitespace-nowrap"
                  >
                    View Major →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('stories')}
            className="px-6 py-2.5 rounded-md border border-[#378652] text-[#378652] hover:bg-[#378652] hover:text-white text-sm font-bold transition-colors"
          >
            View All Testimonials
          </button>
        </div>
      </section>

      {/* Offline Learning / App Section */}
      <section className="bg-[#eef5fa] py-14 px-5">
        <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-700 mb-3">
              <WifiOff className="w-4 h-4" />
              <span>Offline Learning Access</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-4 text-balance">
              Learn without Internet — Use the AMii Mobile App
            </h2>
            <p className="text-base text-slate-600 leading-relaxed mb-6">
              Save complete university modules and quizzes to study offline anytime. Sync your major-branch progress automatically when you reconnect.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenAppModal}
                className="px-5 py-3 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Get App &amp; QR Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-slate-700 tabular-nums inline-flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#378652]" />
                12 Million+ App Downloads
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-200 bg-white">
            <img
              src={COURSE_IMAGES.campus}
              alt="International university library atrium"
              referrerPolicy="no-referrer"
              className="w-full h-64 lg:h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
