import { ATSAnalysis } from "@/components/AtsChecker";

export const analyzeResumeForATS = async (
  resumeText: string,
  jobDescription: string = ""
): Promise<ATSAnalysis> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const analysis: ATSAnalysis = {
    score: 0,
    keywordMatches: [],
    formatIssues: [],
    sections: {
      contact: { found: false, score: 0, issues: [] },
      summary: { found: false, score: 0, issues: [] },
      experience: { found: false, score: 0, issues: [] },
      education: { found: false, score: 0, issues: [] },
      skills: { found: false, score: 0, issues: [] },
    },
    suggestions: [],
  };

  // Extract keywords from job description or use common ones
  const keywords = jobDescription 
    ? extractKeywordsFromJob(jobDescription)
    : getCommonATSKeywords();

  // Analyze keyword matches
  analysis.keywordMatches = analyzeKeywords(resumeText, keywords);

  // Analyze sections
  analysis.sections = analyzeSections(resumeText);

  // Identify format issues
  analysis.formatIssues = identifyFormatIssues(resumeText);

  // Generate suggestions
  analysis.suggestions = generateSuggestions(analysis);

  // Calculate overall score
  analysis.score = calculateOverallScore(analysis);

  return analysis;
};

const extractKeywordsFromJob = (jobDescription: string): Array<{keyword: string, importance: 'high' | 'medium' | 'low'}> => {
  const text = jobDescription.toLowerCase();
  const allKeywords = [
    // Technical skills
    { keyword: 'JavaScript', importance: 'high' as const },
    { keyword: 'React', importance: 'high' as const },
    { keyword: 'Node.js', importance: 'high' as const },
    { keyword: 'Python', importance: 'high' as const },
    { keyword: 'TypeScript', importance: 'medium' as const },
    { keyword: 'AWS', importance: 'high' as const },
    { keyword: 'Docker', importance: 'medium' as const },
    { keyword: 'Kubernetes', importance: 'medium' as const },
    { keyword: 'SQL', importance: 'high' as const },
    { keyword: 'PostgreSQL', importance: 'medium' as const },
    { keyword: 'MongoDB', importance: 'medium' as const },
    { keyword: 'Git', importance: 'medium' as const },
    { keyword: 'CI/CD', importance: 'medium' as const },
    { keyword: 'REST API', importance: 'medium' as const },
    { keyword: 'GraphQL', importance: 'low' as const },
    { keyword: 'microservices', importance: 'medium' as const },
    { keyword: 'Express.js', importance: 'medium' as const },
    { keyword: 'Vue.js', importance: 'medium' as const },
    { keyword: 'Angular', importance: 'medium' as const },
    { keyword: 'HTML5', importance: 'medium' as const },
    { keyword: 'CSS3', importance: 'medium' as const },
    { keyword: 'Sass', importance: 'low' as const },
    { keyword: 'Webpack', importance: 'low' as const },
    { keyword: 'Jenkins', importance: 'low' as const },
    { keyword: 'Redis', importance: 'low' as const },
    { keyword: 'Elasticsearch', importance: 'low' as const },
    
    // Soft skills and methodologies
    { keyword: 'agile', importance: 'high' as const },
    { keyword: 'scrum', importance: 'medium' as const },
    { keyword: 'leadership', importance: 'medium' as const },
    { keyword: 'team collaboration', importance: 'medium' as const },
    { keyword: 'problem solving', importance: 'medium' as const },
    { keyword: 'communication', importance: 'medium' as const },
    { keyword: 'mentoring', importance: 'low' as const },
    { keyword: 'project management', importance: 'medium' as const },
    
    // Data Science specific
    { keyword: 'machine learning', importance: 'high' as const },
    { keyword: 'data analysis', importance: 'high' as const },
    { keyword: 'TensorFlow', importance: 'medium' as const },
    { keyword: 'PyTorch', importance: 'medium' as const },
    { keyword: 'pandas', importance: 'medium' as const },
    { keyword: 'scikit-learn', importance: 'medium' as const },
    { keyword: 'Tableau', importance: 'medium' as const },
    { keyword: 'Power BI', importance: 'medium' as const },
    { keyword: 'statistical analysis', importance: 'high' as const },
    { keyword: 'data visualization', importance: 'medium' as const },
    { keyword: 'R', importance: 'medium' as const },
    { keyword: 'Hadoop', importance: 'low' as const },
    { keyword: 'Spark', importance: 'low' as const },
  ];

  return allKeywords.filter(item => 
    text.includes(item.keyword.toLowerCase())
  );
};

