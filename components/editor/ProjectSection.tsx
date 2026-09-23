'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function ProjectsSection() {
  const { resumeData, addProject, updateProject, removeProject, reorderProjects } = useResumeStore();
  const { projects } = resumeData;

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm mb-6">
      <h3 className="font-semibold text-lg text-gray-800">Projects</h3>
      
      {projects.map((proj, index) => (
        <div key={proj.id} className="border p-3 rounded-md space-y-2 bg-gray-50 relative">
          {/* Reorder and Card Header Controls */}
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

          <input
            className="w-full border rounded px-3 py-1.5 text-sm bg-white"
            placeholder="Project Name"
            value={proj.name}
            onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
          />
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-gray-700">Description</label>
            </div>
            <textarea
              className="w-full border rounded px-3 py-1.5 text-sm bg-white"
              placeholder="Brief description of the project..."
              rows={3}
              value={proj.description}
              onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
            />
          </div>

          <input
            className="w-full border rounded px-3 py-1.5 text-sm bg-white"
            placeholder="Technologies (comma separated, e.g. Python, FastAPI, React)"
            value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
            onChange={(e) => 
              updateProject(
                proj.id, 
                'technologies', 
                e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
              )
            }
          />

          <button 
            type="button"
            onClick={() => removeProject(proj.id)} 
            className="text-red-500 text-xs font-medium hover:underline pt-1 block cursor-pointer"
          >
            Remove Project
          </button>
        </div>
      ))}

      <button 
        type="button"
        onClick={() => addProject({ name: '', description: '', technologies: [] })} 
        className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition cursor-pointer"
      >
        + Add Project
      </button>

      {projects.length === 0 && (
        <p className="text-gray-500 text-sm italic">No projects added yet.</p>
      )}
    </div>
  );
}