import { useResumeStore } from '@/store/useResumeStore';

export function LivePreview() {
  const resume = useResumeStore((state) => state.resumeData) || {};

  return (
    <div className="space-y-4">
      {/* Download Button */}
      <div className="flex justify-end">
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium shadow transition-colors"
        >
          Download PDF
        </button>
      </div>

      {/* Resume Preview Box */}
      <div id="resume-preview" className="bg-white shadow-md rounded-lg p-8 h-full overflow-y-auto border">
        {/* Header / Personal Info */}
        <div className="border-b pb-4 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {resume?.personalInfo?.fullName || 'Your Full Name'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {resume?.personalInfo?.email || 'email@example.com'} &bull; {resume?.personalInfo?.phone || 'Phone Number'} &bull; {resume?.personalInfo?.location || 'Location'}
          </p>
        </div>

        {/* Education Section Preview */}
        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-3">
            Education
          </h2>
          {(!resume?.education || resume.education.length === 0) ? (
            <p className="text-sm text-gray-400 italic">Education details will appear here...</p>
          ) : (
            resume.education.map((edu: any) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {edu.degree || 'Degree'}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {edu.year || 'Year'}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-600">{edu.school || 'School / University'}</p>
              </div>
            ))
          )}
        </div>

        {/* Experience Section Preview */}
        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-3">
            Experience
          </h2>
          {(!resume?.experience || resume.experience.length === 0) ? (
            <p className="text-sm text-gray-400 italic">Experience details will appear here...</p>
          ) : (
            resume.experience.map((exp: any) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {exp.role || 'Job Title'}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {exp.startDate} {exp.startDate && exp.endDate ? '-' : ''} {exp.endDate}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-600">{exp.company || 'Company Name'}</p>
              </div>
            ))
          )}
        </div>

        {/* Skills Section Preview */}
        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-3">
            Skills
          </h2>
          {(!resume?.skills || resume.skills.length === 0) ? (
            <p className="text-sm text-gray-400 italic">Skills will appear here...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill: string, index: number) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded border">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Projects Section Preview */}
        <div className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600 border-b pb-1 mb-3">
            Projects
          </h2>
          {(!resume?.projects || resume.projects.length === 0) ? (
            <p className="text-sm text-gray-400 italic">Projects will appear here...</p>
          ) : (
            resume.projects.map((proj: any) => (
              <div key={proj.id} className="mb-4">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {proj.title || 'Project Title'}
                </h3>
                <p className="text-xs text-gray-600 mt-1 whitespace-pre-line">
                  {proj.description || 'Project description...'}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}