const getCommonATSKeywords = (): Array<{keyword: string, importance: 'high' | 'medium' | 'low'}> => {
  return [
    { keyword: 'JavaScript', importance: 'high' as const },
    { keyword: 'React', importance: 'high' as const },
    { keyword: 'Node.js', importance: 'high' as const },
    { keyword: 'Python', importance: 'high' as const },
    { keyword: 'SQL', importance: 'high' as const },
    { keyword: 'AWS', importance: 'high' as const },
    { keyword: 'agile', importance: 'high' as const },
    { keyword: 'TypeScript', importance: 'medium' as const },
    { keyword: 'Docker', importance: 'medium' as const },
    { keyword: 'Git', importance: 'medium' as const },
    { keyword: 'REST API', importance: 'medium' as const },
    { keyword: 'leadership', importance: 'medium' as const },
    { keyword: 'problem solving', importance: 'medium' as const },
    { keyword: 'team collaboration', importance: 'medium' as const },
    { keyword: 'GraphQL', importance: 'low' as const },
    { keyword: 'Jenkins', importance: 'low' as const },
    { keyword: 'Redis', importance: 'low' as const },
    { keyword: 'mentoring', importance: 'low' as const },
  ];
};

const analyzeKeywords = (resumeText: string, keywords: Array<{keyword: string, importance: 'high' | 'medium' | 'low'}>) => {
  const lowerResumeText = resumeText.toLowerCase();
  
  return keywords.map(({ keyword, importance }) => {
    const lowerKeyword = keyword.toLowerCase();
    const found = lowerResumeText.includes(lowerKeyword);
    const frequency = found ? (lowerResumeText.match(new RegExp(lowerKeyword, 'g')) || []).length : 0;
    
    return {
      keyword,
      found,
      frequency,
      importance,
    };
  });
};

const analyzeSections = (resumeText: string) => {
  const lowerText = resumeText.toLowerCase();
  
  // Contact section analysis
  const contactPatterns = [
    /[\w\.-]+@[\w\.-]+\.\w+/,  // email
    /\(\d{3}\)\s?\d{3}-\d{4}/, // phone
    /\d{3}-\d{3}-\d{4}/,       // phone
    /linkedin\.com/i,          // linkedin
  ];
  
  const contactFound = contactPatterns.some(pattern => pattern.test(resumeText));
  const contactScore = contactFound ? 85 : 0;
  const contactIssues = contactFound ? [] : [
    "Add professional email address",
    "Include phone number with area code",
    "Consider adding LinkedIn profile"
  ];

  // Summary section analysis
  const summaryPatterns = [
    /summary/i,
    /objective/i,
    /profile/i,
    /about/i,
  ];
  
  const summaryFound = summaryPatterns.some(pattern => pattern.test(resumeText));
  const summaryScore = summaryFound ? 75 : 0;
  const summaryIssues = summaryFound ? [] : [
    "Add a professional summary section",
    "Include 2-3 sentences highlighting your key strengths",
    "Mention years of experience and core competencies"
  ];

  // Experience section analysis
  const experiencePatterns = [
    /experience/i,
    /employment/i,
    /work history/i,
    /professional/i,
  ];
  
  const experienceFound = experiencePatterns.some(pattern => pattern.test(resumeText));
  const experienceScore = experienceFound ? 90 : 0;
  const experienceIssues = experienceFound ? [] : [
    "Add professional experience section",
    "Include company names, job titles, and dates",
    "Use action verbs and quantify achievements"
  ];

  // Education section analysis
  const educationPatterns = [
    /education/i,
    /degree/i,
    /university/i,
    /college/i,
    /bachelor/i,
    /master/i,
    /phd/i,
  ];
  
  const educationFound = educationPatterns.some(pattern => pattern.test(resumeText));
  const educationScore = educationFound ? 80 : 0;
  const educationIssues = educationFound ? [] : [
    "Add education section",
    "Include degree type, institution, and graduation year",
    "Mention relevant coursework or GPA if strong"
  ];

  // Skills section analysis
  const skillsPatterns = [
    /skills/i,
    /technical/i,
    /competencies/i,
    /technologies/i,
  ];
  
  const skillsFound = skillsPatterns.some(pattern => pattern.test(resumeText));
  const skillsScore = skillsFound ? 85 : 0;
  const skillsIssues = skillsFound ? [] : [
    "Add dedicated skills section",
    "List technical skills relevant to the job",
    "Organize skills by category (e.g., Programming, Tools, Frameworks)"
  ];

  return {
    contact: { found: contactFound, score: contactScore, issues: contactIssues },
    summary: { found: summaryFound, score: summaryScore, issues: summaryIssues },
    experience: { found: experienceFound, score: experienceScore, issues: experienceIssues },
    education: { found: educationFound, score: educationScore, issues: educationIssues },
    skills: { found: skillsFound, score: skillsScore, issues: skillsIssues },
  };
};

