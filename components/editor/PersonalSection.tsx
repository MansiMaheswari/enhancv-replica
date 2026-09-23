'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';

export function PersonalSection() {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { personalInfo } = resumeData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updatePersonalInfo(name, value);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={personalInfo.jobTitle}
            onChange={handleChange}
            placeholder="Software Engineer"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={personalInfo.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="+1 234 567 890"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={personalInfo.location}
            onChange={handleChange}
            placeholder="City, Country"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn / Website</label>
          <input
            type="text"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}