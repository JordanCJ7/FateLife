/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGameStore } from '../gameStore';
import { GraduationCap, BookOpen, Layers, Award, Sparkles, Heart, AlertTriangle, FileText, Landmark, Key, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils';

export default function EducationPanel() {
  const education = useGameStore((state) => state.education);
  const characterInfo = useGameStore((state) => state.characterInfo);
  const stats = useGameStore((state) => state.stats);
  const finances = useGameStore((state) => state.finances);
  const annualActionsPerformed = useGameStore((state) => state.annualActionsPerformed) || [];
  
  const studyHarder = useGameStore((state) => state.studyHarder);
  const applyToUniversity = useGameStore((state) => state.applyToUniversity);
  const applyToGraduateSchool = useGameStore((state) => state.applyToGraduateSchool);

  // Modal / Selection form state
  const [showUniForm, setShowUniForm] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState('Computer Science');
  const [selectedFunding, setSelectedFunding] = useState<'Scholarship' | 'Parents' | 'Loan'>('Loan');

  const [showGradForm, setShowGradForm] = useState(false);
  const [selectedGradSchool, setSelectedGradSchool] = useState<'Law' | 'Medical' | 'Business'>('Law');
  const [selectedGradFunding, setSelectedGradFunding] = useState<'Scholarship' | 'Parents' | 'Loan'>('Loan');

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!characterInfo || !stats || !finances) return null;

  const currentAge = characterInfo.age;
  const isEnrolled = education && education.currentStage !== 'None';
  const hasUniUnlocks = currentAge >= 18 && currentAge <= 30 && education && education.highestDegreeEarned === 'None' && education.currentStage === 'None';
  const hasGradUnlocks = currentAge >= 21 && currentAge <= 35 && education && education.highestDegreeEarned === 'Undergraduate Degree' && education.currentStage === 'None';

  const uMajors = [
    { value: 'Computer Science', label: '💻 Computer Science (Ideal for Tech Careers)' },
    { value: 'Biology', label: '🧬 Biology (Prerequisite for Medical School)' },
    { value: 'Finance', label: '📈 Finance (Ideal for Business Careers)' },
    { value: 'English', label: '✍️ English (Ideal for Law School)' },
    { value: 'Political Science', label: '⚖️ Political Science (Ideal for Law School)' },
  ];

  const gSchools = [
    { value: 'Law', desc: '⚖️ Law School (3 years) - Grants Law Degree. Leads to Attorney careers.' },
    { value: 'Medical', desc: '⚕️ Medical School (4 years) - Grants Medical Degree. Leads to Doctor careers.' },
    { value: 'Business', desc: '👔 Business / MBA (2 years) - Grants MBA. Leads to Corporate Executives.' },
  ];

  const handleStudy = () => {
    setMessage(null);
    studyHarder();
  };

  const handleUniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const result = applyToUniversity(selectedMajor, selectedFunding);
    if (result.success) {
      setMessage({ type: 'success', text: result.msg });
      setShowUniForm(false);
    } else {
      setMessage({ type: 'error', text: result.msg });
    }
  };

  const handleGradSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    const result = applyToGraduateSchool(selectedGradSchool, selectedGradFunding);
    if (result.success) {
      setMessage({ type: 'success', text: result.msg });
      setShowGradForm(false);
    } else {
      setMessage({ type: 'error', text: result.msg });
    }
  };

  return (
    <div id="education_panel_tab" className="flex flex-col gap-6">
      {/* Messages banner */}
      {message && (
        <div className={`p-4 rounded-xl text-xs flex items-center gap-2 border ${
          message.type === 'success' 
            ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-300' 
            : 'bg-rose-950/40 border-rose-500/20 text-rose-300'
        }`}>
          {message.type === 'success' ? (
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 animate-bounce" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main stats layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GPA */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 bg-blue-950/40 border border-blue-900/30 text-blue-400 rounded-lg">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Academic Standing</p>
            <p className="text-xl font-bold text-white mt-0.5">
              {education ? `${Math.round(education.grades)}%` : 'N/A'}
            </p>
            <p className="text-[10px] text-slate-400">Current Average Grade</p>
          </div>
        </div>

        {/* CURRENT ACADEMIC LEVEL */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 bg-indigo-950/40 border border-indigo-900/30 text-indigo-400 rounded-lg">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Enrolled Stage</p>
            <p className="text-base font-bold text-white mt-0.5 leading-tight truncate">
              {education && education.currentStage !== 'None' ? education.currentStage : 'Not Enrolled'}
            </p>
            <p className="text-[10px] text-slate-400">
              {education && education.currentStage !== 'None' && education.currentMajor 
                ? `Major: ${education.currentMajor}` 
                : 'Free of School Hours'}
            </p>
          </div>
        </div>

        {/* HIGHEST DEGREE */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center gap-3.5">
          <div className="p-3 bg-purple-950/40 border border-purple-900/30 text-purple-400 rounded-lg">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Highest Credential</p>
            <p className="text-base font-bold text-teal-300 mt-0.5 leading-tight">
              {education ? education.highestDegreeEarned : 'None'}
            </p>
            <p className="text-[10px] text-slate-400">Credential Holder Status</p>
          </div>
        </div>
      </div>

      {/* Interactive Actions Area */}
      {isEnrolled && (
        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-yellow-400" /> Currently Enrolled inside {education.currentStage}
            </h3>
            <p className="text-xs text-slate-400">
              Increase academic standing by putting additional effort! Note: Studying leads to increased stress levels.
            </p>
            {education.yearsRemaining !== undefined && (
              <p className="text-[11px] text-indigo-400 font-mono">
                Duration Remaining: <strong>{education.yearsRemaining} year(s)</strong> relative structure
              </p>
            )}
          </div>
          <button
            onClick={handleStudy}
            disabled={annualActionsPerformed.includes('study_harder')}
            className={`w-full md:w-auto px-6 py-2.5 font-semibold rounded-xl text-xs transition
              ${annualActionsPerformed.includes('study_harder')
                ? 'bg-slate-800 border border-slate-700 text-slate-500 opacity-60 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'}`}
          >
            {annualActionsPerformed.includes('study_harder') ? '✏️ Studied (Done This Year)' : '✏️ Study Harder'}
          </button>
        </div>
      )}

      {/* HIGHER EDUCATION REGISTRY */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2 mb-4 flex items-center gap-2">
          <Landmark className="w-4 h-4 text-teal-400" /> Higher Education Registry (Ages 18 - 35)
        </h3>

        {!hasUniUnlocks && !hasGradUnlocks && !isEnrolled && (
          <div className="text-center py-6 text-slate-500">
            <GraduationCap className="w-8 h-8 text-slate-700 mx-auto mb-2" />
            <h4 className="text-xs font-bold">Registry Dormant</h4>
            <p className="text-[11px] text-slate-600 max-w-sm mx-auto mt-1 leading-relaxed">
              Academic tracks are closed. Universities check applications between ages 18-35 when you hold relevant credentials.
            </p>
          </div>
        )}

        {/* UNIVERSITY APPLICATION SYSTEM */}
        {hasUniUnlocks && !showUniForm && (
          <div className="bg-gradient-to-r from-blue-950/20 to-indigo-950/20 p-5 rounded-xl border border-blue-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40">Open Application</span>
              <h4 className="text-sm font-bold text-white mt-2">Apply for Undergraduate University</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">Requires High School Diploma (your average grade: {Math.round(education.grades)}%). Select a major and lock-in funding specs!</p>
            </div>
            <button
              onClick={() => { setMessage(null); setShowUniForm(true); }}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition whitespace-nowrap"
            >
              🎓 Start Application
            </button>
          </div>
        )}

        {/* SUB-FORM UNIVERSITY */}
        {showUniForm && (
          <form onSubmit={handleUniSubmit} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col gap-4 animate-fadeIn">
            <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-blue-400">Undergraduate Admission Form</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-1">Choose Academic Major</label>
                <select
                  value={selectedMajor}
                  onChange={(e) => setSelectedMajor(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 p-2 text-xs rounded-lg"
                >
                  {uMajors.map(m => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-1">Financial Sponsorship</label>
                <select
                  value={selectedFunding}
                  onChange={(e) => setSelectedFunding(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 p-2 text-xs rounded-lg"
                >
                  <option value="Scholarship">🏆 Scholarship (Grades &gt; 85% required)</option>
                  <option value="Parents">👪 Request Parents Cover Tuition (Generous &amp; Wealthy)</option>
                  <option value="Loan">🏦 Commercial Student Loans ($3,500/year debt balance)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-2 border-t border-slate-800/60 pt-3">
              <button
                type="button"
                onClick={() => setShowUniForm(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold"
              >
                Submit Admission Form
              </button>
            </div>
          </form>
        )}

        {/* GRADUATE APPLICATION SYSTEM */}
        {hasGradUnlocks && !showGradForm && (
          <div className="bg-gradient-to-r from-purple-950/20 to-pink-950/20 p-5 rounded-xl border border-purple-500/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/40">Advanced Studies</span>
              <h4 className="text-sm font-bold text-white mt-1.5">Apply for Professional Graduate School</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">Requires Undergraduate Degree (your major: {education.currentMajor}). Advanced tracks grant elite law or medical licenses.</p>
            </div>
            <button
              onClick={() => { setMessage(null); setShowGradForm(true); }}
              className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition whitespace-nowrap"
            >
              💼 Apply for Grad School
            </button>
          </div>
        )}

        {/* SUB-FORM GRADUATE */}
        {showGradForm && (
          <form onSubmit={handleGradSubmit} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col gap-4 animate-fadeIn">
            <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-purple-400">Postgraduate Track Selection</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-1">Choose Postgraduate Path</label>
                <select
                  value={selectedGradSchool}
                  onChange={(e) => setSelectedGradSchool(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 p-2 text-xs rounded-lg"
                >
                  <option value="Law">⚖️ Law School</option>
                  <option value="Medical">⚕️ Medical School</option>
                  <option value="Business">👔 Business Graduate / MBA</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">
                  {gSchools.find(g => g.value === selectedGradSchool)?.desc}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest block mb-1">Funding Mechanism</label>
                <select
                  value={selectedGradFunding}
                  onChange={(e) => setSelectedGradFunding(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-100 p-2 text-xs rounded-lg"
                >
                  <option value="Scholarship">🏆 Scholarship (Undergrad Grades &gt; 85% required)</option>
                  <option value="Parents">👪 Request Parents Sponsor (Extreme Wealth Required)</option>
                  <option value="Loan">🏦 Commercial Graduate Loans ($5,000/year debt balance)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-2 border-t border-slate-800/60 pt-3">
              <button
                type="button"
                onClick={() => setShowGradForm(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold"
              >
                Submit Graduate Application
              </button>
            </div>
          </form>
        )}
      </div>

      {/* CURRICULUM VITAE AND RECORD INFO */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
        <h4 className="text-xs uppercase font-mono tracking-wider font-extrabold text-slate-400 flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-slate-500" /> Academic Transcript Record
        </h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-900 border border-slate-800/50 p-3 rounded-lg">
            <span className="text-slate-500 block text-[9px] uppercase font-mono mb-0.5">High School State</span>
            <span className="text-white font-medium">
              {education && ['Undergraduate Degree', 'Law Degree', 'Medical Degree', 'MBA'].includes(education.highestDegreeEarned) || (education && education.highestDegreeEarned !== 'None')
                ? 'Completed (High School Diploma)' 
                : (education && education.currentStage === 'High School' ? 'Enrolled inside High School' : 'Lacking / Ongoing')}
            </span>
          </div>
          <div className="bg-slate-900 border border-slate-800/50 p-3 rounded-lg">
            <span className="text-slate-500 block text-[9px] uppercase font-mono mb-0.5">Active Tuition Debt</span>
            <span className="text-rose-300 font-bold font-mono">
              {finances.annualDebt > 0 ? `${formatCurrency(finances.annualDebt)}/yr` : 'No Liabilities'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
