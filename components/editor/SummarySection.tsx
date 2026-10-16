'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function SummarySection() {
  const { resumeData, updateSummary } = useResumeStore();
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateAI = async () => {
    if (!resumeData.summary || resumeData.summary.trim().length === 0) {
      setError('Please enter some summary text first before enhancing with AI.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'summary',
          text: resumeData.summary || 'Experienced professional looking for new opportunities.',
          jobTitle: resumeData.personalInfo?.jobTitle || 'Professional'
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate');

      const list = data.result
        .split('\n')
        .filter((item: string) => item.trim().length > 0);

      setSuggestions(list);
      setShowModal(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Professional Summary</h3>
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={loading}
          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-md hover:opacity-90 transition disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
        >
          {loading ? 'Generating...' : '✨ AI Enhance'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-gray-100">
            <h4 className="text-md font-bold text-gray-900 mb-3">Choose an AI Summary Suggestion</h4>
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {suggestions.map((sug, idx) => (
                <div 
                  key={idx} 
                  onClick={() => {
                    updateSummary(sug.replace(/^\d+[\.\)]\s*/, ''));
                    setShowModal(false);
                  }}
                  className="p-3 border border-gray-200 rounded-md hover:border-indigo-500 hover:bg-indigo-50/50 cursor-pointer text-sm text-gray-800 transition"
                >
                  {sug}
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}