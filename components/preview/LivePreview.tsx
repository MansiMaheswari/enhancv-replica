'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function LivePreview() {
  const { resumeData } = useResumeStore();
  const personalInfo = resumeData?.personalInfo || {};
  const summary = resumeData?.summary || '';
  const education = resumeData?.education || [];
  const experience = resumeData?.experience || [];
  const projects = resumeData?.projects || [];
  const skills = resumeData?.skills || [];
  const templateId = resumeData?.templateId || 'modern';

  // Helper to parse tech stack
  const parseTechnologies = (techs: any): string[] => {
    if (!techs) return [];
    if (Array.isArray(techs)) {
      return techs.flatMap((t) => (typeof t === 'string' ? t.split(',').map((item) => item.trim()) : t)).filter(Boolean);
    }
    if (typeof techs === 'string') {
      return techs
        .split(/[,]+/)
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    }
    return [];
  };

  // Helper to render bullet points
  const renderBullets = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n').filter((line) => line.trim().length > 0);
    if (lines.length <= 1) {
      return <p className="text-xs text-gray-700 mt-1">{text}</p>;
    }
    return (
      <ul className="list-disc list-inside text-xs text-gray-700 mt-1 space-y-0.5">
        {lines.map((line, idx) => (
          <li key={idx} className="leading-relaxed">
            {line.replace(/^[•\-\*]\s*/, '')}
          </li>
        ))}
      </ul>
    );
  };

  // Render Skills Helper
  const renderSkillsList = (isSerif = false) => {
    if (skills.length === 0) {
      return <p className={`text-xs text-gray-400 italic ${isSerif ? 'font-serif' : ''}`}>Skills will appear here...</p>;
    }
    return (
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill: any, idx: number) => (
          <span key={idx} className={`px-2 py-0.5 text-xs rounded border ${isSerif ? 'bg-gray-100 text-gray-800 border-gray-300 font-serif' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
            {typeof skill === 'string' ? skill : skill.name}
          </span>
        ))}
      </div>
    );
  };

  // Render Project Technologies Helper
  const renderProjectTech = (techs: any, isSerif = false) => {
    const techList = parseTechnologies(techs);
    if (techList.length === 0) return null;
    return (
      <div className="flex flex-wrap gap-1.5 mt-1.5">
        {techList.map((tech, i) => (
          <span key={i} className={`px-2 py-0.5 text-[11px] rounded border ${isSerif ? 'bg-gray-50 text-gray-700 border-gray-300 font-serif' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
            {tech}
          </span>
        ))}
      </div>
    );
  };

  // 1. Modern Template
  const renderModernTemplate = () => (
    <div className="space-y-4 text-sm text-gray-800 font-sans">
      <div className="text-center border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xs font-medium text-blue-600 mt-0.5">{personalInfo.jobTitle || 'Job Title'}</p>
        <div className="flex justify-center gap-3 text-xs text-gray-500 mt-2 flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-2">Summary</h3>
        {summary ? <p className="text-xs text-gray-700 leading-relaxed">{summary}</p> : <p className="text-xs text-gray-400 italic">Summary will appear here...</p>}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-2">Education</h3>
        {education.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Education details will appear here...</p>
        ) : (
          education.map((edu: any, idx: number) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between font-semibold text-gray-900">
                <span>{edu.degree}</span>
                <span className="text-xs text-gray-500">{edu.year || edu.startDate}</span>
              </div>
              <div className="text-xs text-gray-600">{edu.institution || edu.school}</div>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-2">Experience</h3>
        {experience.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Experience details will appear here...</p>
        ) : (
          experience.map((exp: any, idx: number) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between font-semibold text-gray-900">
                <span>{exp.position || exp.role || exp.title}</span>
                <span className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="text-xs text-gray-600 font-medium">{exp.company}</div>
              {renderBullets(exp.description)}
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-2">Skills</h3>
        {renderSkillsList(false)}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-2">Projects</h3>
        {projects.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Projects will appear here...</p>
        ) : (
          projects.map((proj: any, idx: number) => (
            <div key={idx} className="mb-3">
              <div className="font-semibold text-gray-900">{proj.name || proj.title || 'Project Title'}</div>
              {renderBullets(proj.description)}
              {renderProjectTech(proj.technologies, false)}
            </div>
          ))
        )}
      </div>
    </div>
  );

  // 2. Classic Template
  const renderClassicTemplate = () => (
    <div className="space-y-4 text-sm text-gray-900 font-serif">
      <div className="border-b-2 border-gray-900 pb-3">
        <h1 className="text-2xl font-bold tracking-wide">{personalInfo.fullName || 'Your Full Name'}</h1>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-700 mt-0.5">{personalInfo.jobTitle || 'Job Title'}</p>
        <div className="flex gap-3 text-xs text-gray-600 mt-2 flex-wrap">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.location && <span>| {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>| {personalInfo.linkedin}</span>}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">Summary</h3>
        {summary ? <p className="text-xs text-gray-800 leading-relaxed">{summary}</p> : <p className="text-xs text-gray-400 italic">Summary will appear here...</p>}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">Education</h3>
        {education.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Education details will appear here...</p>
        ) : (
          education.map((edu: any, idx: number) => (
            <div key={idx} className="mb-2">
              <div className="flex justify-between font-bold">
                <span>{edu.degree}</span>
                <span className="text-xs font-normal">{edu.year || edu.startDate}</span>
              </div>
              <div className="text-xs italic text-gray-700">{edu.institution || edu.school}</div>
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">Experience</h3>
        {experience.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Experience details will appear here...</p>
        ) : (
          experience.map((exp: any, idx: number) => (
            <div key={idx} className="mb-3">
              <div className="flex justify-between font-bold">
                <span>{exp.position || exp.role || exp.title} — <span className="font-normal italic">{exp.company}</span></span>
                <span className="text-xs">{exp.startDate} - {exp.endDate}</span>
              </div>
              {renderBullets(exp.description)}
            </div>
          ))
        )}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">Skills</h3>
        {renderSkillsList(true)}
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-900 border-b border-gray-400 pb-0.5 mb-1.5">Projects</h3>
        {projects.length === 0 ? (
          <p className="text-xs text-gray-400 italic">Projects will appear here...</p>
        ) : (
          projects.map((proj: any, idx: number) => (
            <div key={idx} className="mb-3">
              <div className="font-bold">{proj.name || proj.title}</div>
              {renderBullets(proj.description)}
              {renderProjectTech(proj.technologies, true)}
            </div>
          ))
        )}
      </div>
    </div>
  );

  // 3. Minimalist Template (Updated with LinkedIn & Dates)
  const renderMinimalistTemplate = () => {
    const contactLine = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).join(' | ');
    return (
      <div className="space-y-5 text-sm font-mono text-gray-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-xs text-gray-700 font-semibold mt-0.5">{personalInfo.jobTitle || 'Job Title'}</p>
          {contactLine && <p className="text-xs text-gray-500 mt-1">{contactLine}</p>}
        </div>
        <div className="border-t pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-1">Summary</h2>
          {summary ? <p className="text-xs text-gray-700">{summary}</p> : <p className="text-xs text-gray-400 italic">Summary will appear here...</p>}
        </div>
        <div className="border-t pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-1">Education</h2>
          {education.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Education details will appear here...</p>
          ) : (
            education.map((edu: any, idx: number) => (
              <div key={idx} className="mb-2 text-xs flex justify-between">
                <span className="font-bold">{edu.degree} - {edu.institution || edu.school}</span>
                <span className="text-gray-500">{edu.year || edu.startDate}</span>
              </div>
            ))
          )}
        </div>
        <div className="border-t pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2">Experience</h2>
          {experience.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Experience details will appear here...</p>
          ) : (
            experience.map((exp: any, idx: number) => (
              <div key={idx} className="mb-3">
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.position || exp.role || exp.title} @ {exp.company}</span>
                  <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                {renderBullets(exp.description)}
              </div>
            ))
          )}
        </div>
        <div className="border-t pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2">Skills</h2>
          {renderSkillsList()}
        </div>
        <div className="border-t pt-3">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2">Projects</h2>
          {projects.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Projects will appear here...</p>
          ) : (
            projects.map((proj: any, idx: number) => (
              <div key={idx} className="mb-3">
                <div className="font-bold text-xs">{proj.name || proj.title}</div>
                {renderBullets(proj.description)}
                {renderProjectTech(proj.technologies)}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // 4. Professional Template (Updated with LinkedIn & Dates)
  const renderProfessionalTemplate = () => {
    const contactLine = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).join(' • ');
    return (
      <div className="space-y-4 text-sm text-slate-800 border-l-4 border-slate-700 pl-4 font-sans">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 uppercase">{personalInfo.fullName || 'Your Full Name'}</h1>
          <p className="text-xs text-slate-600 font-semibold">{personalInfo.jobTitle || 'Job Title'}</p>
          {contactLine && <p className="text-xs text-slate-500 mt-0.5">{contactLine}</p>}
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1 mb-2">Summary</h3>
          {summary ? <p className="text-xs text-slate-700">{summary}</p> : <p className="text-xs text-gray-400 italic">Summary will appear here...</p>}
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1 mb-2">Education</h3>
          {education.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Education details will appear here...</p>
          ) : (
            education.map((edu: any, idx: number) => (
              <div key={idx} className="mb-2 text-xs font-medium flex justify-between">
                <span>{edu.degree} - {edu.institution || edu.school}</span>
                <span className="text-slate-500">{edu.year || edu.startDate}</span>
              </div>
            ))
          )}
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1 mb-2">Experience</h3>
          {experience.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Work history will appear here...</p>
          ) : (
            experience.map((exp: any, idx: number) => (
              <div key={idx} className="mb-2">
                <div className="flex justify-between font-bold text-xs">
                  <span>{exp.position || exp.role || exp.title} ({exp.company})</span>
                  <span className="text-slate-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                {renderBullets(exp.description)}
              </div>
            ))
          )}
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1 mb-2">Skills</h3>
          {renderSkillsList()}
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 bg-slate-100 p-1 mb-2">Projects</h3>
          {projects.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Projects will appear here...</p>
          ) : (
            projects.map((proj: any, idx: number) => (
              <div key={idx} className="mb-2">
                <div className="font-bold">{proj.name || proj.title}</div>
                {renderBullets(proj.description)}
                {renderProjectTech(proj.technologies)}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  // 5. Compact Template (Updated with LinkedIn & Dates)
  const renderCompactTemplate = () => {
    const rightContact = [personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).join(' | ');
    return (
      <div className="space-y-3 text-xs text-gray-900 font-sans">
        <div className="flex justify-between items-baseline border-b-2 border-black pb-1">
          <div>
            <h1 className="text-lg font-bold">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-gray-600">{personalInfo.jobTitle || 'Job Title'}</p>
          </div>
          {rightContact && (
            <div className="text-right text-[10px] text-gray-500 max-w-[250px]">
              <p>{rightContact}</p>
            </div>
          )}
        </div>
        <div>
          <h2 className="font-bold uppercase border-b mb-1">Summary</h2>
          {summary ? <p className="text-gray-700">{summary}</p> : <p className="text-xs text-gray-400 italic">Summary will appear here...</p>}
        </div>
        <div>
          <h2 className="font-bold uppercase border-b mb-1">Education</h2>
          {education.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Education details will appear here...</p>
          ) : (
            education.map((edu: any, idx: number) => (
              <div key={idx} className="mb-1 flex justify-between">
                <span><span className="font-semibold">{edu.degree}</span> - {edu.institution || edu.school}</span>
                <span className="text-gray-500">{edu.year || edu.startDate}</span>
              </div>
            ))
          )}
        </div>
        <div>
          <h2 className="font-bold uppercase border-b mb-1">Experience</h2>
          {experience.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Experience details will appear here...</p>
          ) : (
            experience.map((exp: any, idx: number) => (
              <div key={idx} className="mb-1.5">
                <div className="flex justify-between">
                  <span><span className="font-semibold">{exp.position || exp.role || exp.title}</span> - <span className="italic">{exp.company}</span></span>
                  <span className="text-gray-500">{exp.startDate} - {exp.endDate}</span>
                </div>
                {renderBullets(exp.description)}
              </div>
            ))
          )}
        </div>
        <div>
          <h2 className="font-bold uppercase border-b mb-1">Skills</h2>
          {renderSkillsList()}
        </div>
        <div>
          <h2 className="font-bold uppercase border-b mb-1">Projects</h2>
          {projects.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Projects will appear here...</p>
          ) : (
            projects.map((proj: any, idx: number) => (
              <div key={idx} className="mb-1.5">
                <span className="font-semibold">{proj.name || proj.title}</span>
                {renderBullets(proj.description)}
                {renderProjectTech(proj.technologies)}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-md min-h-[500px]">
      {templateId === 'classic' && renderClassicTemplate()}
      {templateId === 'minimalist' && renderMinimalistTemplate()}
      {templateId === 'professional' && renderProfessionalTemplate()}
      {templateId === 'compact' && renderCompactTemplate()}
      {(templateId === 'modern' || !['classic', 'minimalist', 'professional', 'compact'].includes(templateId)) && renderModernTemplate()}
    </div>
  );
}