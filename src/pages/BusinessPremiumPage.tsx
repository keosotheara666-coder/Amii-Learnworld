import React, { useState } from 'react';
import { Building2, CheckCircle2, Crown, Users } from 'lucide-react';
import { MAJORS } from '../data/catalog';
import { useAuth } from '../contexts/AuthContext';
import { submitBusinessInquiry } from '../lib/firestoreHelpers';

interface BusinessPremiumPageProps {
  mode: 'business' | 'premium';
  onSwitchMode: (mode: 'business' | 'premium') => void;
}

export const BusinessPremiumPage: React.FC<BusinessPremiumPageProps> = ({
  mode,
  onSwitchMode,
}) => {
  const { user, profile, openAuthModal, refreshProfileUpdates } = useAuth();
  const [seats, setSeats] = useState(25);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  // Business Inquiry form
  const [companyName, setCompanyName] = useState('');
  const [majorFocus, setMajorFocus] = useState(MAJORS[0].id);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState<string | null>(null);
  const [planMessage, setPlanMessage] = useState<string | null>(null);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      openAuthModal('signup');
      return;
    }
    setSubmitting(true);
    try {
      const id = await submitBusinessInquiry(user.uid, {
        companyName: companyName.trim(),
        teamSize: `${seats} seats`,
        majorFocus,
        notes,
      });
      setInquiryId(id);
      setCompanyName('');
      setNotes('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePlan = async (targetPlan: 'free' | 'premium') => {
    if (!user) {
      openAuthModal('signup');
      return;
    }
    setSubmitting(true);
    setPlanMessage(null);
    try {
      await refreshProfileUpdates({ plan: targetPlan });
      setPlanMessage(
        targetPlan === 'premium'
          ? 'Premium Learning is now active on your AMii profile.'
          : 'Switched back to the Free Learner plan.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const estimatedAnnualSavings = seats * 420;

  return (
    <div className="py-10 px-5">
      <div className="max-w-[1240px] mx-auto">
        <div className="inline-flex p-1 bg-slate-200/70 rounded-xl mb-8">
          <button
            type="button"
            onClick={() => onSwitchMode('business')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 ${
              mode === 'business' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>AMii For Business</span>
          </button>
          <button
            type="button"
            onClick={() => onSwitchMode('premium')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-2 ${
              mode === 'premium' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
            }`}
          >
            <Crown className="w-4 h-4" />
            <span>Go Premium</span>
          </button>
        </div>

        {mode === 'business' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#378652] mb-1">
                  Enterprise Workforce Training
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
                  Upskill Global Teams Across Unified Major Branches
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Assign cross-border university diplomas, monitor compliance completion, and train teams across Healthcare, IT, Engineering, and Finance from a single LMS.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-bold text-slate-900 inline-flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#378652]" />
                    <span>Team Size: {seats} Learners</span>
                  </label>
                  <span className="text-xs font-semibold text-[#378652] tabular-nums">
                    Est. ${estimatedAnnualSavings.toLocaleString()}/yr training value
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={seats}
                  onChange={(e) => setSeats(Number(e.target.value))}
                  className="w-full accent-[#378652]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
                  <span>5 seats</span>
                  <span>250 seats</span>
                  <span>500 seats</span>
                </div>
              </div>

              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#378652]" />
                  <span>Free LMS deployment with zero per-course seat fees</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#378652]" />
                  <span>Mix Stanford, Cambridge, TUM, and Johns Hopkins modules in one branch</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#378652]" />
                  <span>Downloadable audit reports for ISO and safety compliance</span>
                </li>
              </ul>
            </div>

            <form
              onSubmit={handleInquirySubmit}
              className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4"
            >
              <h2 className="text-xl font-bold text-slate-900">Request Free Team LMS Access</h2>
              {inquiryId && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                  Inquiry recorded (Ref: <span className="font-mono-num">{inquiryId}</span>). Our enterprise onboarding team will reach out shortly.
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organization / Company Name
                </label>
                <input
                  type="text"
                  required
                  minLength={2}
                  maxLength={120}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Meridian Health Partners"
                  className="w-full px-3 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:border-[#378652]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Training Major Branch
                </label>
                <select
                  value={majorFocus}
                  onChange={(e) => setMajorFocus(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-md border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#378652]"
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
                  Training Goals &amp; Notes
                </label>
                <textarea
                  rows={3}
                  maxLength={1000}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Optional details about departments or target regions..."
                  className="w-full px-3 py-2.5 rounded-md border border-slate-300 text-sm focus:outline-none focus:border-[#378652]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold"
              >
                {user ? 'Submit Team Request' : 'Sign In to Submit Team Request'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
                  AMii Premium Membership
                </h1>
                <p className="text-sm text-slate-600">
                  Study ad-free, unlock 50% off official parchment certificates, and access priority transcripts.
                </p>
              </div>
              <div className="inline-flex bg-white border border-slate-200 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md ${
                    billingCycle === 'monthly' ? 'bg-[#0f2239] text-white' : 'text-slate-600'
                  }`}
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md ${
                    billingCycle === 'annual' ? 'bg-[#0f2239] text-white' : 'text-slate-600'
                  }`}
                >
                  Annual (Save 25%)
                </button>
              </div>
            </div>

            {planMessage && (
              <div className="mb-6 p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-900">
                {planMessage}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">Free Learner</h2>
                  <div className="text-3xl font-extrabold text-slate-900 tabular-nums mb-4">
                    $0 <span className="text-sm font-normal text-slate-500">/ forever</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#378652]" />
                      <span>Full access to 6,000+ courses &amp; all Major Branches</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#378652]" />
                      <span>Unlimited final assessment attempts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#378652]" />
                      <span>Digital completion record in your dashboard</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  disabled={submitting || profile?.plan === 'free'}
                  onClick={() => handleTogglePlan('free')}
                  className="w-full py-2.5 rounded-md border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                >
                  {profile?.plan === 'free' ? 'Current Plan' : 'Select Free Plan'}
                </button>
              </div>

              <div className="bg-[#0f2239] text-white rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1">
                    Recommended for Graduates
                  </div>
                  <h2 className="text-xl font-bold mb-1">AMii Premium</h2>
                  <div className="text-3xl font-extrabold tabular-nums mb-4">
                    {billingCycle === 'annual' ? '$5.99' : '$7.99'}{' '}
                    <span className="text-sm font-normal text-slate-300">/ month</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-slate-200 mb-6">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Zero distractions &amp; ad-free study player</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>50% discount on official Diploma &amp; Certificate documents</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Offline mobile pack downloads &amp; verified employer share links</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  disabled={submitting || profile?.plan === 'premium'}
                  onClick={() => handleTogglePlan('premium')}
                  className="w-full py-2.5 rounded-md bg-[#378652] hover:bg-[#2d6e42] text-white text-sm font-semibold disabled:opacity-60"
                >
                  {profile?.plan === 'premium'
                    ? 'Active on Your Account'
                    : user
                    ? 'Activate Premium Plan'
                    : 'Sign Up for Premium'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
