/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGameStore } from '../gameStore';
import { OCCUPATIONS } from '../utils';
import { Briefcase, Key, GraduationCap, XCircle, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { formatCurrency } from '../utils';

export default function CareersPanel() {
  const stats = useGameStore((state) => state.stats);
  const characterInfo = useGameStore((state) => state.characterInfo);
  const finances = useGameStore((state) => state.finances);
  const education = useGameStore((state) => state.education);
  const applyForJob = useGameStore((state) => state.applyForJob);
  const resignJob = useGameStore((state) => state.resignJob);
  const availableJobs = useGameStore((state) => state.availableJobs) || [];

  const [message, setMessage] = useState<string | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);

  if (!characterInfo || !stats || !finances) return null;

  // We restrict job hunting to people who are at least 16 or out of primary school stages.
  const isSchoolStage = characterInfo.age < 16;

  const handleApply = (title: string, salary: number, minSmarts: number, minHealth: number, requiredDegree?: string, requiredMajor?: string | null) => {
    setMessage(null);
    setErrorText(null);

    if (stats.smarts < minSmarts) {
      setErrorText(`Your application for "${title}" was instantly rejected! The company requires at least ${minSmarts}% Smarts.`);
      return;
    }

    if (stats.health < minHealth) {
      setErrorText(`Failed physical. Your application for "${title}" failed medical clearance due to low health (min required: ${minHealth}%).`);
      return;
    }

    if (requiredDegree && requiredDegree !== 'None') {
      const highestEarned = education?.highestDegreeEarned || 'None';
      const degreesRank = ['None', 'High School Diploma', 'Undergraduate Degree', 'Law Degree', 'Medical Degree', 'MBA'];
      const earnedRankIdx = degreesRank.indexOf(highestEarned);
      const reqRankIdx = degreesRank.indexOf(requiredDegree);

      // Higher or equal degrees satisfy baseline degree requirements
      const meetsDegreeLevel = (requiredDegree === 'Undergraduate Degree' && ['Undergraduate Degree', 'Law Degree', 'Medical Degree', 'MBA'].includes(highestEarned)) ||
        (reqRankIdx <= earnedRankIdx);

      if (!meetsDegreeLevel) {
        setErrorText(`Rejected! The position of "${title}" strictly requires a ${requiredDegree}. Your current highest degree is: ${highestEarned}.`);
        return;
      }

      if (requiredDegree === 'Undergraduate Degree' && requiredMajor) {
        if (highestEarned === 'Undergraduate Degree' && education?.currentMajor && education.currentMajor !== requiredMajor) {
          setErrorText(`Rejected! The position requires a degree specializing in ${requiredMajor}. (Your major is ${education.currentMajor}).`);
          return;
        }
      }
    }

    applyForJob(title, salary);
    setMessage(`Congratulations! You passed the assessment interview. You are officially hired as a ${title} with an initial salary of ${formatCurrency(salary)}/year!`);
  };

  const handleResign = () => {
    setMessage(null);
    setErrorText(null);
    const prev = characterInfo.currentOccupation;
    resignJob();
    setMessage(`You surrendered your title as "${prev}". You are now officially Unemployed.`);
  };

  return (
    <div id="careers_panel_tab" className="flex flex-col gap-6">
      {/* Messaging banner */}
      {message && (
        <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 p-3 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          {message}
        </div>
      )}
      {errorText && (
        <div className="bg-rose-950/40 border border-rose-500/20 text-rose-300 p-3 rounded-xl text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
          {errorText}
        </div>
      )}

      {/* Stats Summary */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase font-mono tracking-wider text-slate-500">Current Status</p>
          <p className="text-lg font-bold text-white mt-1">{characterInfo.currentOccupation}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            Annual Income: <span className="font-semibold text-emerald-400">{formatCurrency(finances.annualSalary)}/yr</span>
          </p>
        </div>

        {characterInfo.currentOccupation !== 'Unemployed' &&
         characterInfo.currentOccupation !== 'Baby' &&
         !characterInfo.currentOccupation.includes('Student') && (
          <button
            onClick={handleResign}
            className="bg-rose-900 hover:bg-rose-800 text-rose-100 text-xs px-4 py-2 rounded-lg font-semibold transition flex items-center justify-center gap-1.5 self-start sm:self-center"
          >
            <XCircle className="w-4 h-4" /> Resign immediately
          </button>
        )}
      </div>

      {isSchoolStage ? (
        <div className="bg-slate-950 border border-slate-800 p-8 rounded-xl text-center">
          <GraduationCap className="w-10 h-10 text-slate-600 mx-auto mb-3 animate-pulse" />
          <h4 className="text-sm font-bold text-slate-300">Underaged for Workforce</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-2 leading-relaxed">
            You are currently {characterInfo.age} years old and fully enrolled as a student. Concentrate on your homework and hobbies till you turn at least 16!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <Briefcase className="w-4 h-4 text-sky-400" /> Career Vacancy Registry
          </h3>

          {availableJobs.length === 0 ? (
            <div className="bg-slate-950 border border-slate-850 p-10 rounded-2xl text-center space-y-2">
              <HelpCircle className="w-8 h-8 text-slate-700 mx-auto" />
              <h4 className="text-sm font-bold text-slate-300">No Open Vacancies</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                All companies closed their applicant pools for the year. Age up or check back next year for freshly updated vacancies matched to your academic credentials.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {availableJobs.map((job) => {
                const isQualifiedSmarts = stats.smarts >= job.minSmarts;
                const isQualifiedHealth = stats.health >= job.minHealth;
                const isSameJob = characterInfo.currentOccupation === job.title;

                // Validate educational prerequisites
                const highestEarned = education?.highestDegreeEarned || 'None';
                const degreesRank = ['None', 'High School Diploma', 'Undergraduate Degree', 'Law Degree', 'Medical Degree', 'MBA'];
                const earnedRankIdx = degreesRank.indexOf(highestEarned);
                const reqRankIdx = job.requiredDegree ? degreesRank.indexOf(job.requiredDegree) : 0;

                // Higher or equal degrees satisfy baseline degree requirements
                const meetsDegreeLevel = !job.requiredDegree || job.requiredDegree === 'None' ||
                  (job.requiredDegree === 'Undergraduate Degree' && ['Undergraduate Degree', 'Law Degree', 'Medical Degree', 'MBA'].includes(highestEarned)) ||
                  (reqRankIdx <= earnedRankIdx);

                const meetsMajor = !job.requiredDegree || job.requiredDegree !== 'Undergraduate Degree' || !job.requiredMajor ||
                  (highestEarned !== 'Undergraduate Degree' || !education?.currentMajor || education.currentMajor === job.requiredMajor);

                const meetsEducation = meetsDegreeLevel && meetsMajor;
                const isQualified = isQualifiedSmarts && isQualifiedHealth && meetsEducation;

                return (
                  <div
                    key={job.title}
                    className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all duration-200 
                    ${isSameJob ? 'bg-cyan-950/20 border-cyan-500/40 shadow-inner' : 'bg-slate-950 border-slate-800 hover:border-slate-700'}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">{job.title}</h4>
                        <p className="text-xs text-emerald-400 font-mono font-semibold mt-1">
                          Salary: {formatCurrency(job.salary)}/yr
                        </p>
                      </div>
                      {isSameJob && (
                        <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                          Active Job
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-[10px]">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-slate-500 font-mono uppercase">Minimums:</span>
                        <span className={isQualifiedSmarts ? 'text-teal-400 font-medium' : 'text-rose-400 font-medium'}>
                          Smarts: {job.minSmarts}%
                        </span>
                        <span className="text-slate-700">•</span>
                        <span className={isQualifiedHealth ? 'text-teal-400 font-medium' : 'text-rose-400 font-medium'}>
                          Health: {job.minHealth}%
                        </span>
                      </div>

                      {job.requiredDegree && job.requiredDegree !== 'None' && (
                        <div className={`flex items-center gap-1.5 mt-1 pt-1.5 border-t border-slate-800/60 ${meetsEducation ? 'text-indigo-300' : 'text-rose-450 text-rose-300'}`}>
                          <GraduationCap className="w-3.5 h-3.5" />
                          <span>
                            Prerequisite: <strong className="underline">{job.requiredDegree}</strong> {job.requiredMajor ? `(${job.requiredMajor})` : ''}
                          </span>
                          {!meetsEducation && (
                            <span className="text-[9px] font-bold text-rose-400 ml-auto uppercase tracking-wide">Lacking</span>
                          )}
                        </div>
                      )}
                    </div>

                    {!isSameJob && (
                      <button
                        onClick={() => handleApply(job.title, job.salary, job.minSmarts, job.minHealth, job.requiredDegree, job.requiredMajor)}
                        className={`w-full py-2 rounded-lg text-xs font-bold transition-all duration-200
                        ${isQualified 
                          ? 'bg-slate-800 scrollbar-track-slate-900 border border-slate-700 hover:bg-slate-700 text-teal-300 cursor-pointer' 
                          : 'bg-slate-900 border border-slate-800 text-slate-600 cursor-not-allowed hover:bg-slate-900'}`}
                      >
                        {isQualified ? 'Submit Resume & Apply' : 'Qualifications Missing'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
