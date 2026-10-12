'use client';

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { LivePreview } from '@/components/preview/LivePreview';
import { ExperienceSection } from '@/components/editor/ExperienceSection';
import { EducationSection } from '@/components/editor/EducationSection';
import { SkillsSection } from '@/components/editor/SkillsSection';
import { ProjectsSection } from '@/components/editor/ProjectSection';
import { supabase } from '@/lib/supabaseClient';
import { calculateATSScore } from '@/lib/atsChecker';

export default function HomePage() {
  const { resumeData, updatePersonalInfo, updateSummary, setTemplate } = useResumeStore();
  const personalInfo = resumeData?.personalInfo || {};
  const summary = resumeData?.summary || '';
  const currentTemplate = resumeData?.templateId || 'modern';

  // ATS Score State
  const [atsResult, setAtsResult] = useState<{ score: number; suggestions: string[] }>({
    score: 0,
    suggestions: [],
  });

  const handleCheckATS = () => {
    const result = calculateATSScore(resumeData);
    setAtsResult(result);
  };

  const handleSaveResume = async () => {
    try {
      const { error } = await supabase
        .from('resumes')
        .insert([
          { 
            full_data: resumeData,
          }
        ]);

      if (error) {
        console.error('Supabase Error:', error.message);
        alert('Error saving resume: ' + error.message);
      } else {
        alert('Resume successfully saved to Supabase!');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      alert('Something went wrong while saving.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 max-w-7xl mx-auto gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resume Editor - Week 9 (ATS Checker)</h1>
          <p className="text-sm text-gray-500">Fill out your details and check your ATS compatibility score.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={handleCheckATS}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow transition-all"
          >
            Check ATS Score {atsResult.score > 0 ? `(${atsResult.score}%)` : ''}
          </button>
          <button 
            onClick={handleSaveResume}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow transition-all"
          >
            Save Resume
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow transition-all"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* ATS Score Results Card (Agar score check kiya ho to dikhega) */}
      {atsResult.suggestions.length > 0 && (
        <div className="max-w-7xl mx-auto mb-6 bg-purple-50 border border-purple-200 p-4 rounded-xl print:hidden shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-purple-900">
              ATS Compatibility Score: <span className="text-purple-700 text-base">{atsResult.score}/100</span>
            </h3>
            <span className="text-xs text-purple-600 font-medium">Follow suggestions to boost your score</span>
          </div>
          <ul className="list-disc list-inside text-xs text-purple-800 space-y-1">
            {atsResult.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Main Grid - Responsive for Mobile & Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Left Side: Editor Sections */}
        <div className="col-span-12 lg:col-span-6 space-y-6 print:hidden">
          {/* Personal Info */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text"
                  placeholder="John Doe"
                  value={personalInfo.fullName || ''}
                  onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Job Title</label>
                <input 
                  type="text"
                  placeholder="Software Engineer"
                  value={personalInfo.jobTitle || ''}
                  onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email"
                  placeholder="john@example.com"
                  value={personalInfo.email || ''}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input 
                  type="text"
                  placeholder="+1 234 567 890"
                  value={personalInfo.phone || ''}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                <input 
                  type="text"
                  placeholder="City, Country"
                  value={personalInfo.location || ''}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">LinkedIn URL / Profile</label>
                <input 
                  type="text"
                  placeholder="linkedin.com/in/username"
                  value={personalInfo.linkedin || ''}
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Professional Summary</h2>
            <textarea 
              rows={4}
              placeholder="Write a short professional summary about yourself..."
              value={summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Additional Sections */}
          <EducationSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
        </div>

        {/* Right Side: Live Preview */}
        <div className="col-span-12 lg:col-span-6 space-y-4 w-full lg:w-auto">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm lg:sticky lg:top-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3 flex-wrap gap-2 print:hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                LIVE PREVIEW
              </span>
              
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border text-xs flex-wrap">
                <span className="text-gray-600 font-medium px-1">Template:</span>
                {['modern', 'classic', 'minimalist', 'professional', 'compact'].map((tmpl) => (
                  <button
                    key={tmpl}
                    onClick={() => setTemplate(tmpl)}
                    className={`px-2.5 py-1 rounded-md transition-all text-xs font-medium capitalize ${
                      currentTemplate === tmpl
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tmpl}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[600px] border-0 lg:border rounded-lg p-0 lg:p-4 bg-white shadow-none lg:shadow-inner overflow-auto">
              <LivePreview />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}