'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Plus, X, ArrowUp, ArrowDown } from 'lucide-react';

export function SkillsSection() {
  const { resumeData, setSkills } = useResumeStore();
  const { skills = [] } = resumeData;
  const [inputValue, setInputValue] = useState('');

  // Nayi skill add karne ke liye
  const handleAddSkill = () => {
    if (inputValue.trim() !== '') {
      setSkills([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };

  // Enter key press karne par skill add ho jaye
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Kisi skill ko remove karne ke liye
  const handleRemoveSkill = (indexToRemove: number) => {
    const updatedSkills = skills.filter((_, index) => index !== indexToRemove);
    setSkills(updatedSkills);
  };

  // Skills ko upar ya niche reorder karne ke liye
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newSkills = [...skills];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex >= 0 && targetIndex < newSkills.length) {
      const temp = newSkills[index];
      newSkills[index] = newSkills[targetIndex];
      newSkills[targetIndex] = temp;
      setSkills(newSkills);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
      
      {/* Input Field & Add Button */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React, Python, FastAPI"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          type="button"
          onClick={handleAddSkill}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-1 text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Skills Chips / Pills List with Reorder & Remove */}
      <div className="flex flex-col gap-2">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 border border-gray-200 px-3 py-2 rounded-md text-sm"
          >
            <span className="font-medium text-gray-700">{skill}</span>
            <div className="flex items-center gap-1">
              {/* Move Up Button */}
              <button
                type="button"
                onClick={() => handleMove(index, 'up')}
                disabled={index === 0}
                className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                title="Move Up"
              >
                <ArrowUp size={16} />
              </button>
              {/* Move Down Button */}
              <button
                type="button"
                onClick={() => handleMove(index, 'down')}
                disabled={index === skills.length - 1}
                className="p-1 text-gray-400 hover:text-gray-700 disabled:opacity-30 transition-colors"
                title="Move Down"
              >
                <ArrowDown size={16} />
              </button>
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemoveSkill(index)}
                className="p-1 text-red-400 hover:text-red-600 transition-colors ml-2"
                title="Remove Skill"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <p className="text-sm text-gray-400 italic text-center py-2">
            No skills added yet. Add your technical or soft skills above.
          </p>
        )}
      </div>
    </div>
  );
}