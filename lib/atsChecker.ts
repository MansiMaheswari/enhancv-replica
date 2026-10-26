export interface ATSResult {
  score: number;
  keywordsMatchScore: number;
  jobTitleMatchScore: number;
  qualificationsMatchScore: number;
  responsibilitiesMatchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

// Common Stop Words to ignore in ATS Keyword Matching
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'from', 'up', 'down', 'of', 'off', 'over', 'under',
  'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any',
  'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own',
  'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now',
  'looking', 'requirement', 'using', 'used', 'we', 'you', 'your', 'our', 'have', 'has', 'had'
]);

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
      keywordsMatchScore: 0,
      jobTitleMatchScore: 0,
      qualificationsMatchScore: 0,
      responsibilitiesMatchScore: 0,
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

  const fullResumeText = `${personalInfo.fullName || ''} ${personalInfo.jobTitle || ''} ${personalInfo.email || ''} ${personalInfo.phone || ''} ${personalInfo.location || ''} ${personalInfo.linkedin || ''} ${summary} ${skillsText} ${experienceText} ${projectsText}`.toLowerCase();

  // Comprehensive Structural Checks
  const getStructuralChecks = () => {
    let penalty = 0;
    const commonSuggestions: string[] = [];

    if (!personalInfo.fullName || personalInfo.fullName.trim() === '' || personalInfo.fullName === 'Your Full Name') {
      penalty += 10;
      commonSuggestions.push('Add your Full Name in Personal Info.');
    }

    if (!personalInfo.jobTitle || personalInfo.jobTitle.trim() === '') {
      penalty += 15;
      commonSuggestions.push('Job Title is missing! Add your target role in Personal Info.');
    }

    if (!personalInfo.email || personalInfo.email.trim() === '' || personalInfo.email === 'email@example.com') {
      penalty += 10;
      commonSuggestions.push('Add a valid Email address.');
    }

    if (!personalInfo.phone || personalInfo.phone.trim() === '') {
      penalty += 10;
      commonSuggestions.push('Phone number is missing! Add your contact number.');
    }

    if (!personalInfo.location || personalInfo.location.trim() === '') {
      penalty += 5;
      commonSuggestions.push('Location is missing! Add your city/location.');
    }

    if (!personalInfo.linkedin || personalInfo.linkedin.trim() === '') {
      penalty += 5;
      commonSuggestions.push('LinkedIn URL is missing! Add your professional profile link.');
    }

    if (!summary || summary.trim() === '') {
      penalty += 10;
      commonSuggestions.push('Add a professional summary to improve keyword matching.');
    }

    if (!education.length || !education.some((e: any) => e.degree && e.institution)) {
      penalty += 10;
      commonSuggestions.push('Add your Education details (Degree and Institution).');
    }

    if (skills.length < 3) {
      penalty += 10;
      commonSuggestions.push('Add at least 3 relevant technical skills.');
    }

    if (!projects.length || !projects.some((p: any) => p.title && p.title.trim() !== '')) {
      penalty += 10;
      commonSuggestions.push('Add at least one Project with a title and description.');
    }

    return { penalty, commonSuggestions };
  };

  // Sub-scores calculation for UI Cards
  const jobTitleMatchScore = personalInfo.jobTitle && personalInfo.jobTitle.trim() !== '' ? 100 : 0;
  const qualificationsMatchScore = education.length > 0 && skills.length >= 3 ? 100 : 50;
  const responsibilitiesMatchScore = experience.length > 0 || projects.length > 0 ? 100 : 40;

  // MODE 1: Blank Job Description Mode
  if (!jobDescription.trim()) {
    let score = 100;
    const { penalty, commonSuggestions } = getStructuralChecks();
    score = Math.max(0, score - penalty);

    return {
      score,
      keywordsMatchScore: 100,
      jobTitleMatchScore,
      qualificationsMatchScore,
      responsibilitiesMatchScore,
      matchedKeywords: [],
      missingKeywords: [],
      suggestions: commonSuggestions.length > 0 ? commonSuggestions : ['Your resume structure is complete!'],
    };
  }

  // MODE 2: Job Description Matching Mode
  const rawJdKeywords: string[] = jobDescription
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((word: string) => word.length > 2 && !STOP_WORDS.has(word));

  const uniqueJdKeywords: string[] = Array.from(new Set(rawJdKeywords));
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  uniqueJdKeywords.forEach((kw: string) => {
    if (fullResumeText.includes(kw)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const keywordsMatchScore = uniqueJdKeywords.length > 0 ? Math.round((matchedKeywords.length / uniqueJdKeywords.length) * 100) : 100;
  let baseScore = keywordsMatchScore;

  // Apply Structural Deductions
  const { penalty, commonSuggestions } = getStructuralChecks();
  let finalScore = Math.max(0, baseScore - penalty);

  const suggestions: string[] = [...commonSuggestions];

  // Short JD Penalty
  if (uniqueJdKeywords.length < 5) {
    finalScore = Math.min(finalScore, 70);
    suggestions.push('Job Description is too short for complete analysis. Score is capped at 70/100.');
  }

  // Missing Keywords Suggestion
  if (missingKeywords.length > 0) {
    suggestions.push(`Missing JD keywords: Consider adding [ ${missingKeywords.slice(0, 5).join(', ')} ] to your resume.`);
  }

  if (suggestions.length === 0) {
    suggestions.push('Great job! Your resume matches the job requirements perfectly.');
  }

  return {
    score: finalScore,
    keywordsMatchScore,
    jobTitleMatchScore,
    qualificationsMatchScore,
    responsibilitiesMatchScore,
    matchedKeywords,
    missingKeywords,
    suggestions,
  };
}