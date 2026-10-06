import { create } from 'zustand';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  graduationDate: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string;
  link?: string;
}

export interface ResumeData {
  templateId: string;
  personalInfo: {
    fullName?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
  summary?: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects: Project[];
}

interface ResumeStore {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  updatePersonalInfo: (field: string, value: string) => void;
  updateSummary: (summary: string) => void;
  setTemplate: (templateId: string) => void;
  
  // Education Methods
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, field: keyof Education, value: string) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (index: number, direction: 'up' | 'down') => void;

  // Experience Methods
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, field: keyof Experience, value: string) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (index: number, direction: 'up' | 'down') => void;

  // Skills Methods
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;

  // Project Methods
  addProject: (proj: Project) => void;
  updateProject: (id: string, field: keyof Project, value: string) => void;
  removeProject: (id: string) => void;
  reorderProjects: (index: number, direction: 'up' | 'down') => void;
  
  resetResume: () => void;
}

const initialResumeData: ResumeData = {
  templateId: 'modern',
  personalInfo: {},
  summary: '',
  education: [],
  experience: [],
  skills: [],
  projects: [],
};

export const AVAILABLE_TEMPLATES = [
  { id: 'modern', name: 'Modern Clean', description: 'A sleek, contemporary layout for tech roles.' },
  { id: 'classic', name: 'Classic Professional', description: 'Traditional and structured format.' },
  { id: 'minimalist', name: 'Minimalist', description: 'Clean and simple design focused on content.' },
  { id: 'professional', name: 'Professional', description: 'Structured layout ideal for professional roles.' },
  { id: 'compact', name: 'Compact', description: 'Space-saving single-page layout.' },
];

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialResumeData,

  setResumeData: (data) => set({ resumeData: data }),

  updatePersonalInfo: (field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        personalInfo: {
          ...state.resumeData.personalInfo,
          [field]: value,
        },
      },
    })),

  updateSummary: (summary) =>
    set((state) => ({
      resumeData: { ...state.resumeData, summary },
    })),

  setTemplate: (templateId) =>
    set((state) => ({
      resumeData: { ...state.resumeData, templateId },
    })),

  // Education Actions
  addEducation: (edu) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [...state.resumeData.education, edu],
      },
    })),

  updateEducation: (id, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((edu) =>
          edu.id === id ? { ...edu, [field]: value } : edu
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((e) => e.id !== id),
      },
    })),

  reorderEducation: (index, direction) =>
    set((state) => {
      const education = [...state.resumeData.education];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= education.length) return state;
      const [movedItem] = education.splice(index, 1);
      education.splice(targetIndex, 0, movedItem);
      return {
        resumeData: { ...state.resumeData, education },
      };
    }),

  // Experience Actions
  addExperience: (exp) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [...state.resumeData.experience, exp],
      },
    })),

  updateExperience: (id, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((e) => e.id !== id),
      },
    })),

  reorderExperience: (index, direction) =>
    set((state) => {
      const experience = [...state.resumeData.experience];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= experience.length) return state;
      const [movedItem] = experience.splice(index, 1);
      experience.splice(targetIndex, 0, movedItem);
      return {
        resumeData: { ...state.resumeData, experience },
      };
    }),

  // Skills Actions
  addSkill: (skill) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: [...state.resumeData.skills, skill],
      },
    })),

  removeSkill: (skillToRemove) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills: state.resumeData.skills.filter((s) => s !== skillToRemove),
      },
    })),

  // Project Actions
  addProject: (proj) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [...state.resumeData.projects, proj],
      },
    })),

  updateProject: (id, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((proj) =>
          proj.id === id ? { ...proj, [field]: value } : proj
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((p) => p.id !== id),
      },
    })),

  reorderProjects: (index, direction) =>
    set((state) => {
      const projects = [...state.resumeData.projects];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= projects.length) return state;
      const [movedItem] = projects.splice(index, 1);
      projects.splice(targetIndex, 0, movedItem);
      return {
        resumeData: { ...state.resumeData, projects },
      };
    }),

  resetResume: () => set({ resumeData: initialResumeData }),
}));