'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { PersonalSection } from '@/components/editor/PersonalSection';
import { SummarySection } from '@/components/editor/SummarySection';
import { ExperienceSection } from '@/components/editor/ExperienceSection';
import { EducationSection } from '@/components/editor/EducationSection';
import { SkillsSection } from '@/components/editor/SkillsSection';
import { ProjectsSection } from '@/components/editor/ProjectSection';
import { ResumePreview } from '@/components/editor/ResumePreview';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client directly on the frontend
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qjmansvgtylohrnhylor.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY || 'sb_publishable_Y0syaP3jmDFCCVzlR8-fvg_i_AKbsaU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  const { resumeData } = useResumeStore();

  const handleSave = async () => {
    try {
      console.log('Saving resume data directly to Supabase:', resumeData);
      
      // Direct insert into Supabase 'resumes' table using JSONB 'full_data' column
      const { error } = await supabase
        .from('resumes')
        .insert([{ full_data: resumeData }]);

      if (error) {
        throw error;
      }

      alert('Resume saved successfully to Supabase database!');
    } catch (error: any) {
      console.error('Error saving to Supabase:', error);
      alert('Failed to save: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Bar - print:hidden taaki print karte waqt buttons PDF mein na aayein */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resume Editor v1</h1>
            <p className="text-sm text-gray-600">Fill out your details to generate your professional resume.</p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-sm transition cursor-pointer"
            >
              Save Resume
            </button>
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm transition cursor-pointer"
            >
              Download PDF
            </button>
          </div>
        </div>

        {/* Split Screen Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Editor Panel - print:hidden taaki sirf preview print ho */}
          <div className="lg:col-span-6 space-y-6 print:hidden">
            <PersonalSection />
            <SummarySection />
            <ExperienceSection />
            <EducationSection />
            <SkillsSection />
            <ProjectsSection />
          </div>

          {/* Right Preview Panel */}
          <div className="lg:col-span-6 lg:sticky lg:top-8 w-full">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-md print:border-none print:shadow-none print:p-0">
              <div className="flex justify-between items-center mb-4 pb-2 border-b print:hidden">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                  Live Preview
                </h2>
                <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 font-medium rounded-full">
                  Real-time Sync
                </span>
              </div>
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}