'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function ProjectsSection() {
  const { resume, setProjects } = useResumeStore();

  const handleAddProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: '',
      description: '',
    };
    setProjects([...resume.projects, newProject]);
  };

  const handleUpdateProject = (id: string, field: string, value: string) => {
    const updated = resume.projects.map((proj) =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    setProjects(updated);
  };

  const handleRemoveProject = (id: string) => {
    const filtered = resume.projects.filter((proj) => proj.id !== id);
    setProjects(filtered);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-700">Projects</h3>
        <button
          type="button"
          onClick={handleAddProject}
          className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 font-medium transition-colors"
        >
          + Add Project
        </button>
      </div>

      {resume.projects.map((proj, index) => (
        <div key={proj.id} className="bg-white p-4 rounded border border-gray-200 mb-4 space-y-3 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-gray-500 uppercase">Project #{index + 1}</span>
            <button
              type="button"
              onClick={() => handleRemoveProject(proj.id)}
              className="text-red-500 text-xs hover:underline font-semibold"
            >
              Remove Project
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Project Title</label>
            <input
              type="text"
              placeholder="e.g. Smart KYC Document Extractor"
              value={proj.title || ''}
              onChange={(e) => handleUpdateProject(proj.id, 'title', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Description / Tech Stack</label>
            <textarea
              placeholder="Built using Python, FastAPI, and EasyOCR..."
              value={proj.description || ''}
              onChange={(e) => handleUpdateProject(proj.id, 'description', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white text-sm"
              rows={2}
            />
          </div>
        </div>
      ))}

      {resume.projects.length === 0 && (
        <p className="text-sm text-gray-400 italic text-center py-2">No projects added yet. Click "+ Add Project" to begin.</p>
      )}
    </div>
  );
}