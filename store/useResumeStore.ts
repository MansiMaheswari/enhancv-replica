import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient'; // <-- Yeh line add karni hai

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
}

export interface ResumeState {
  resume: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      location: string;
    };
    experience: Experience[];
    education: Education[];
    skills: string[];
    projects: Project[];
  };
  updatePersonalInfo: (field: string, value: string) => void;
  setExperience: (experience: Experience[]) => void;
  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string) => void;
  removeExperience: (id: string) => void;
  setEducation: (education: Education[]) => void;
  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  removeEducation: (id: string) => void;
  setSkills: (skills: string[]) => void;
  setProjects: (projects: Project[]) => void;
  addProject: () => void;
  updateProject: (id: string, field: string, value: string) => void;
  removeProject: (id: string) => void;
  saveToDatabase: () => Promise<void>; // <-- Yeh naya function declare kiya
}

export const useResumeStore = create<ResumeState>((set, get) => ({
  resume: {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
  },
  updatePersonalInfo: (field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        personalInfo: {
          ...state.resume.personalInfo,
          [field]: value,
        },
      },
    })),
  setExperience: (experience) =>
    set((state) => ({
      resume: { ...state.resume, experience },
    })),
  addExperience: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [
          ...state.resume.experience,
          { id: Date.now().toString(), role: '', company: '', startDate: '', endDate: '' },
        ],
      },
    })),
  updateExperience: (id, field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((exp) =>
          exp.id === id ? { ...exp, [field]: value } : exp
        ),
      },
    })),
  removeExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((exp) => exp.id !== id),
      },
    })),
  setEducation: (education) =>
    set((state) => ({
      resume: { ...state.resume, education },
    })),
  addEducation: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [
          ...state.resume.education,
          { id: Date.now().toString(), school: '', degree: '', year: '' },
        ],
      },
    })),
  updateEducation: (id, field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((edu) =>
          edu.id === id ? { ...edu, [field]: value } : edu
        ),
      },
    })),
  removeEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((edu) => edu.id !== id),
      },
    })),
  setSkills: (skills) =>
    set((state) => ({
      resume: { ...state.resume, skills },
    })),
  setProjects: (projects) =>
    set((state) => ({
      resume: { ...state.resume, projects },
    })),
  addProject: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [
          ...state.resume.projects,
          { id: Date.now().toString(), title: '', description: '' },
        ],
      },
    })),
  updateProject: (id, field, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((proj) =>
          proj.id === id ? { ...proj, [field]: value } : proj
        ),
      },
    })),
  removeProject: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((proj) => proj.id !== id),
      },
    })),

  // --- Yeh naya function data ko Supabase mein save karega ---
  saveToDatabase: async () => {
    const currentState = get();
    const { data, error } = await supabase
      .from('resumes')
      .insert([{ full_data: currentState.resume }]);

    if (error) {
      console.error('Supabase Error:', error.message);
      alert('Error saving resume to database!');
    } else {
      console.log('Saved successfully:', data);
      alert('Resume saved to Supabase successfully!');
    }
  },
}));