'use client';

import React, { useState } from 'react';
import { useResumeStore, Project } from '@/store/useResumeStore';

export function ProjectsSection() {
  const { resumeData, addProject, updateProject, removeProject, reorderProjects } = useResumeStore();
  const { projects = [] } = resumeData;

  // AI Enhance States
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [fullEnhancedText, setFullEnhancedText] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [activeProjId, setActiveProjId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const handleGenerateAI = async (uniqueId: string, description: string, title: string) => {
    if (!description || description.trim().length === 0) {
      setError('Please enter some project description first before enhancing with AI.');
      return;
    }
    try {
      setLoadingId(uniqueId);
      setError('');
      setActiveProjId(uniqueId);

      const response = await fetch('/api/generate-ai-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'project',
          text: description || 'Developed a web application using modern technologies.',
          jobTitle: title || 'Software Developer'
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
    if (activeProjId !== null && fullEnhancedText) {
      updateProject(activeProjId, 'description', fullEnhancedText);
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm mb-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-800">Projects</h3>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {projects.map((proj: Project, index: number) => {
        const uniqueId = proj.id || `proj-${index}-${Date.now()}`;

        return (
          <div key={uniqueId} className="border p-3 rounded-md space-y-2 bg-gray-50 relative">
            <div className="flex justify-between items-center pb-1 border-b border-gray-200 mb-2">
              <span className="text-xs font-semibold text-gray-500">Project #{index + 1}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => reorderProjects(index, 'up')}
                  disabled={index === 0}
                  className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded disabled:opacity-30 hover:bg-gray-300 transition cursor-pointer"
                  title="Move Up"
                >
                  ▲ Up
                </button>
                <button
                  type="button"
                  onClick={() => reorderProjects(index, 'down')}
                  disabled={index === projects.length - 1}
                  className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded disabled:opacity-30 hover:bg-gray-300 transition cursor-pointer"
                  title="Move Down"
                >
                  ▼ Down
                </button>
              </div>
            </div>

            {/* Project Title */}
            <input
              className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
              placeholder="Project Title (e.g. Smart KYC Extractor)"
              value={proj.title || ''}
              onChange={(e) => updateProject(uniqueId, 'title', e.target.value)}
            />

            {/* Description with AI Button */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">Description</span>
                <button
                  type="button"
                  onClick={() => handleGenerateAI(uniqueId, proj.description || '', proj.title || '')}
                  disabled={loadingId === uniqueId}
                  className="px-2.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-medium rounded hover:opacity-90 transition disabled:opacity-50 flex items-center gap-1 shadow-sm cursor-pointer"
                >
                  {loadingId === uniqueId ? 'Enhancing...' : '✨ AI Enhance'}
                </button>
              </div>
              <textarea
                rows={4}
                className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
                placeholder="Project description and key features..."
                value={proj.description || ''}
                onChange={(e) => updateProject(uniqueId, 'description', e.target.value)}
              />
            </div>

            {/* Technologies */}
            <input
              className="w-full border rounded px-3 py-1.5 text-sm bg-white text-black"
              placeholder="Technologies Used (e.g. Python, FastAPI, OpenCV)"
              value={proj.technologies || ''}
              onChange={(e) => updateProject(uniqueId, 'technologies', e.target.value)}
            />

            <button 
              type="button"
              onClick={() => removeProject(uniqueId)} 
              className="text-red-500 text-xs font-medium hover:underline pt-1 block cursor-pointer"
            >
              Remove Project
            </button>
          </div>
        );
      })}

      <button 
        type="button"
        onClick={() => addProject({ id: Date.now().toString(), title: '', technologies: '', description: '' })} 
        className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition cursor-pointer"
      >
        + Add Project
      </button>

      {projects.length === 0 && (
        <p className="text-gray-500 text-sm italic">No projects added yet.</p>
      )}

      {/* AI Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl border border-gray-100">
            <h4 className="text-md font-bold text-gray-900 mb-2">Enhanced Project Bullet Points</h4>
            <p className="text-xs text-gray-500 mb-4">Review the enhanced version of your project description below:</p>
            
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