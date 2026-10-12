'use client';
export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { ExperienceSection } from '@/components/editor/ExperienceSection';
import { EducationSection } from '@/components/editor/EducationSection';
import { SkillsSection } from '@/components/editor/SkillsSection';
import { ProjectsSection } from '@/components/editor/ProjectSection';
import { LivePreview } from '@/components/preview/LivePreview';
import { useResumeStore, AVAILABLE_TEMPLATES } from '@/store/useResumeStore';
import { calculateATSScore } from '@/lib/atsChecker';

export default function BuilderPage() {
  const router = useRouter();
  const { resumeData, updatePersonalInfo, updateSummary, setResumeData, setTemplate, resetResume } = useResumeStore();
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const personalInfo = resumeData?.personalInfo || {};

  useEffect(() => {
    async function checkUser() {
      setLoadingUser(true);
      resetResume();

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
      } else {
        setUserId(session.user.id);
        await loadUserResume(session.user.id);
      }
      setLoadingUser(false);
    }
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: 'global' });
    } catch (err) {
      console.error("Signout error:", err);
    }

    resetResume();
    
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
  };

  const handleSaveResume = async () => {
    if (!userId) {
      alert("User not authenticated!");
      return;
    }

    try {
      const payload = {
        id: userId,
        full_data: resumeData,
      };

      const { error } = await supabase
        .from('resumes')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.error("Supabase Save Error:", error);
        alert("Failed to save resume: " + error.message);
      } else {
        alert("Resume saved successfully to your account! 🎉");
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Error saving resume.");
    }
  };

  const handleCheckATS = () => {
    const jobDescription = prompt(
      "Paste Job Description (JD) here for Keyword Matching:\n(Or leave blank for format/completeness check only)"
    ) || '';

    const result = calculateATSScore(resumeData, jobDescription);

    let matchInfo = '';
    if (jobDescription.trim() !== '') {
      matchInfo = `\n\n🎯 Matched Keywords (${result.matchedKeywords.length}): ${result.matchedKeywords.slice(0, 5).join(', ')}\n❌ Missing Keywords (${result.missingKeywords.length}): ${result.missingKeywords.slice(0, 5).join(', ')}`;
    }

    const suggestionsText = result.suggestions.length > 0 
      ? result.suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')
      : "Great job! Your resume looks fully optimized for ATS.";
    
    alert(`📊 ATS Compatibility Score: ${result.score}/100${matchInfo}\n\n💡 Suggestions:\n${suggestionsText}`);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const loadUserResume = async (currentUserId: string) => {
    resetResume();

    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('full_data')
        .eq('id', currentUserId)
        .single();

      if (error || !data || !data.full_data) {
        console.log("No existing resume found for this user, starting fresh.");
        resetResume();
        return;
      }

      setResumeData(data.full_data);
    } catch (error) {
      console.error("Error loading resume:", error);
      resetResume();
    }
  };

  if (loadingUser) {
    return <div className="flex h-screen items-center justify-center">Loading workspace...</div>;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-200 bg-white space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Resume Editor</h2>
          
          <div className="flex gap-2">
            <button 
              type="button"
              onClick={handleCheckATS}
              className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700 transition text-sm font-medium shadow"
            >
              Check ATS Score
            </button>
            <button 
              type="button"
              onClick={handleDownloadPDF}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition text-sm font-medium shadow cursor-pointer"
            >
              Download PDF
            </button>
            <button 
              type="button"
              onClick={handleSaveResume}
              className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition text-sm font-medium shadow"
            >
              Save Resume
            </button>
            <button 
              type="button"
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition text-sm font-medium shadow"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <label className="block text-sm font-semibold text-blue-900 mb-2">Select Resume Template</label>
          <select
            value={resumeData?.templateId || 'modern'}
            onChange={(e) => setTemplate(e.target.value as any)}
            className="w-full p-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white font-medium"
          >
            {AVAILABLE_TEMPLATES.map((tmpl) => (
              <option key={tmpl.id} value={tmpl.id}>
                {tmpl.name} - {tmpl.description}
              </option>
            ))}
          </select>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Personal Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Software Engineer" 
                  value={personalInfo.jobTitle || ''}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  onChange={(e) => updatePersonalInfo('jobTitle', e.target.value)}
                />
              </div>
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
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn URL</label>
                <input 
                  type="text" 
                  placeholder="linkedin.com/in/username" 
                  value={personalInfo.linkedin || ''}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
                  onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Professional Summary</h3>
          <textarea
            rows={4}
            placeholder="Write a brief summary about yourself..."
            value={resumeData?.summary || ''}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-white"
            onChange={(e) => updateSummary(e.target.value)}
          />
        </div>

        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
      </div>

      <div className="w-1/2 p-6 overflow-y-auto bg-gray-50 flex justify-center items-start">
        <div id="resume-preview" className="w-full max-w-2xl bg-white min-h-[800px] shadow-lg p-8 rounded-md">
          <LivePreview />
        </div>
      </div>
    </div>
  );
}