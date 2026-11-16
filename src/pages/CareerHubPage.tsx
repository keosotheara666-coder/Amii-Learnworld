import React, { useEffect, useState } from 'react';
import { ArrowRight, Briefcase, CheckCircle2, Compass, FileText, Printer, Save } from 'lucide-react';
import { MAJORS } from '../data/catalog';
import { useAuth } from '../contexts/AuthContext';
import { getSavedResume, saveUserResume } from '../lib/firestoreHelpers';

interface CareerHubPageProps {
  onNavigateBranch: (majorId: string) => void;
}

const APTITUDE_QUESTIONS = [
  {
    id: 'a1',
    prompt: 'Which type of daily problem energizes you most?',
    options: [
      { label: 'Designing software systems, data pipelines, or automation', majorId: 'computer-science-it' },
      { label: 'Supporting patient recovery, clinical safety, and public health', majorId: 'health-nursing' },
      { label: 'Analyzing financial statements, legal contracts, or strategy', majorId: 'business-management' },
      { label: 'Building physical infrastructure, bridges, or safe worksites', majorId: 'engineering-construction' },
    ],
  },
  {
    id: 'a2',
    prompt: 'Which work environment fits you best?',
    options: [
      { label: 'Tech engineering lab or distributed cloud team', majorId: 'computer-science-it' },
      { label: 'Hospital ward, clinic, or community health organization', majorId: 'health-nursing' },
      { label: 'Classroom, curriculum studio, or university department', majorId: 'teaching-academics' },
      { label: 'Growth marketing team or international brand consultancy', majorId: 'sales-marketing' },
    ],
  },
  {
    id: 'a3',
    prompt: 'What measurable impact would make you proudest after one year?',
    options: [
      { label: 'Shipping a reliable software platform used by thousands', majorId: 'computer-science-it' },
      { label: 'Improving workplace psychological well-being & mental health', majorId: 'psychology-mental-health' },
      { label: 'Cutting operational defects through Lean Six Sigma quality control', majorId: 'leadership-operations' },
      { label: 'Leading multilingual client communication across borders', majorId: 'languages-applied' },
    ],
  },
];

