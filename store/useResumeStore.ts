import { create } from 'zustand';

export interface ResumeData {
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    institution: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
  }>;
  templateId: string;
}

interface ResumeState {
  resumeData: ResumeData;
  updatePersonalInfo: (field: string, value: string) => void;
  updateSummary: (summary: string) => void;
  
  // Experience actions
  addExperience: (exp: { company: string; position: string; startDate: string; endDate: string; description: string }) => void;
  updateExperience: (id: string, field: string, value: string) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (index: number, direction: 'up' | 'down') => void;

  // Education actions
  addEducation: (edu: { degree: string; institution: string; year: string }) => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (index: number, direction: 'up' | 'down') => void;

  setSkills: (skills: string[]) => void;
  
  // Project actions
  addProject: (project: { name: string; description: string; technologies: string[] }) => void;
  updateProject: (id: string, field: string, value: any) => void;
  removeProject: (id: string) => void;
  reorderProjects: (index: number, direction: 'up' | 'down') => void;

  setTemplate: (templateId: string) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resumeData: {
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
    },
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
    templateId: 'modern',
  },
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

  addExperience: (exp) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: [...state.resumeData.experience, { ...exp, id: Date.now().toString() }],
      },
    })),
  updateExperience: (id, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        experience: state.resumeData.experience.filter((item) => item.id !== id),
      },
    })),
  reorderExperience: (index, direction) =>
    set((state) => {
      const list = [...state.resumeData.experience];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return state;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return {
        resumeData: { ...state.resumeData, experience: list },
      };
    }),

  addEducation: (edu) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: [...state.resumeData.education, { ...edu, id: Date.now().toString() }],
      },
    })),
  updateEducation: (id, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        education: state.resumeData.education.filter((item) => item.id !== id),
      },
    })),
  reorderEducation: (index, direction) =>
    set((state) => {
      const list = [...state.resumeData.education];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return state;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return {
        resumeData: { ...state.resumeData, education: list },
      };
    }),

  setSkills: (skills) =>
    set((state) => ({
      resumeData: { ...state.resumeData, skills },
    })),

  addProject: (proj) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: [...state.resumeData.projects, { ...proj, id: Date.now().toString() }],
      },
    })),
  updateProject: (id, field, value) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      },
    })),
  removeProject: (id) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        projects: state.resumeData.projects.filter((item) => item.id !== id),
      },
    })),
  reorderProjects: (index, direction) =>
    set((state) => {
      const list = [...state.resumeData.projects];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return state;
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;
      return {
        resumeData: { ...state.resumeData, projects: list },
      };
    }),

  setTemplate: (templateId) =>
    set((state) => ({
      resumeData: { ...state.resumeData, templateId },
    })),
}));