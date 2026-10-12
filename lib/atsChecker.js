// lib/atsChecker.js

export function calculateATSScore(resumeData, jobDescription = '') {
  let score = 0;
  const suggestions = [];
  const matchedKeywords = [];
  const missingKeywords = [];

  if (!resumeData) {
    return {
      score: 0,
      suggestions: ['Resume data is completely empty.'],
      matchedKeywords: [],
      missingKeywords: [],
    };
  }

  const personalInfo = resumeData.personalInfo || {};
  const summary = resumeData.summary || '';
  const education = resumeData.education || [];
  const experience = resumeData.experience || [];
  const skills = resumeData.skills || [];
  const projects = resumeData.projects || [];

  // --- 1. Base Structure & Formatting Checks (Max 60 points) ---
  if (personalInfo.fullName && personalInfo.fullName.trim() !== '') score += 10;
  else suggestions.push('Add your full name.');

  if (personalInfo.email && personalInfo.email.includes('@')) score += 10;
  else suggestions.push('Add a valid email address.');

  if (personalInfo.phone && personalInfo.phone.trim().length >= 10) score += 5;
  else suggestions.push('Provide a valid phone number.');

  if (personalInfo.linkedin && personalInfo.linkedin.trim() !== '') score += 5;
  else suggestions.push('Include your LinkedIn profile link.');

  if (summary && summary.trim().length > 30) score += 10;
  else suggestions.push('Write a professional summary (at least 30 characters).');

  if (skills && skills.length >= 3) score += 10;
  else suggestions.push('Add at least 3 skills to your skills section.');

  if ((education && education.length > 0) || (experience && experience.length > 0)) score += 5;
  else suggestions.push('Add education or work experience details.');

  if (projects && projects.length > 0) score += 5;
  else suggestions.push('Include at least one project in your resume.');

  // --- 2. Job Description Keyword Matching (Max 40 points) ---
  if (jobDescription && jobDescription.trim() !== '') {
    const skillsText = skills.map((s) => (typeof s === 'string' ? s : s.name)).join(' ');
    const projectsText = projects.map((p) => `${p.title} ${p.technologies} ${p.description}`).join(' ');
    const experienceText = experience.map((e) => `${e.position} ${e.company} ${e.description}`).join(' ');
    
    const combinedResumeText = `${summary} ${skillsText} ${projectsText} ${experienceText}`.toLowerCase();

    // Enhanced stop words list to ignore non-technical words like 'looking', 'developer', etc.
    const stopWords = new Set([
      'and', 'the', 'with', 'for', 'this', 'that', 'from', 'have', 'your', 'will', 
      'you', 'are', 'must', 'work', 'ability', 'looking', 'seeker', 'hiring', 
      'candidate', 'role', 'team', 'company', 'position', 'experience', 'knowledge',
      'developer', 'engineer', 'seeking', 'build', 'using'
    ]);

    const rawWords = jobDescription
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s#\+]/g, ' ')
      .split(/\s+/);

    const jdKeywords = Array.from(
      new Set(rawWords.filter((word) => word.length > 3 && !stopWords.has(word)))
    );

    if (jdKeywords.length > 0) {
      jdKeywords.forEach((kw) => {
        if (combinedResumeText.includes(kw)) {
          matchedKeywords.push(kw);
        } else {
          missingKeywords.push(kw);
        }
      });

      const matchRatio = matchedKeywords.length / jdKeywords.length;
      const keywordScore = Math.round(matchRatio * 40);
      score += keywordScore;

      if (missingKeywords.length > 0) {
        suggestions.push(
          `Missing JD keywords: Consider adding [ ${missingKeywords.slice(0, 5).join(', ')} ] to your resume.`
        );
      }
    } else {
      score += 40;
    }
  } else {
    score = Math.min(100, Math.round((score / 60) * 100));
  }

  return {
    score: Math.min(100, score),
    suggestions: suggestions.length > 0 ? suggestions : ['Great job! Your resume matches the requirements.'],
    matchedKeywords,
    missingKeywords,
  };
}