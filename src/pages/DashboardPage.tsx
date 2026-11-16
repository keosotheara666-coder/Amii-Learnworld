import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle2, LogOut, Settings, UserCheck } from 'lucide-react';
import { COUNTRIES_LIST, COURSES, INSTITUTES, MAJORS } from '../data/catalog';
import { useAuth } from '../contexts/AuthContext';

interface DashboardPageProps {
  onNavigateCourse: (courseId: string) => void;
  onNavigateBranch: (majorId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateCourse,
  onNavigateBranch,
}) => {
  const { user, profile, enrollments, openAuthModal, signOutUser, refreshProfileUpdates } =
    useAuth();

  const [displayName, setDisplayName] = useState(profile?.displayName || '');
  const [country, setCountry] = useState(profile?.country || 'United States');
  const [targetMajor, setTargetMajor] = useState(profile?.targetMajor || MAJORS[0].id);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <div className="py-16 px-5">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <UserCheck className="w-10 h-10 text-[#378652] mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to view My Learning</h1>
          <p className="text-sm text-slate-600 mb-6">
            Access your enrolled courses, major branch progress, and earned certificates across all partner universities.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className="px-5 py-2.5 rounded-md border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('signup')}
              className="px-5 py-2.5 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    );
  }

  const enrolledList = Object.values(enrollments);
  const earnedCerts = enrolledList.filter((e) => e.certificateEarned);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedNotice(null);
    try {
      await refreshProfileUpdates({
        displayName: displayName.trim() || profile?.displayName || 'Learner',
        country,
        targetMajor,
      });
      setSavedNotice('Profile updated.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="py-10 px-5">
      <div className="max-w-[1240px] mx-auto space-y-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-[#378652] mb-1">
              {profile?.plan === 'premium' ? 'Premium Learner' : 'Free Learner'} ·{' '}
              {profile?.country || 'Global'}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Welcome back, {profile?.displayName || user.displayName}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateBranch(profile?.targetMajor || MAJORS[0].id)}
              className="px-4 py-2 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-xs font-semibold"
            >
              Explore My Major Branch
            </button>
            <button
              type="button"
              onClick={signOutUser}
              className="px-4 py-2 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Summary KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-xs text-slate-500 mb-1">Enrolled Courses</div>
            <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
              {enrolledList.length}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-xs text-slate-500 mb-1">Earned Certificates</div>
            <div className="text-2xl font-extrabold text-[#378652] tabular-nums">
              {earnedCerts.length}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="text-xs text-slate-500 mb-1">Primary Major Branch</div>
            <div className="text-base font-bold text-slate-900 truncate">
              {MAJORS.find((m) => m.id === profile?.targetMajor)?.shortName || 'Computer Science & IT'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Enrolled Courses */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#378652]" />
              <span>Active Enrollments &amp; Certificates</span>
            </h2>

            {enrolledList.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-600 mb-4">
                  You have not enrolled in any courses yet. Browse a Major Branch to start learning.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigateBranch(profile?.targetMajor || MAJORS[0].id)}
                  className="px-4 py-2 rounded-md bg-[#378652] text-white text-xs font-semibold"
                >
                  Browse Courses in My Major
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {enrolledList.map((enr) => {
                  const course = COURSES.find((c) => c.id === enr.courseId);
                  if (!course) return null;
                  const inst = INSTITUTES.find((i) => i.id === course.instituteId);
                  return (
                    <div
                      key={enr.courseId}
                      className="p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-sky-700 mb-0.5">
                          {inst?.name} ({inst?.country}) · {course.credentialType}
                        </div>
                        <div className="text-sm font-bold text-slate-900 truncate">
                          {course.title}
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden max-w-xs">
                            <div
                              className="h-full bg-[#378652]"
                              style={{ width: `${enr.progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-700 tabular-nums">
                            {enr.progress}%
                          </span>
                          {enr.certificateEarned && (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#378652]">
                              <Award className="w-4 h-4" />
                              Certified ({enr.quizScore ?? 100}%)
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onNavigateCourse(course.id)}
                        className="px-4 py-2 rounded-md bg-[#0f2239] hover:bg-slate-800 text-white text-xs font-semibold whitespace-nowrap shrink-0"
                      >
                        {enr.certificateEarned ? 'Review Course' : 'Continue Learning'}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile Settings */}
          <form
            onSubmit={handleSaveProfile}
            className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 h-fit"
          >
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-slate-500" />
              <span>Learner Settings</span>
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Display Name</label>
              <input
                type="text"
                maxLength={100}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={profile?.displayName || 'Your name'}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm bg-white"
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
                Primary Major Branch
              </label>
              <select
                value={targetMajor}
                onChange={(e) => setTargetMajor(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm bg-white"
              >
                {MAJORS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.shortName}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold"
            >
              {saving ? 'Saving...' : 'Save Preferences'}
            </button>

            {savedNotice && (
              <div className="text-xs font-semibold text-[#378652] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{savedNotice}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
