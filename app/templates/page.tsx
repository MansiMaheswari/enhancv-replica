'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function TemplatesPage() {
  const router = useRouter();

  // Kuch sample templates jo aap dikhana chahti hain
  const templates = [
    { id: 'modern', name: 'Modern Template', description: 'Clean layout with blue accents, best for tech and IT roles.' },
    { id: 'professional', name: 'Professional Template', description: 'Traditional structured layout, ideal for corporate jobs.' },
    { id: 'creative', name: 'Creative Template', description: 'Standout design with bold headers for design and creative fields.' },
  ];

  const handleSelectTemplate = (templateId: string) => {
    // Template select hone par builder page par bhej dega
    router.push(`/builder?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Choose a Resume Template</h1>
        <p className="text-gray-600 mb-8">Select a template to start building your professional resume.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((tpl) => (
            <div 
              key={tpl.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="h-40 bg-gray-100 rounded mb-4 flex items-center justify-center text-gray-400 font-medium border border-dashed border-gray-300">
                  {tpl.name} Preview
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{tpl.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tpl.description}</p>
              </div>
              <button
                onClick={() => handleSelectTemplate(tpl.id)}
                className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors"
              >
                Use This Template
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}