const identifyFormatIssues = (resumeText: string) => {
  const issues = [];
  
  // Check for common formatting issues
  if (resumeText.length < 500) {
    issues.push({
      type: "Resume Length",
      description: "Resume appears to be too short. Most effective resumes are 1-2 pages.",
      severity: "warning" as const,
      suggestion: "Expand your experience descriptions and add more detailed achievements."
    });
  }

  if (resumeText.length > 5000) {
    issues.push({
      type: "Resume Length",
      description: "Resume may be too long. Keep it concise and relevant.",
      severity: "warning" as const,
      suggestion: "Focus on the most relevant experience and achievements for the target role."
    });
  }

  // Check for special characters that might cause ATS issues
  if (/[^\w\s\-\.\,\(\)\@\:\/\%\$\#\!\?\'\"]/g.test(resumeText)) {
    issues.push({
      type: "Special Characters",
      description: "Resume contains special characters that may not be ATS-friendly.",
      severity: "info" as const,
      suggestion: "Use standard characters and avoid fancy symbols or graphics."
    });
  }

  // Check for consistent formatting
  if (!/\d{4}/.test(resumeText)) {
    issues.push({
      type: "Date Format",
      description: "No clear date format found. Include years for experience and education.",
      severity: "error" as const,
      suggestion: "Use consistent date format (e.g., 2020-2023) throughout your resume."
    });
  }

  // Check for quantifiable achievements
  if (!/\d+[\%\$\+]/.test(resumeText)) {
    issues.push({
      type: "Quantifiable Results",
      description: "Consider adding numbers and metrics to demonstrate impact.",
      severity: "info" as const,
      suggestion: "Include percentages, dollar amounts, or other metrics where possible."
    });
  }

  return issues;
};

const generateSuggestions = (analysis: ATSAnalysis) => {
  const suggestions = [];
  
  // High priority suggestions
  const missingHighKeywords = analysis.keywordMatches.filter(k => !k.found && k.importance === 'high');
  if (missingHighKeywords.length > 0) {
    suggestions.push({
      category: "Keywords",
      title: "Add High-Priority Keywords",
      description: `Your resume is missing ${missingHighKeywords.length} high-priority keywords. Consider incorporating: ${missingHighKeywords.slice(0, 3).map(k => k.keyword).join(', ')}.`,
      priority: "high" as const,
      impact: "Significantly improve ATS matching"
    });
  }

  // Missing sections
  const missingSections = Object.entries(analysis.sections).filter(([_, section]) => !section.found);
  if (missingSections.length > 0) {
    suggestions.push({
      category: "Structure",
      title: "Add Missing Sections",
      description: `Your resume is missing key sections: ${missingSections.map(([name]) => name).join(', ')}. These are essential for ATS parsing.`,
      priority: "high" as const,
      impact: "Improve resume structure and ATS compatibility"
    });
  }

  // Medium priority suggestions
  const mediumKeywords = analysis.keywordMatches.filter(k => !k.found && k.importance === 'medium');
  if (mediumKeywords.length > 0) {
    suggestions.push({
      category: "Keywords",
      title: "Enhance Keyword Coverage",
      description: `Consider adding medium-priority keywords: ${mediumKeywords.slice(0, 3).map(k => k.keyword).join(', ')}.`,
      priority: "medium" as const,
      impact: "Improve keyword matching score"
    });
  }

  // Format improvements
  const criticalIssues = analysis.formatIssues.filter(i => i.severity === 'error');
  if (criticalIssues.length > 0) {
    suggestions.push({
      category: "Format",
      title: "Fix Critical Format Issues",
      description: `Address ${criticalIssues.length} critical formatting issues that may prevent ATS parsing.`,
      priority: "high" as const,
      impact: "Ensure proper ATS parsing"
    });
  }

  // Low priority suggestions
  const lowKeywords = analysis.keywordMatches.filter(k => !k.found && k.importance === 'low');
  if (lowKeywords.length > 0) {
    suggestions.push({
      category: "Enhancement",
      title: "Optional Keyword Additions",
      description: `For maximum optimization, consider adding: ${lowKeywords.slice(0, 2).map(k => k.keyword).join(', ')}.`,
      priority: "low" as const,
      impact: "Minor improvement to matching score"
    });
  }

  // Quantifiable achievements
  if (!analysis.formatIssues.some(i => i.type === "Quantifiable Results")) {
    suggestions.push({
      category: "Content",
      title: "Add Quantifiable Achievements",
      description: "Include numbers, percentages, and metrics to demonstrate your impact and results.",
      priority: "medium" as const,
      impact: "Make your achievements more compelling"
    });
  }

  return suggestions;
};

const calculateOverallScore = (analysis: ATSAnalysis) => {
  let score = 0;
  let maxScore = 0;

  // Keywords score (40% of total)
  const keywordScore = (analysis.keywordMatches.filter(k => k.found).length / analysis.keywordMatches.length) * 40;
  score += keywordScore;
  maxScore += 40;

  // Sections score (35% of total)
  const sectionScores = Object.values(analysis.sections).map(s => s.score);
  const averageSectionScore = sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length;
  const sectionScore = (averageSectionScore / 100) * 35;
  score += sectionScore;
  maxScore += 35;

  // Format score (25% of total)
  const criticalIssues = analysis.formatIssues.filter(i => i.severity === 'error').length;
  const formatScore = Math.max(0, 25 - (criticalIssues * 5));
  score += formatScore;
  maxScore += 25;

  return Math.round((score / maxScore) * 100);
};