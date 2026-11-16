import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Award,
  Building2,
  CheckCircle2,
  Clock,
  GitBranch,
  Globe2,
  GraduationCap,
  PlayCircle,
  Users,
} from 'lucide-react';
import { COURSES, INSTITUTES, MAJORS } from '../data/catalog';
import { useAuth } from '../contexts/AuthContext';
import { enrollInCourse, updateCourseProgress } from '../lib/firestoreHelpers';

interface CourseDetailPageProps {
  courseId: string;
  onBack: () => void;
  onNavigateBranch: (majorId: string, country?: string, instituteId?: string) => void;
  onNavigateCourse: (courseId: string) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseId,
  onBack,
  onNavigateBranch,
  onNavigateCourse,
}) => {
  const { user, profile, enrollments, openAuthModal } = useAuth();
  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];
  const institute = INSTITUTES.find((i) => i.id === course.instituteId);
  const major = MAJORS.find((m) => m.id === course.majorId);
  const enrollment = enrollments[course.id];

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [actionBusy, setActionBusy] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Sibling courses in the same Major Branch across different countries
  const siblingBranchCourses = useMemo(
    () => COURSES.filter((c) => c.majorId === course.majorId && c.id !== course.id).slice(0, 3),
    [course.majorId, course.id]
  );

  const activeModule = course.modules[activeModuleIndex] || course.modules[0];
  const completedSet = new Set(enrollment?.completedModules || []);

  const handleEnroll = async () => {
    if (!user) {
      openAuthModal('signup');
      return;
    }
    setActionBusy(true);
    setStatusMessage(null);
    try {
      await enrollInCourse(user.uid, course.id, course.majorId, course.instituteId);
      setStatusMessage('Enrolled! Your progress now saves automatically.');
    } finally {
      setActionBusy(false);
    }
  };

  const handleToggleModuleComplete = async (moduleId: string) => {
    if (!user) {
      openAuthModal('signup');
      return;
    }
    setActionBusy(true);
    setStatusMessage(null);
    try {
      if (!enrollment) {
        await enrollInCourse(user.uid, course.id, course.majorId, course.instituteId);
      }
      const nextCompleted = new Set(enrollment?.completedModules || []);
      if (nextCompleted.has(moduleId)) {
        nextCompleted.delete(moduleId);
      } else {
        nextCompleted.add(moduleId);
      }
      const arr = Array.from(nextCompleted);
      const moduleRatio = course.modules.length > 0 ? arr.length / course.modules.length : 0;
      const newProgress = enrollment?.certificateEarned
        ? 100
        : Math.round(moduleRatio * 80);
      await updateCourseProgress(user.uid, course.id, arr, newProgress);
    } finally {
      setActionBusy(false);
    }
  };

  const handleSubmitQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    const total = course.quiz.length;
    let correct = 0;
    course.quiz.forEach((q) => {
      if (answers[q.id] === q.correctIndex) correct += 1;
    });
    const score = Math.round((correct / total) * 100);
    const passed = score >= 67;
    setQuizResult({ score, passed });

    if (user) {
      setActionBusy(true);
      try {
        if (!enrollment) {
          await enrollInCourse(user.uid, course.id, course.majorId, course.instituteId);
        }
        const allModuleIds = course.modules.map((m) => m.id);
        await updateCourseProgress(
          user.uid,
          course.id,
          passed ? allModuleIds : enrollment?.completedModules || [],
          passed ? 100 : Math.max(enrollment?.progress || 0, 50),
          score,
          passed
        );
      } finally {
        setActionBusy(false);
      }
    }
  };

  return (
    <div className="py-8 px-5">
      <div className="max-w-[1240px] mx-auto">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>

        {/* Course Header Split */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8 grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 mb-3">
                <span className="text-[#378652]">{course.credentialType}</span>
                <span aria-hidden="true">·</span>
                <span>{course.level} Level</span>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => major && onNavigateBranch(major.id)}
                  className="text-sky-700 hover:underline inline-flex items-center gap-1"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Major Branch: {major?.shortName}</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 text-balance">
                {course.title}
              </h1>

              {institute && (
                <button
                  type="button"
                  onClick={() =>
                    onNavigateBranch(course.majorId, institute.country, institute.id)
                  }
                  className="inline-flex flex-wrap items-center gap-2 text-sm text-slate-700 hover:text-[#378652] font-medium mb-4"
                >
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>{institute.name}</span>
                  <span aria-hidden="true">·</span>
                  <Globe2 className="w-4 h-4 text-sky-700" />
                  <span>
                    {institute.city}, {institute.country}
                  </span>
                </button>
              )}

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {course.overview}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 tabular-nums pb-4 border-b border-slate-100">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {course.durationHours} study time
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  {course.learnersCount.toLocaleString()} learners
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-slate-400" />
                  {institute?.accreditation}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {!enrollment ? (
                  <button
                    type="button"
                    onClick={handleEnroll}
                    disabled={actionBusy}
                    className="px-6 py-3 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{user ? 'Enroll Free & Start Learning' : 'Sign Up Free to Enroll'}</span>
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold tabular-nums">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {enrollment.certificateEarned
                          ? 'Certificate Earned (100%)'
                          : `Enrolled · ${enrollment.progress}% Complete`}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowQuiz(true)}
                      className="px-4 py-2.5 rounded-md border border-[#378652] text-[#378652] hover:bg-[#378652] hover:text-white text-sm font-semibold transition-colors"
                    >
                      {enrollment.certificateEarned ? 'Retake Final Quiz' : 'Take Final Assessment'}
                    </button>
                  </div>
                )}

                {statusMessage && (
                  <span className="text-xs font-medium text-[#378652]">{statusMessage}</span>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-100 min-h-[240px]">
            <img
              src={course.thumbnail}
              alt={course.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Interactive Classroom Stage (Two-Zone Layout per Education Guidelines) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
          {/* Left Zone: Module Reader or Assessment Quiz */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            {!showQuiz ? (
              <div>
                <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100">
                  <div>
                    <div className="text-xs font-semibold text-[#378652] mb-1 tabular-nums">
                      Lesson {activeModuleIndex + 1} of {course.modules.length} · {activeModule.durationMinutes} min
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{activeModule.title}</h2>
                  </div>
                  <button
                    type="button"
                    disabled={actionBusy}
                    onClick={() => handleToggleModuleComplete(activeModule.id)}
                    className={`px-4 py-2 rounded-md text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                      completedSet.has(activeModule.id)
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {completedSet.has(activeModule.id) ? 'Completed' : 'Mark Lesson Complete'}
                    </span>
                  </button>
                </div>

                <p className="text-base text-slate-700 leading-relaxed mb-6">
                  {activeModule.summary}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-bold text-slate-900 mb-3">Core Lesson Takeaways</h3>
                  <ul className="space-y-2.5">
                    {activeModule.keyTakeaways.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm text-slate-700 bg-slate-50 p-3 rounded-lg"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#378652] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={activeModuleIndex === 0}
                    onClick={() => setActiveModuleIndex((i) => Math.max(0, i - 1))}
                    className="px-4 py-2 rounded-md border border-slate-200 text-xs font-semibold text-slate-700 disabled:opacity-40"
                  >
                    Previous Lesson
                  </button>

                  {activeModuleIndex < course.modules.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setActiveModuleIndex((i) => i + 1)}
                      className="px-4 py-2 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-xs font-semibold"
                    >
                      Next Lesson →
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowQuiz(true)}
                      className="px-5 py-2 rounded-md bg-[#0f2239] hover:bg-slate-800 text-white text-xs font-semibold"
                    >
                      Proceed to Final Assessment →
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuiz}>
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                  <div>
                    <div className="text-xs font-semibold text-sky-700 mb-1">
                      Final Assessment · Passing Score: 67%
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Earn Your {course.credentialType}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowQuiz(false)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Return to Lessons
                  </button>
                </div>

                <div className="space-y-6 mb-6">
                  {course.quiz.map((q, qIdx) => (
                    <fieldset key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <legend className="text-sm font-bold text-slate-900 mb-3">
                        {qIdx + 1}. {q.prompt}
                      </legend>
                      <div className="space-y-2">
                        {q.options.map((opt, optIdx) => (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors ${
                              answers[q.id] === optIdx
                                ? 'bg-emerald-50 border-[#378652] text-slate-900 font-medium'
                                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name={q.id}
                              checked={answers[q.id] === optIdx}
                              onChange={() => setAnswers((prev) => ({ ...prev, [q.id]: optIdx }))}
                              className="accent-[#378652]"
                              required
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ))}
                </div>

                {quizResult && (
                  <div
                    className={`p-4 rounded-xl border mb-5 ${
                      quizResult.passed
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-amber-50 border-amber-200 text-amber-900'
                    }`}
                  >
                    <div className="text-sm font-bold mb-1 tabular-nums">
                      Score: {quizResult.score}% —{' '}
                      {quizResult.passed ? 'Assessment Passed!' : 'Keep Reviewing & Retry'}
                    </div>
                    <p className="text-xs">
                      {quizResult.passed
                        ? user
                          ? `Your ${course.credentialType} has been recorded to your AMii profile (${profile?.displayName || user.displayName}).`
                          : 'Great score! Sign up or log in to save this official certificate to your learner transcript.'
                        : 'Review the lesson takeaways and try again to reach 67% or higher.'}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={actionBusy}
                    className="px-6 py-2.5 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold"
                  >
                    Submit Assessment
                  </button>
                  {!user && (
                    <button
                      type="button"
                      onClick={() => openAuthModal('signup')}
                      className="px-4 py-2.5 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Sign Up to Save Certificate
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Right Zone: Syllabus Modules & Outcomes */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Course Syllabus</h3>
              <div className="space-y-2">
                {course.modules.map((mod, idx) => {
                  const isCurrent = !showQuiz && idx === activeModuleIndex;
                  const isDone = completedSet.has(mod.id);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => {
                        setShowQuiz(false);
                        setActiveModuleIndex(idx);
                      }}
                      className={`w-full text-left p-3 rounded-lg border transition-colors flex items-start justify-between gap-2 ${
                        isCurrent
                          ? 'bg-[#f1f7f3] border-[#378652]'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 line-clamp-1">
                          {mod.title}
                        </div>
                        <div className="text-[11px] text-slate-500 tabular-nums mt-0.5">
                          {mod.durationMinutes} min
                        </div>
                      </div>
                      {isDone && <CheckCircle2 className="w-4 h-4 text-[#378652] shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={() => setShowQuiz(true)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors flex items-center justify-between ${
                    showQuiz
                      ? 'bg-[#0f2239] border-[#0f2239] text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <span className="text-xs font-bold">Final {course.credentialType} Quiz</span>
                  <Award className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-3">What You Will Learn</h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {course.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#378652] shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Same Major Branch Across Other Institutes/Countries */}
        {siblingBranchCourses.length > 0 && (
          <section className="bg-white rounded-2xl border border-slate-200 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-bold text-[#378652] mb-0.5">
                  Same Major Branch · Other International Institutes
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                  More Courses in {major?.shortName}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => major && onNavigateBranch(major.id)}
                className="text-xs font-semibold text-[#378652] hover:underline"
              >
                View Full {major?.shortName} Branch →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {siblingBranchCourses.map((sib) => {
                const sibInst = INSTITUTES.find((i) => i.id === sib.instituteId);
                return (
                  <button
                    key={sib.id}
                    type="button"
                    onClick={() => onNavigateCourse(sib.id)}
                    className="text-left p-4 rounded-xl border border-slate-200 hover:border-[#378652] transition-colors"
                  >
                    <div className="text-[11px] font-semibold text-sky-700 mb-1">
                      {sibInst?.name} · {sibInst?.country}
                    </div>
                    <div className="text-sm font-bold text-slate-900 mb-1">{sib.title}</div>
                    <div className="text-xs text-slate-500">
                      {sib.credentialType} · {sib.durationHours}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
