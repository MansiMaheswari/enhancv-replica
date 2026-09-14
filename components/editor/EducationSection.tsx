'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function EducationSection() {
  const { resume, addEducation, updateEducation, removeEducation } = useResumeStore();
  const { education } = resume;

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Education</h3>
      
      {education.map((edu) => (
        <div key={edu.id} className="bg-white p-4 rounded border border-gray-200 mb-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">School / University</label>
            <input 
              type="text" 
              placeholder="e.g. Vivekananda Global University" 
              value={edu.school}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Degree / Field of Study</label>
            <input 
              type="text" 
              placeholder="e.g. MCA in AI and Data Science" 
              value={edu.degree}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Year / Duration</label>
            <input 
              type="text" 
              placeholder="e.g. 2024 - 2026" 
              value={edu.year}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
              onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
            />
          </div>
          <button 
            type="button" 
            onClick={() => removeEducation(edu.id)}
            className="text-red-500 text-sm font-medium hover:underline"
          >
            Remove Education
          </button>
        </div>
      ))}

      <button 
        type="button" 
        onClick={addEducation}
        className="w-full py-2 bg-blue-50 text-blue-600 font-medium rounded border border-blue-200 hover:bg-blue-100 transition-colors"
      >
        + Add Education
      </button>
    </div>
  );
}