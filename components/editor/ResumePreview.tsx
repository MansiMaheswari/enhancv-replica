'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function ResumePreview() {
  const { resumeData, setTemplate } = useResumeStore();
  const { personalInfo, summary, experience, education, skills, projects, templateId } = resumeData;

  return (
    <div className="space-y-4">
      {/* Template Switcher Toolbar */}
      <div className="flex justify-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200 print:hidden">
        <span className="text-xs font-semibold text-gray-500 self-center mr-2">Template:</span>
        <button
          onClick={() => setTemplate('modern')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
            templateId === 'modern'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Modern
        </button>
        <button
          onClick={() => setTemplate('classic')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
            templateId === 'classic'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          Classic
        </button>
      </div>

      {/* Render Selected Template */}
      {templateId === 'classic' ? (
        // --- CLASSIC TEMPLATE (Left-aligned, formal layout) ---
        <div className="bg-white p-8 shadow-lg rounded-xl border border-gray-200 max-w-2xl mx-auto text-gray-900 font-serif min-h-[800px]">
          {/* Header */}
          <div className="border-b-2 border-gray-900 pb-3 mb-6">
            <h1 className="text-3xl font-bold tracking-wide uppercase">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-md font-semibold text-gray-700 mt-0.5">
              {personalInfo.jobTitle || 'Job Title'}
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-600 mt-2">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>| {personalInfo.phone}</span>}
              {personalInfo.location && <span>| {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
            </div>
          </div>

          {/* Summary */}
          {summary && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm leading-relaxed">{summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Professional Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between font-semibold text-sm">
                      <span>{exp.position} - {exp.company}</span>
                      <span className="text-xs text-gray-600">{exp.startDate} to {exp.endDate}</span>
                    </div>
                    {exp.description && <p className="text-xs mt-1 leading-normal">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between text-sm">
                    <div>
                      <span className="font-semibold">{edu.degree}</span> - <span>{edu.institution}</span>
                    </div>
                    <span className="text-xs text-gray-600">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && skills[0] !== '' && (
            <div className="mb-5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Skills
              </h2>
              <p className="text-xs">{skills.join(', ')}</p>
            </div>
          )}

          {/* Projects (Classic Template) */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-1 mb-2">
                Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-semibold text-sm">{proj.name}</h3>
                    {proj.description && <p className="text-xs mt-0.5">{proj.description}</p>}
                    {proj.technologies && proj.technologies.length > 0 && proj.technologies[0] !== '' && (
                      <p className="text-xs text-gray-600 italic mt-0.5">
                        Technologies: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

         
        </div>
      ) : (
        // --- MODERN TEMPLATE (Centered header, colored badges) ---
        <div className="bg-white p-8 shadow-lg rounded-xl border border-gray-200 max-w-2xl mx-auto text-gray-800 font-sans min-h-[800px]">
          <div className="text-center border-b pb-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {personalInfo.fullName || 'Your Full Name'}
            </h1>
            <p className="text-lg font-medium text-blue-600 mt-1">
              {personalInfo.jobTitle || 'Job Title'}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 mt-2">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
            </div>
          </div>

          {summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b pb-1 mb-2">
                Professional Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b pb-1 mb-3">
                Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold text-gray-900">{exp.position || 'Position'}</h3>
                      <span className="text-xs text-gray-500">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-blue-600">{exp.company || 'Company Name'}</p>
                    {exp.description && <p className="text-sm text-gray-700 mt-1">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b pb-1 mb-3">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree || 'Degree'}</h3>
                      <p className="text-sm text-gray-600">{edu.institution || 'Institution'}</p>
                    </div>
                    <span className="text-xs text-gray-500">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && skills[0] !== '' && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b pb-1 mb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 border-b pb-1 mb-3">
                Projects
              </h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-semibold text-gray-900">{proj.name || 'Project Name'}</h3>
                    {proj.description && <p className="text-sm text-gray-700 mt-0.5">{proj.description}</p>}
                    {proj.technologies && proj.technologies.length > 0 && proj.technologies[0] !== '' && (
                      <p className="text-xs text-blue-600 mt-1">
                        Tech: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}