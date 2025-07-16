import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X, Target, TrendingUp } from "lucide-react";

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Sample job descriptions for demo
  const sampleJobs = [
    {
      title: "Senior Software Engineer",
      company: "Tech Corp",
      description: `We are seeking a Senior Software Engineer to join our dynamic team. The ideal candidate will have 5+ years of experience in full-stack development.

Key Requirements:
• Bachelor's degree in Computer Science or related field
• 5+ years of experience in software development
• Proficiency in JavaScript, React, Node.js
• Experience with cloud platforms (AWS, Azure, GCP)
• Strong knowledge of databases (PostgreSQL, MongoDB)
• Experience with agile methodologies
• Excellent communication and teamwork skills
• Experience with CI/CD pipelines
• Knowledge of containerization (Docker, Kubernetes)

Responsibilities:
• Design and develop scalable web applications
• Collaborate with cross-functional teams
• Mentor junior developers
• Participate in code reviews
• Implement best practices and standards
• Troubleshoot and debug applications
• Stay updated with emerging technologies

Nice to have:
• Experience with microservices architecture
• Knowledge of TypeScript
• DevOps experience
• Mobile development experience
• Open source contributions`
    },
    {
      title: "Frontend Developer",
      company: "Startup Inc",
      description: `Join our innovative startup as a Frontend Developer and help build the next generation of web applications.

Requirements:
• 3+ years of frontend development experience
• Expert knowledge of React, HTML5, CSS3
• Experience with modern JavaScript (ES6+)
• Familiarity with state management (Redux, Context API)
• Knowledge of responsive design principles
• Experience with version control (Git)
• Understanding of web performance optimization
• Familiarity with testing frameworks (Jest, Cypress)

Responsibilities:
• Develop user-facing features using React
• Ensure cross-browser compatibility
• Optimize applications for maximum speed
• Collaborate with UX/UI designers
• Implement responsive designs
• Write clean, maintainable code
• Participate in agile development processes

Bonus points:
• Experience with TypeScript
• Knowledge of Next.js or Gatsby
• Familiarity with design systems
• Experience with CSS preprocessors (Sass, Less)
• Understanding of accessibility standards`
    },
    {
      title: "Data Scientist",
      company: "Analytics Solutions",
      description: `We are looking for a Data Scientist to analyze large datasets and derive actionable insights for our clients.

Required Skills:
• Master's degree in Data Science, Statistics, or related field
• 4+ years of experience in data analysis
• Proficiency in Python, R, SQL
• Experience with machine learning frameworks (scikit-learn, TensorFlow, PyTorch)
• Strong statistical analysis skills
• Experience with data visualization tools (Tableau, Power BI)
• Knowledge of big data technologies (Hadoop, Spark)
• Excellent communication skills

Key Responsibilities:
• Analyze complex datasets to identify trends and patterns
• Build predictive models and machine learning algorithms
• Create data visualizations and reports
• Collaborate with stakeholders to understand business requirements
• Clean and preprocess data for analysis
• Present findings to technical and non-technical audiences
• Stay current with industry trends and best practices

Preferred Qualifications:
• PhD in relevant field
• Experience with cloud platforms (AWS, GCP, Azure)
• Knowledge of deep learning techniques
• Experience with A/B testing
• Familiarity with MLOps practices`
    }
  ];

  const handleSampleSelect = (description: string) => {
    onChange(description);
    setIsExpanded(false);
  };

  const clearDescription = () => {
    onChange("");
  };

  const extractKeywords = (text: string): string[] => {
    if (!text) return [];
    
    // Simple keyword extraction - in real app, use NLP
    const commonSkills = [
      'javascript', 'react', 'node.js', 'python', 'java', 'aws', 'docker',
      'kubernetes', 'sql', 'postgresql', 'mongodb', 'git', 'agile', 'scrum',
      'typescript', 'vue.js', 'angular', 'express.js', 'django', 'spring',
      'machine learning', 'data analysis', 'tensorflow', 'pytorch', 'tableau',
      'power bi', 'hadoop', 'spark', 'redis', 'elasticsearch', 'jenkins',
      'ci/cd', 'microservices', 'rest api', 'graphql', 'html5', 'css3',
      'sass', 'less', 'webpack', 'babel', 'jest', 'cypress', 'selenium'
    ];

    const lowerText = text.toLowerCase();
    return commonSkills.filter(skill => 
      lowerText.includes(skill.toLowerCase())
    ).slice(0, 10);
  };

  const keywords = extractKeywords(value);

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold">Why add a job description?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Adding a job description allows for targeted keyword analysis and more specific 
                suggestions to match your resume with the role requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Jobs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Try a sample job description</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Hide samples" : "Show samples"}
          </Button>
        </div>
        
        {isExpanded && (
          <div className="grid gap-3">
            {sampleJobs.map((job, index) => (
              <Card key={index} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSampleSelect(job.description)}
                    >
                      Use this job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Job Description Input */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Job Description</Label>
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearDescription}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Textarea
          placeholder="Paste the job description here to get targeted keyword analysis..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-h-[300px]"
        />
        {value && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>{value.length} characters • Enhanced analysis enabled</span>
          </div>
        )}
      </div>

      {/* Extracted Keywords */}
      {keywords.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Key Skills Detected</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary">
                  {keyword}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              These keywords will be matched against your resume for scoring.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};