export const CareerHubPage: React.FC<CareerHubPageProps> = ({ onNavigateBranch }) => {
  const { user, profile, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState<'aptitude' | 'resume' | 'guide'>('aptitude');

  // Aptitude state
  const [aptAnswers, setAptAnswers] = useState<Record<string, string>>({});
  const [recommendedMajorId, setRecommendedMajorId] = useState<string | null>(null);

  // Resume state
  const [fullName, setFullName] = useState(profile?.displayName || '');
  const [headline, setHeadline] = useState('Certified Specialist · Open to Global Roles');
  const [summary, setSummary] = useState(
    'Dedicated lifelong learner combining accredited cross-border diplomas with hands-on analytical and team leadership experience.'
  );
  const [targetMajor, setTargetMajor] = useState(profile?.targetMajor || MAJORS[0].id);
  const [skillsText, setSkillsText] = useState('Information Systems, Python Programming, Quality Control');
  const [savingResume, setSavingResume] = useState(false);
  const [resumeSavedMsg, setResumeSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getSavedResume(user.uid)
      .then((res) => {
        if (res) {
          setFullName(res.fullName);
          setHeadline(res.headline);
          setSummary(res.summary);
          setTargetMajor(res.targetMajor);
          setSkillsText(res.skills.join(', '));
        } else if (profile?.displayName) {
          setFullName(profile.displayName);
          setTargetMajor(profile.targetMajor);
        }
      })
      .catch(() => {});
  }, [user, profile]);

  const handleCalculateAptitude = (e: React.FormEvent) => {
    e.preventDefault();
    const counts: Record<string, number> = {};
    Object.values(aptAnswers).forEach((mId) => {
      counts[mId] = (counts[mId] || 0) + 1;
    });
    const best = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || MAJORS[0].id;
    setRecommendedMajorId(best);
  };

  const handleSaveResume = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('signup');
      return;
    }
    setSavingResume(true);
    setResumeSavedMsg(null);
    try {
      const skills = skillsText
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .slice(0, 20);
      await saveUserResume(user.uid, {
        fullName: fullName.trim() || user.displayName || 'AMii Learner',
        headline: headline.trim() || 'AMii Certified Learner',
        summary: summary.trim() || 'Completed verified courses on AMii.',
        targetMajor,
        skills,
      });
      setResumeSavedMsg('Resume saved to your account.');
    } finally {
      setSavingResume(false);
    }
  };

  const recommendedMajor = MAJORS.find((m) => m.id === recommendedMajorId);

  return (
    <div className="py-10 px-5">
      <div className="max-w-[1240px] mx-auto">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#378652] mb-1">
            AMii Career Hub
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Build Your Career &amp; Connect Majors to Roles
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Take a rapid aptitude check to find your ideal Major Branch, build a structured CV backed by your certificates, or browse career pathways.
          </p>
        </div>

        {/* Segmented Control */}
        <div className="inline-flex flex-wrap gap-1 p-1 bg-slate-200/70 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('aptitude')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
              activeTab === 'aptitude' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Career Aptitude Test</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('resume')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
              activeTab === 'resume' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Resumé Builder</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition-colors ${
              activeTab === 'guide' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Career Guide by Major</span>
          </button>
        </div>

        {activeTab === 'aptitude' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleCalculateAptitude}
              className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-5"
            >
              <h2 className="text-lg font-bold text-slate-900">
                3-Question Major Branch Matcher
              </h2>
              {APTITUDE_QUESTIONS.map((q, idx) => (
                <fieldset key={q.id} className="space-y-2">
                  <legend className="text-sm font-semibold text-slate-800 mb-2">
                    {idx + 1}. {q.prompt}
                  </legend>
                  {q.options.map((opt) => (
                    <label
                      key={opt.label}
                      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer text-sm ${
                        aptAnswers[q.id] === opt.majorId
                          ? 'bg-[#f1f7f3] border-[#378652] font-medium'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        required
                        onChange={() =>
                          setAptAnswers((prev) => ({ ...prev, [q.id]: opt.majorId }))
                        }
                        className="accent-[#378652]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </fieldset>
              ))}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold"
              >
                Reveal Recommended Major Branch
              </button>
            </form>

            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-center">
              {recommendedMajor ? (
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#378652] mb-1">
                    Recommended Major Branch
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                    {recommendedMajor.name}
                  </h3>
                  <p className="text-sm text-slate-600 mb-5">{recommendedMajor.description}</p>
                  <button
                    type="button"
                    onClick={() => onNavigateBranch(recommendedMajor.id)}
                    className="px-5 py-2.5 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold inline-flex items-center gap-2"
                  >
                    <span>Explore All Institutes in This Branch</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Compass className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    Your Major Match Appears Here
                  </h3>
                  <p className="text-xs text-slate-500">
                    Answer all 3 questions to see which unified Major Branch and international universities match your strengths.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleSaveResume}
              className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 space-y-4"
            >
              <h2 className="text-lg font-bold text-slate-900">Edit Your Resumé Details</h2>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jordan Patel"
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm focus:outline-none focus:border-[#378652]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Professional Headline
                </label>
                <input
                  type="text"
                  required
                  maxLength={160}
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm focus:outline-none focus:border-[#378652]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Major Branch
                </label>
                <select
                  value={targetMajor}
                  onChange={(e) => setTargetMajor(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#378652]"
                >
                  {MAJORS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Career Summary
                </label>
                <textarea
                  rows={4}
                  required
                  maxLength={2000}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm focus:outline-none focus:border-[#378652]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Key Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={skillsText}
                  onChange={(e) => setSkillsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-slate-300 text-sm focus:outline-none focus:border-[#378652]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={savingResume}
                  className="px-5 py-2.5 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold inline-flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{user ? 'Save Resumé' : 'Sign Up to Save Resumé'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold inline-flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
                {resumeSavedMsg && (
                  <span className="text-xs font-semibold text-[#378652] inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {resumeSavedMsg}
                  </span>
                )}
              </div>
            </form>

            {/* Live Formatted Preview */}
            <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-8 shadow-xs">
              <div className="border-b border-slate-200 pb-4 mb-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#378652] mb-1">
                  Live CV Preview
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {fullName || 'Your Name'}
                </h3>
                <p className="text-sm font-medium text-slate-600 mt-0.5">{headline}</p>
              </div>
              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Academic Major Focus
                </h4>
                <p className="text-sm font-semibold text-slate-900">
                  {MAJORS.find((m) => m.id === targetMajor)?.name}
                </p>
              </div>
              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Executive Summary
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">{summary}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Core Competencies
                </h4>
                <p className="text-sm text-slate-700">
                  {skillsText
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MAJORS.map((major) => (
              <div
                key={major.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1.5">{major.name}</h3>
                  <p className="text-xs text-slate-600 mb-3 leading-relaxed">{major.description}</p>
                  <div className="text-xs text-slate-500 mb-4">
                    Key Skills: {major.skills.join(' · ')}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateBranch(major.id)}
                  className="text-left text-xs font-semibold text-[#378652] hover:underline inline-flex items-center gap-1"
                >
                  <span>Browse Institutes in {major.shortName}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
