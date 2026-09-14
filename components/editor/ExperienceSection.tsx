import { useResumeStore } from '@/store/useResumeStore';

export function ExperienceSection() {
  const { resume, addExperience, updateExperience, removeExperience } = useResumeStore();

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-lg text-gray-800">Experience</h3>
      
      {resume.experience.map((exp) => (
        <div key={exp.id} className="border p-3 rounded-md space-y-2 bg-gray-50">
          <input
            className="w-full border rounded px-3 py-1.5 text-sm"
            placeholder="Job Title (e.g. Software Developer)"
            value={exp.role}
            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
          />
          <input
            className="w-full border rounded px-3 py-1.5 text-sm"
            placeholder="Company Name"
            value={exp.company}
            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
          />
          <div className="flex gap-2">
            <input
              className="w-1/2 border rounded px-3 py-1.5 text-sm"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
            />
            <input
              className="w-1/2 border rounded px-3 py-1.5 text-sm"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
            />
          </div>
          <button 
            onClick={() => removeExperience(exp.id)} 
            className="text-red-500 text-xs font-medium hover:underline pt-1"
          >
            Remove Experience
          </button>
        </div>
      ))}

      <button 
        onClick={addExperience} 
        className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition"
      >
        + Add Experience
      </button>
    </div>
  );
}