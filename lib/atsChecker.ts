export interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

// Valid Technical & Professional Skills Dictionary for Validation
const VALID_SKILLS_DICTIONARY = new Set([
  'python', 'javascript', 'typescript', 'java', 'c', 'cpp', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust', 'sql', 'mysql', 'postgresql', 'mongodb', 'sqlite',
  'react', 'nextjs', 'next.js', 'vue', 'angular', 'node', 'nodejs', 'express', 'django', 'flask', 'fastapi', 'tailwind', 'bootstrap', 'html', 'css',
  'machine learning', 'deep learning', 'data science', 'tensorflow', 'pytorch', 'opencv', 'easyocr', 'yolov8', 'pandas', 'numpy', 'scikit-learn',
  'git', 'github', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'supabase', 'firebase', 'restapi', 'rest apis', 'graphql', 'linux', 'agile', 'scrum'
]);

export function calculateATSScore(resumeData: any, jobDescription: string = ''): ATSResult {
  if (!resumeData) {
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: ['Please provide resume data to analyze.'],
    };
  }

  const personalInfo = resumeData.personalInfo || {};
  const summary: string = resumeData.summary || '';
  const education = resumeData.education || [];
  const experience = resumeData.experience || [];
  const skills = resumeData.skills || [];
  const projects = resumeData.projects || [];

  const skillsList: string[] = skills.map((s: any) => (typeof s === 'string' ? s : s.name || ''));
  const skillsText: string = skillsList.join(' ');
  const experienceText: string = experience.map((e: any) => `${e.position || ''} ${e.company || ''} ${e.description || ''}`).join(' ');
  const projectsText: string = projects.map((p: any) => `${p.title || ''} ${p.technologies || ''} ${p.description || ''}`).join(' ');

  const fullResumeText = `${personalInfo.fullName || ''} ${personalInfo.jobTitle || ''} ${personalInfo.email || ''} ${personalInfo.phone || ''} ${personalInfo.location || ''} ${summary} ${skillsText} ${experienceText} ${projectsText}`.toLowerCase();

  if (!jobDescription.trim()) {
    let score = 10;
    const suggestions: string[] = [];

    if (personalInfo.fullName && personalInfo.fullName.trim() !== '' && personalInfo.fullName !== 'Your Full Name') {
      score += 8;
    } else {
      suggestions.push('Add your Full Name in Personal Information.');
    }

    if (personalInfo.jobTitle && personalInfo.jobTitle.trim() !== '') {
      score += 8;
    } else {
      suggestions.push('Add your Job Title / Professional Role.');
    }

    if (personalInfo.email && personalInfo.email.trim() !== '' && personalInfo.email !== 'email@example.com') {
      score += 8;
    } else {
      suggestions.push('Add your valid Email address.');
    }

    if (summary.trim() !== '') {
      score += 10;
    } else {
      suggestions.push('Add a professional summary.');
    }

    if (education.length > 0 && education.some((e: any) => e.degree && e.institution)) {
      score += 10;
    } else {
      suggestions.push('Add your education details (Degree and Institution).');
    }

    if (experience.length > 0 && experience.some((ex: any) => ex.position && ex.company)) {
      score += 10;
    } else {
      suggestions.push('Add at least one work experience (Position and Company).');
    }

    // Skills Validation Check
    if (skills.length >= 3) {
      // Check for invalid/meaningless skills
      const invalidSkills = skillsList.filter(sk => sk.trim().length > 0 && !VALID_SKILLS_DICTIONARY.has(sk.toLowerCase().trim()));
      if (invalidSkills.length > 0) {
        score += 5; // Partial score penalty
        suggestions.push(`Review skills: [ ${invalidSkills.join(', ')} ] look like invalid or non-standard technical keywords.`);
      } else {
        score += 10;
      }
    } else {
      suggestions.push('Add at least 3 relevant technical skills.');
    }

    if (projects.length > 0 && projects.some((p: any) => p.title && p.title.trim() !== '')) {
      score += 9;
    } else {
      suggestions.push('Add a Project Title.');
    }

    if (projects.length > 0 && projects.some((p: any) => p.technologies && p.technologies.trim() !== '')) {
      score += 9;
    } else {
      suggestions.push('Add technologies used in your Projects.');
    }

    if (projects.length > 0 && projects.some((p: any) => p.description && p.description.trim() !== '')) {
      score += 10;
    } else {
      suggestions.push('Add a detailed description for your Projects.');
    }

    return {
      score: Math.min(score, 100),
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: suggestions.length > 0 ? suggestions : ['Your resume structure is complete!'],
    };
  }

  // Job Description Mode matching
  const jdKeywords: string[] = jobDescription
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((word: string) => word.length > 2);

  const uniqueJdKeywords: string[] = Array.from(new Set(jdKeywords));
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  uniqueJdKeywords.forEach((kw: string) => {
    if (fullResumeText.includes(kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const matchRatio = uniqueJdKeywords.length > 0 ? matchedKeywords.length / uniqueJdKeywords.length : 1;
  const score = Math.round(matchRatio * 100);

  const suggestions: string[] = [];
  if (missingKeywords.length > 0) {
    suggestions.push(`Missing JD keywords: Consider adding [ ${missingKeywords.slice(0, 5).join(', ')} ] to your resume.`);
  } else {
    suggestions.push('Great job! Your resume matches the requirements.');
  }

  return {
    score,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
}