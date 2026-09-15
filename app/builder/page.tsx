'use client';

import React from 'react';
import { ExperienceSection } from '@/components/editor/ExperienceSection';
import { EducationSection } from '@/components/editor/EducationSection';
import { SkillsSection } from '@/components/editor/SkillsSection';
import { ProjectsSection } from '@/components/editor/ProjectSection';
import { LivePreview } from '@/components/preview/LivePreview';
import { useResumeStore } from '@/store/useResumeStore';

export default function BuilderPage() {
  const { resume, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resume;

  
  const handleSaveResume = async () => {
    try {
      const response = await fetch("https://enhancv-replica.onrender.com/api/resume", {
      
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personalInfo: resume.personalInfo,
          education: resume.education,
          experience: resume.experience,
          skills: resume.skills,
          projects: resume.projects,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Resume saved successfully to backend! 🎉");
        console.log("Backend Response:", result);
      } else {
        alert("Failed to save resume.");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Error connecting to backend.");
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      {/* Left Panel: Resume Editor */}
      <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200 bg-white space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Resume Editor</h2>
          
          {/* Save to Backend Button */}
          <button 
            onClick={handleSaveResume}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm font-medium shadow"
          >
            Save to Backend
          </button>
        </div>
        
        {/* Personal Information */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Your Full Name" 
                value={personalInfo.fullName || ''}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input 
                  type="email" 
                  placeholder="email@example.com" 
                  value={personalInfo.email || ''}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  value={personalInfo.phone || ''}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
              <input 
                type="text" 
                placeholder="City, Country" 
                value={personalInfo.location || ''}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                onChange={(e) => updatePersonalInfo('location', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Education Section */}
        <EducationSection />

        {/* Experience Section */}
        <ExperienceSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />
      </div>

      {/* Right Panel: Live Preview */}
      <div className="w-1/2 p-6 overflow-y-auto bg-gray-50 flex justify-center items-start">
        <div className="w-full max-w-2xl bg-white min-h-[800px] shadow-lg p-8 rounded-md">
          <LiveProviderWrapper />
          <LivePreview />
        </div>
      </div>
    </div>
  );
}


function LiveProviderWrapper() {
  return null;
}