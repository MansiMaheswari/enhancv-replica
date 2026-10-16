'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function LivePreview() {
  const { resumeData } = useResumeStore();
  const personalInfo = resumeData?.personalInfo || {};
  const summary = resumeData?.summary || '';
  const education = resumeData?.education || [];
  const experience = resumeData?.experience || [];
  const skills = resumeData?.skills || [];
  const projects = resumeData?.projects || [];
  const templateId = resumeData?.templateId || 'modern';

  // Helper to format dates nicely
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const parts = dateStr.split(/[\/\-]/);
    if (parts.length === 3) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let monthIndex = parseInt(parts[1], 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        return `${months[monthIndex]} ${parts[2] || parts[0]}`;
      }
    }
    return dateStr;
  };

  // Helper function to render descriptions as bullet points
  const renderBulletPoints = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n').filter((line) => line.trim() !== '');
    if (lines.length <= 1) {
      return <p className="text-gray-600 mt-0.5">{text}</p>;
    }
    return (
      <ul className="list-disc list-inside space-y-0.5 text-gray-600 mt-0.5">
        {lines.map((line, idx) => (
          <li key={idx}>{line.replace(/^[•\-\*]\s*/, '')}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full text-gray-800 font-sans">
      {/* --- TEMPLATE 1: MODERN --- */}
      {templateId === 'modern' && (
        <div className="space-y-5 bg-white">
          <div className="text-center border-b pb-4 border-gray-200">
            <h1 className="text-3xl font-extrabold text-gray-900">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-sm font-semibold text-blue-600 mt-1">{personalInfo.jobTitle || 'Job Title'}</p>
            <div className="flex justify-center items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mt-2">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && (
                <span>• <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{personalInfo.linkedin}</a></span>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-blue-200 pb-1 mb-1">Summary</h3>
            <p className="text-xs text-gray-600 leading-relaxed">{summary || 'Summary will appear here...'}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-blue-200 pb-1 mb-1">Education</h3>
            {education.length > 0 ? (
              <div className="space-y-2">
                {education.map((edu: any, index: number) => (
                  <div key={index} className="text-xs">
                    <div className="flex justify-between font-semibold text-gray-800">
                      <span>{edu.degree}{edu.degree && edu.institution ? ' — ' : ''}{edu.institution}</span>
                      <span className="text-gray-500">{edu.graduationDate}</span>
                    </div>
                    {renderBulletPoints(edu.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Education details...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-blue-200 pb-1 mb-1">Experience</h3>
            {experience.length > 0 ? (
              <div className="space-y-3">
                {experience.map((exp: any, index: number) => (
                  <div key={index} className="text-xs">
                    {(exp.position || exp.company) && (
                      <div className="flex justify-between font-semibold text-gray-800">
                        <span>
                          {exp.position}
                          {exp.position && exp.company ? ' at ' : ''}
                          {exp.company}
                        </span>
                        <span className="text-gray-500">
                          {exp.startDate ? formatDate(exp.startDate) : ''}
                          {exp.startDate && (exp.endDate || exp.startDate) ? ' - ' : ''}
                          {exp.endDate ? formatDate(exp.endDate) : (exp.startDate ? 'Present' : '')}
                        </span>
                      </div>
                    )}
                    {renderBulletPoints(exp.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Experience details...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-blue-200 pb-1 mb-1">Skills</h3>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {skills.map((skill: any, index: number) => (
                  <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2.5 py-0.5 rounded border border-blue-100 font-medium">
                    {typeof skill === 'string' ? skill : skill.name}
                  </span>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Skills...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 border-b border-blue-200 pb-1 mb-1">Projects</h3>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((proj: any, index: number) => (
                  <div key={index} className="text-xs">
                    <div className="flex justify-between font-semibold text-gray-800">
                      <span>{proj.title}</span>
                      {proj.technologies && <span className="text-blue-600 font-normal">[{proj.technologies}]</span>}
                    </div>
                    {renderBulletPoints(proj.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Projects...</p>}
          </div>
        </div>
      )}

      {/* --- TEMPLATE 2: CLASSIC --- */}
      {templateId === 'classic' && (
        <div className="space-y-5 bg-white font-serif">
          <div className="text-left border-b border-gray-400 pb-3">
            <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-sm text-gray-700 mt-1">{personalInfo.jobTitle || 'Job Title'}</p>
            <div className="text-xs text-gray-600 mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {personalInfo.email && <span>Email: {personalInfo.email}</span>}
              {personalInfo.phone && <span>Phone: {personalInfo.phone}</span>}
              {personalInfo.location && <span>Location: {personalInfo.location}</span>}
              {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-gray-900 border-b border-gray-300 pb-1 mb-1">Summary</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{summary || 'Summary will appear here...'}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-gray-900 border-b border-gray-300 pb-1 mb-1">Education</h3>
            {education.length > 0 ? (
              <div className="space-y-2">
                {education.map((edu: any, i: number) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>{edu.institution}{edu.institution && edu.degree ? ' - ' : ''}{edu.degree}</span>
                      <span className="font-normal text-gray-600">{edu.graduationDate}</span>
                    </div>
                    {renderBulletPoints(edu.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Education details...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-gray-900 border-b border-gray-300 pb-1 mb-1">Experience</h3>
            {experience.length > 0 ? (
              <div className="space-y-3">
                {experience.map((exp: any, i: number) => (
                  <div key={i} className="text-xs">
                    {(exp.company || exp.position) && (
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>{exp.company}{exp.company && exp.position ? ` (${exp.position})` : exp.position}</span>
                        <span className="font-normal text-gray-600">
                          {exp.startDate ? formatDate(exp.startDate) : ''}
                          {exp.startDate && (exp.endDate || exp.startDate) ? ' to ' : ''}
                          {exp.endDate ? formatDate(exp.endDate) : (exp.startDate ? 'Present' : '')}
                        </span>
                      </div>
                    )}
                    {renderBulletPoints(exp.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Experience details...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-gray-900 border-b border-gray-300 pb-1 mb-1">Skills</h3>
            {skills.length > 0 ? (
              <p className="text-xs text-gray-700 mt-1">
                {skills.map((s: any) => (typeof s === 'string' ? s : s.name)).join(', ')}
              </p>
            ) : <p className="text-xs text-gray-400 italic">Skills...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-gray-900 border-b border-gray-300 pb-1 mb-1">Projects</h3>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((p: any, i: number) => (
                  <div key={i} className="text-xs">
                    <b>{p.title}</b> {p.technologies && `(${p.technologies})`}
                    {renderBulletPoints(p.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Projects...</p>}
          </div>
        </div>
      )}

      {/* --- TEMPLATE 3: MINIMALIST --- */}
      {templateId === 'minimalist' && (
        <div className="space-y-5 bg-white font-light">
          <div className="border-l-4 border-black pl-4 py-1">
            <h1 className="text-3xl font-normal text-black">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-xs text-gray-500 tracking-wider uppercase mt-1">{personalInfo.jobTitle || 'Job Title'}</p>
            {(personalInfo.email || personalInfo.phone || personalInfo.location || personalInfo.linkedin) && (
              <div className="text-xs text-gray-500 mt-2 flex flex-wrap gap-2">
                {[personalInfo.email, personalInfo.phone, personalInfo.location, personalInfo.linkedin].filter(Boolean).join(' / ')}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase text-gray-500 border-b border-gray-200 pb-1 mb-1 font-semibold">Profile</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{summary || 'Summary will appear here...'}</p>
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase text-gray-500 border-b border-gray-200 pb-1 mb-1 font-semibold">Education</h3>
            {education.length > 0 ? (
              <div className="space-y-2">
                {education.map((e: any, i: number) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between font-medium text-black">
                      <span>{e.degree}{e.degree && e.institution ? ', ' : ''}{e.institution}</span>
                      <span className="text-gray-400">{e.graduationDate}</span>
                    </div>
                    {renderBulletPoints(e.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Education details...</p>}
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase text-gray-500 border-b border-gray-200 pb-1 mb-1 font-semibold">Experience</h3>
            {experience.length > 0 ? (
              <div className="space-y-3">
                {experience.map((ex: any, i: number) => (
                  <div key={i} className="text-xs">
                    {(ex.position || ex.company) && (
                      <div className="flex justify-between font-medium text-black">
                        <span>{ex.position}{ex.position && ex.company ? ' — ' : ''}{ex.company}</span>
                        <span className="text-gray-400">
                          {ex.startDate ? formatDate(ex.startDate) : ''}
                          {ex.startDate && (ex.endDate || ex.startDate) ? ' - ' : ''}
                          {ex.endDate ? formatDate(ex.endDate) : (ex.startDate ? 'Present' : '')}
                        </span>
                      </div>
                    )}
                    {renderBulletPoints(ex.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Experience details...</p>}
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase text-gray-500 border-b border-gray-200 pb-1 mb-1 font-semibold">Skills</h3>
            {skills.length > 0 ? (
              <div className="text-xs text-gray-700 mt-1">
                {skills.map((s: any) => (typeof s === 'string' ? s : s.name)).join(' • ')}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Skills...</p>}
          </div>

          <div>
            <h3 className="text-xs tracking-widest uppercase text-gray-500 border-b border-gray-200 pb-1 mb-1 font-semibold">Projects</h3>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((pr: any, i: number) => (
                  <div key={i} className="text-xs">
                    <span className="font-medium text-black">{pr.title}</span> {pr.technologies && <span className="text-gray-400">({pr.technologies})</span>}
                    {renderBulletPoints(pr.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Projects...</p>}
          </div>
        </div>
      )}

      {/* --- TEMPLATE 4: PROFESSIONAL --- */}
      {templateId === 'professional' && (
        <div className="space-y-5 bg-white">
          <div className="border-b-2 border-slate-800 pb-3">
            <h1 className="text-3xl font-extrabold tracking-wide text-slate-900">{personalInfo.fullName || 'Your Full Name'}</h1>
            <p className="text-xs text-cyan-700 font-bold uppercase tracking-widest mt-1">{personalInfo.jobTitle || 'Job Title'}</p>
            <div className="text-xs text-slate-600 mt-2 flex flex-wrap gap-x-4 gap-y-1 font-medium">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.location && <span>• {personalInfo.location}</span>}
              {personalInfo.linkedin && <span className="text-cyan-700">• {personalInfo.linkedin}</span>}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider text-cyan-800 uppercase border-b border-cyan-200 pb-1 mb-1">Professional Summary</h3>
            <p className="text-xs text-slate-700 leading-relaxed">{summary || 'Summary will appear here...'}</p>
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider text-cyan-800 uppercase border-b border-cyan-200 pb-1 mb-1">Education</h3>
            {education.length > 0 ? (
              <div className="space-y-2">
                {education.map((e: any, i: number) => (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{e.degree}{e.degree && e.institution ? ' (' : ''}{e.institution}{e.degree && e.institution ? ')' : ''}</span>
                      <span className="text-slate-500 font-normal">{e.graduationDate}</span>
                    </div>
                    {renderBulletPoints(e.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Education details...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider text-cyan-800 uppercase border-b border-cyan-200 pb-1 mb-1">Experience</h3>
            {experience.length > 0 ? (
              <div className="space-y-3">
                {experience.map((ex: any, i: number) => (
                  <div key={i} className="text-xs">
                    {(ex.position || ex.company) && (
                      <div className="flex justify-between font-bold text-slate-800">
                        <span>
                          {ex.position}
                          {ex.position && ex.company ? ' at ' : ''}
                          {ex.company}
                        </span>
                        <span className="text-slate-500 font-normal">
                          {ex.startDate ? formatDate(ex.startDate) : ''}
                          {ex.startDate && (ex.endDate || ex.startDate) ? ' - ' : ''}
                          {ex.endDate ? formatDate(ex.endDate) : (ex.startDate ? 'Present' : '')}
                        </span>
                      </div>
                    )}
                    {renderBulletPoints(ex.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Experience details...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider text-cyan-800 uppercase border-b border-cyan-200 pb-1 mb-1">Skills</h3>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {skills.map((s: any, i: number) => (
                  <span key={i} className="bg-slate-100 text-slate-800 text-xs px-2.5 py-0.5 rounded border border-slate-300 font-medium">
                    {typeof s === 'string' ? s : s.name}
                  </span>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Skills...</p>}
          </div>

          <div>
            <h3 className="text-xs font-bold tracking-wider text-cyan-800 uppercase border-b border-cyan-200 pb-1 mb-1">Projects</h3>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((p: any, i: number) => (
                  <div key={i} className="text-xs">
                    <span className="font-bold text-slate-800">{p.title}</span> {p.technologies && <span className="text-cyan-700">[{p.technologies}]</span>}
                    {renderBulletPoints(p.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Projects...</p>}
          </div>
        </div>
      )}

      {/* --- TEMPLATE 5: COMPACT --- */}
      {templateId === 'compact' && (
        <div className="space-y-4 bg-white text-xs">
          <div className="flex justify-between items-baseline border-b pb-2 border-gray-300">
            <h1 className="text-2xl font-bold text-gray-900">{personalInfo.fullName || 'Your Full Name'}</h1>
            <span className="text-gray-600 font-semibold">{personalInfo.jobTitle || 'Job Title'}</span>
          </div>
          <div className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-1">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.location && <span>• {personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="text-blue-600">• {personalInfo.linkedin}</span>}
          </div>

          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider border-b border-gray-200 pb-1 mb-1">Summary</h4>
            <p className="text-gray-600 leading-relaxed">{summary || 'Summary will appear here...'}</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider border-b border-gray-200 pb-1 mb-1">Education</h4>
            {education.length > 0 ? (
              <div className="space-y-2">
                {education.map((e: any, i: number) => (
                  <div key={i} className="text-xs text-gray-700">
                    <div className="flex justify-between font-semibold">
                      <span>{e.degree}{e.degree && e.institution ? ' — ' : ''}{e.institution}</span>
                      <span className="text-gray-500">{e.graduationDate}</span>
                    </div>
                    {renderBulletPoints(e.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Education details...</p>}
          </div>

          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider border-b border-gray-200 pb-1 mb-1">Experience</h4>
            {experience.length > 0 ? (
              <div className="space-y-3">
                {experience.map((ex: any, i: number) => (
                  <div key={i} className="text-xs text-gray-700">
                    {(ex.position || ex.company) && (
                      <div className="flex justify-between font-semibold">
                        <span>{ex.position}{ex.position && ex.company ? ' @ ' : ''}{ex.company}</span>
                        <span className="text-gray-500">
                          {ex.startDate ? formatDate(ex.startDate) : ''}
                          {ex.startDate && (ex.endDate || ex.startDate) ? ' - ' : ''}
                          {ex.endDate ? formatDate(ex.endDate) : (ex.startDate ? 'Present' : '')}
                        </span>
                      </div>
                    )}
                    {renderBulletPoints(ex.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Experience details...</p>}
          </div>

          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider border-b border-gray-200 pb-1 mb-1">Skills</h4>
            {skills.length > 0 ? (
              <p className="text-gray-700 mt-1">
                {skills.map((s: any) => (typeof s === 'string' ? s : s.name)).join(', ')}
              </p>
            ) : <p className="text-xs text-gray-400 italic">Skills...</p>}
          </div>

          <div>
            <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider border-b border-gray-200 pb-1 mb-1">Projects</h4>
            {projects.length > 0 ? (
              <div className="space-y-3">
                {projects.map((p: any, i: number) => (
                  <div key={i} className="text-xs text-gray-700">
                    <span className="font-semibold">{p.title}</span> {p.technologies ? `[${p.technologies}]` : ''}
                    {renderBulletPoints(p.description)}
                  </div>
                ))}
              </div>
            ) : <p className="text-xs text-gray-400 italic">Projects...</p>}
          </div>
        </div>
      )}
    </div>
  );
}