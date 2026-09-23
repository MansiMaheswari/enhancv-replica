'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function SummarySection() {
  const { resumeData, updateSummary } = useResumeStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Professional Summary</h3>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <textarea
          rows={4}
          value={resumeData.summary}
          onChange={(e) => updateSummary(e.target.value)}
          placeholder="Write a short professional summary about yourself..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
        />
      </div>
    </div>
  );
}