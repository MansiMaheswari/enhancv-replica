import React from 'react';
import { ATSResult } from '../../lib/atsChecker';
interface ATSModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ATSResult | null;
  companyName?: string;
}

export const ATSScoreModal: React.FC<ATSModalProps> = ({ isOpen, onClose, result, companyName = 'Target Role' }) => {
  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-base font-medium text-slate-700 sm:text-lg">
            Check the compatibility between your CV and the job posting <span className="font-semibold text-slate-900">{companyName}</span>
          </h2>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            ✕
          </button>
        </div>

        {/* Top Summary & Scores Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Circular Gauge Card */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 p-6 md:col-span-5">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-emerald-500 bg-white shadow-inner">
              <div className="text-center">
                <span className="text-4xl font-extrabold text-slate-800">{result.score}</span>
                <p className="text-xs font-semibold text-slate-500">% match</p>
              </div>
            </div>
          </div>

          {/* Individual Category Breakdown Cards */}
          <div className="flex flex-col gap-3 md:col-span-7">
            {/* Keywords Match */}
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-purple-600">🏷️</span>
                <span className="font-medium text-slate-700">Keywords match</span>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${result.keywordsMatchScore > 70 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {result.keywordsMatchScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </span>
            </div>

            {/* Job Title Match */}
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-blue-600">💼</span>
                <span className="font-medium text-slate-700">Job title match</span>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${result.jobTitleMatchScore === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                {result.jobTitleMatchScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </span>
            </div>

            {/* Qualifications Match */}
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-amber-500">🎓</span>
                <span className="font-medium text-slate-700">Qualifications match</span>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${result.qualificationsMatchScore === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {result.qualificationsMatchScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </span>
            </div>

            {/* Responsibilities Match */}
            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="text-emerald-600">📋</span>
                <span className="font-medium text-slate-700">Responsibilities match</span>
              </div>
              <span className={`rounded-full px-3 py-1 text-sm font-bold ${result.responsibilitiesMatchScore === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {result.responsibilitiesMatchScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
              </span>
            </div>
          </div>
        </div>

        {/* Improvement Suggestions Cards Section */}
        <div className="mt-6 border-t pt-4">
          <h3 className="flex items-center gap-2 font-semibold text-slate-800">
            <span>💡</span> Improvement suggestions
          </h3>

          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {result.suggestions.map((suggestion: string, index: number) => (
              <div key={index} className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 text-xs font-medium text-slate-700 shadow-sm sm:text-sm">
                {suggestion}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="mt-6 flex justify-end border-t pt-4">
          <button onClick={onClose} className="rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white transition hover:bg-blue-700">
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};