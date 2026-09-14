'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function SkillsSection() {
  const { resume, setSkills } = useResumeStore();
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!resume.skills.includes(inputValue.trim())) {
        setSkills([...resume.skills, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(resume.skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-3">Skills</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Add Skill (Press Enter)</label>
          <input 
            type="text" 
            placeholder="e.g. Python, React, Machine Learning (Press Enter)" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddSkill}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
          />
        </div>

        {/* Display added skills as tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {resume.skills.map((skill) => (
            <span 
              key={skill} 
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1"
            >
              {skill}
              <button 
                type="button" 
                onClick={() => handleRemoveSkill(skill)}
                className="text-blue-600 hover:text-blue-900 ml-1 font-bold"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}