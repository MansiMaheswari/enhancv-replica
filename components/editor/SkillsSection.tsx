'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function SkillsSection() {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const { skills = [] } = resumeData;
  const [skillInput, setSkillInput] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    addSkill(skillInput.trim());
    setSkillInput('');
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm mb-6">
      <h3 className="font-semibold text-lg text-gray-800">Skills</h3>
      
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-1.5 text-sm bg-white text-black"
          placeholder="Add a skill (e.g. Python, React, Supabase)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 pt-2">
        {skills.map((skill, index) => (
          <span 
            key={`${skill}-${index}`} 
            className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full border border-gray-200 font-medium"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-gray-500 hover:text-red-600 ml-1 font-bold"
              title="Remove skill"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {skills.length === 0 && (
        <p className="text-gray-500 text-sm italic">No skills added yet.</p>
      )}
    </div>
  );
}