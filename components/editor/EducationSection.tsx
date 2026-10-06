'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function EducationSection() {
  const { resumeData, addEducation, updateEducation, removeEducation, reorderEducation } = useResumeStore();
  const { education = [] } = resumeData;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm mb-6">
      <h3 className="font-semibold text-lg text-gray-800">Education</h3>
      
      {education.map((edu, index) => {
        const uniqueId = edu.id || `edu-${index}-${Date.now()}`;

        return (
          <div key={uniqueId} className="border p-3 rounded-md space-y-2 bg-gray-50 relative">
            {/* Reorder and Card Header Controls */}
            <div className="flex justify-between items-center pb-1 border-b border-gray-200 mb-2">
              <span className="text-xs font-semibold text-gray-500">Education #{index + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => reorderEducation(index, 'up')}
                  disabled={index === 0}
                  className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded disabled:opacity-30 hover:bg-gray-300 transition cursor-pointer"
                  title="Move Up"
                >
                  ▲ Up
                </button>
                <button
                  type="button"
                  onClick={() => reorderEducation(index, 'down')}
                  disabled={index === education.length - 1}
                  className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded disabled:opacity-30 hover:bg-gray-300 transition cursor-pointer"
                  title="Move Down"
                >
                  ▼ Down
                </button>
              </div>
            </div>

            <input
              className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
              placeholder="Degree (e.g. MCA, BBA)"
              value={edu.degree || ''}
              onChange={(e) => updateEducation(uniqueId, 'degree', e.target.value)}
            />
            <input
              className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
              placeholder="Institution / University Name"
              value={edu.institution || ''}
              onChange={(e) => updateEducation(uniqueId, 'institution', e.target.value)}
            />
            <input
              className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
              placeholder="Graduation Year (e.g. 2026)"
              value={edu.graduationDate || ''}
              onChange={(e) => updateEducation(uniqueId, 'graduationDate', e.target.value)}
            />

            <button 
              type="button"
              onClick={() => removeEducation(uniqueId)} 
              className="text-red-500 text-xs font-medium hover:underline pt-1 block cursor-pointer"
            >
              Remove Education
            </button>
          </div>
        );
      })}

      <button 
        type="button"
        onClick={() => addEducation({ id: Date.now().toString(), degree: '', institution: '', graduationDate: '' })} 
        className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition cursor-pointer"
      >
        + Add Education
      </button>

      {education.length === 0 && (
        <p className="text-gray-500 text-sm italic">No education added yet.</p>
      )}
    </div>
  );
}