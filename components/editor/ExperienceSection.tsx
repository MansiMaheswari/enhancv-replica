'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function ExperienceSection() {
  const { resumeData, addExperience, updateExperience, removeExperience, reorderExperience } = useResumeStore();
  const { experience = [] } = resumeData;

  // AI Enhance States
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [fullEnhancedText, setFullEnhancedText] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [activeExpId, setActiveExpId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerateAI = async (uniqueId: string, description: string, position: string) => {
    if (!description || description.trim().length === 0) {
      setError('Please enter some experience description first before enhancing with AI.');
      return;
    }
    try {
      setLoadingId(uniqueId);
      setError('');
      setActiveExpId(uniqueId);

      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bullet_points',
          text: description || 'Worked on developing software applications.',
          jobTitle: position || resumeData.personalInfo?.jobTitle || 'Software Engineer'
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to generate content');

      setFullEnhancedText(data.result);
      setShowModal(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoadingId(null);
    }
  };

  const applyFullSuggestion = () => {
    if (activeExpId !== null && fullEnhancedText) {
      updateExperience(activeExpId, 'description', fullEnhancedText);
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm mb-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-800">Experience</h3>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {experience.map((exp: any, index: number) => {
        const uniqueId = exp.id || `exp-${index}-${Date.now()}`;

        return (
          <div key={uniqueId} className="border p-3 rounded-md space-y-2 bg-gray-50 relative">
            <div className="flex justify-between items-center pb-1 border-b border-gray-200 mb-2">
              <span className="text-xs font-semibold text-gray-500">Experience #{index + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => reorderExperience(index, 'up')}
                  disabled={index === 0}
                  className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded disabled:opacity-30 hover:bg-gray-300 transition cursor-pointer"
                  title="Move Up"
                >
                  ▲ Up
                </button>
                <button
                  type="button"
                  onClick={() => reorderExperience(index, 'down')}
                  disabled={index === experience.length - 1}
                  className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded disabled:opacity-30 hover:bg-gray-300 transition cursor-pointer"
                  title="Move Down"
                >
                  ▼ Down
                </button>
              </div>
            </div>

            <input
              className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
              placeholder="Company Name (e.g. KvonTech)"
              value={exp.company || ''}
              onChange={(e) => updateExperience(uniqueId, 'company', e.target.value)}
            />
            <input
              className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
              placeholder="Position / Role (e.g. Junior Associate Developer)"
              value={exp.position || ''}
              onChange={(e) => updateExperience(uniqueId, 'position', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
                placeholder="Start Date (e.g. Jan 2026)"
                value={exp.startDate || ''}
                onChange={(e) => updateExperience(uniqueId, 'startDate', e.target.value)}
              />
              <input
                className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
                placeholder="End Date (e.g. Apr 2026 or Present)"
                value={exp.endDate || ''}
                onChange={(e) => updateExperience(uniqueId, 'endDate', e.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">Description</span>
                <button
                  type="button"
                  onClick={() => handleGenerateAI(uniqueId, exp.description, exp.position)}
                  disabled={loadingId === uniqueId}
                  className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium rounded hover:opacity-90 transition disabled:opacity-50 flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  {loadingId === uniqueId ? 'Enhancing...' : '✨ AI Enhance'}
                </button>
              </div>
              <textarea
                rows={4}
                className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
                placeholder="Description of your responsibilities and achievements..."
                value={exp.description || ''}
                onChange={(e) => updateExperience(uniqueId, 'description', e.target.value)}
              />
            </div>

            <button 
              type="button"
              onClick={() => removeExperience(uniqueId)} 
              className="text-red-500 text-xs font-medium hover:underline pt-1 block cursor-pointer"
            >
              Remove Experience
            </button>
          </div>
        );
      })}

      <button 
        type="button"
        onClick={() => addExperience({ id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', description: '' })} 
        className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition cursor-pointer"
      >
        + Add Experience
      </button>

      {experience.length === 0 && (
        <p className="text-gray-500 text-sm italic">No experience added yet.</p>
      )}

      {/* AI Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-gray-100">
            <h4 className="text-md font-bold text-gray-900 mb-2">Enhanced Bullet Points</h4>
            <p className="text-xs text-gray-500 mb-4">Review the enhanced version of your description below:</p>
            
            <div className="p-4 border border-indigo-200 bg-indigo-50/30 rounded-md text-sm text-gray-800 whitespace-pre-line mb-5">
              {fullEnhancedText}
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 text-sm rounded-md hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyFullSuggestion}
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 cursor-pointer"
              >
                Apply Enhanced Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}