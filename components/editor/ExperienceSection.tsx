'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function ExperienceSection() {
  const { resumeData, addExperience, updateExperience, removeExperience, reorderExperience } = useResumeStore();
  const { experience } = resumeData;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm mb-6">
      <h3 className="font-semibold text-lg text-gray-800">Experience</h3>
      
      {experience.map((exp, index) => (
        <div key={exp.id} className="border p-3 rounded-md space-y-2 bg-gray-50 relative">
          {/* Reorder and Card Header Controls */}
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
            className="w-full border rounded px-3 py-1.5 text-sm bg-white"
            placeholder="Job Title (e.g. Software Developer)"
            value={exp.position}
            onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-1.5 text-sm bg-white"
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="w-1/2 border rounded px-3 py-1.5 text-sm bg-white"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
            />
            <input
              className="w-1/2 border rounded px-3 py-1.5 text-sm bg-white"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-gray-700">Description / Responsibilities</label>
            </div>
            <textarea
              className="w-full border rounded px-3 py-1.5 text-sm bg-white"
              placeholder="Briefly describe what you did..."
              rows={3}
              value={exp.description}
              onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
            />
          </div>

          <button 
            type="button"
            onClick={() => removeExperience(exp.id)} 
            className="text-red-500 text-xs font-medium hover:underline pt-1 block cursor-pointer"
          >
            Remove Experience
          </button>
        </div>
      ))}

      <button 
        type="button"
        onClick={() => addExperience({ company: '', position: '', startDate: '', endDate: '', description: '' })} 
        className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition cursor-pointer"
      >
        + Add Experience
      </button>

      {experience.length === 0 && (
        <p className="text-gray-500 text-sm italic">No experience added yet.</p>
      )}
    </div>
  );
}