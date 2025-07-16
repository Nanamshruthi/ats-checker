import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResumeUpload } from "./ResumeUpload";
import { JobDescriptionInput } from "./JobDescriptionInput";
import { ScoreDisplay } from "./ScoreDisplay";
import { SuggestionsPanel } from "./SuggestionsPanel";
import { AnalysisResults } from "./AnalysisResults";
import { analyzeResumeForATS } from "@/lib/atsAnalyzer";
import { FileText, Target, TrendingUp, CheckCircle } from "lucide-react";

export interface ATSAnalysis {
  score: number;
  keywordMatches: Array<{
    keyword: string;
    found: boolean;
    frequency: number;
    importance: 'high' | 'medium' | 'low';
  }>;
  formatIssues: Array<{
    type: string;
    description: string;
    severity: 'error' | 'warning' | 'info';
    suggestion: string;
  }>;
  sections: {
    contact: { found: boolean; score: number; issues: string[] };
    summary: { found: boolean; score: number; issues: string[] };
    experience: { found: boolean; score: number; issues: string[] };
    education: { found: boolean; score: number; issues: string[] };
    skills: { found: boolean; score: number; issues: string[] };
  };
  suggestions: Array<{
    category: string;
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    impact: string;
  }>;
}

export const AtsChecker = () => {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeResumeForATS(resumeText, jobDescription);
      setAnalysis(result);
      setActiveTab("results");
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">ATS Resume Checker</h1>
            <p className="text-lg opacity-90">
              Optimize your resume for Applicant Tracking Systems
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Upload Resume
            </TabsTrigger>
            <TabsTrigger value="job" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Job Description
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analyze
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResumeUpload 
                  onTextExtracted={setResumeText}
                  extractedText={resumeText}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="job" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Description (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <JobDescriptionInput
                  value={jobDescription}
                  onChange={setJobDescription}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyze" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ready to Analyze</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Resume Status</h3>
                    <div className="flex items-center gap-2">
                      {resumeText ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="text-success">Resume uploaded</span>
                          <Badge variant="secondary">
                            {resumeText.length} characters
                          </Badge>
                        </>
                      ) : (
                        <span className="text-muted-foreground">No resume uploaded</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold">Job Description</h3>
                    <div className="flex items-center gap-2">
                      {jobDescription ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span className="text-success">Job description added</span>
                          <Badge variant="secondary">
                            Enhanced analysis
                          </Badge>
                        </>
                      ) : (
                        <span className="text-muted-foreground">General ATS analysis</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    onClick={handleAnalyze}
                    disabled={!resumeText || isAnalyzing}
                    size="lg"
                    className="w-full"
                    variant="gradient"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {analysis ? (
              <div className="space-y-6">
                <ScoreDisplay analysis={analysis} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <AnalysisResults analysis={analysis} />
                  <SuggestionsPanel analysis={analysis} />
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <TrendingUp className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
                  <p className="text-muted-foreground">
                    Upload your resume and run the analysis to see results here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};