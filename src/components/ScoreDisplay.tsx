import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle, TrendingUp } from "lucide-react";
import { ATSAnalysis } from "./AtsChecker";

interface ScoreDisplayProps {
  analysis: ATSAnalysis;
}

export const ScoreDisplay = ({ analysis }: ScoreDisplayProps) => {
  const { score, sections, keywordMatches } = analysis;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Fair";
    if (score >= 60) return "Needs Improvement";
    return "Poor";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-8 w-8 text-success" />;
    if (score >= 60) return <AlertCircle className="h-8 w-8 text-warning" />;
    return <XCircle className="h-8 w-8 text-destructive" />;
  };

  const keywordMatchPercentage = (keywordMatches.filter(k => k.found).length / keywordMatches.length) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-3">
            {getScoreIcon(score)}
            <div>
              <div className="flex items-center gap-3">
                <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </span>
                <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}>
                  {getScoreLabel(score)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground font-normal">
                ATS Compatibility Score
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <Progress value={score} className="h-3" />
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{keywordMatches.filter(k => k.found).length}</div>
              <div className="text-sm text-muted-foreground">Keywords Matched</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-secondary">{Object.values(sections).filter(s => s.found).length}</div>
              <div className="text-sm text-muted-foreground">Sections Found</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-accent">{analysis.formatIssues.filter(i => i.severity === 'error').length}</div>
              <div className="text-sm text-muted-foreground">Critical Issues</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Keyword Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Keyword Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Match Rate</span>
                <span className="font-semibold">{keywordMatchPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={keywordMatchPercentage} />
            </div>
            
            <div className="space-y-3">
              {keywordMatches.slice(0, 5).map((keyword, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {keyword.found ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm">{keyword.keyword}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={keyword.importance === 'high' ? 'default' : keyword.importance === 'medium' ? 'secondary' : 'outline'}>
                      {keyword.importance}
                    </Badge>
                    {keyword.found && (
                      <span className="text-xs text-muted-foreground">
                        {keyword.frequency}x
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Section Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Section Analysis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(sections).map(([sectionName, section]) => (
              <div key={sectionName} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {section.found ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive" />
                    )}
                    <span className="text-sm capitalize">{sectionName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{section.score}%</span>
                    <Badge variant={section.score >= 80 ? "default" : section.score >= 60 ? "secondary" : "destructive"}>
                      {section.score >= 80 ? "Good" : section.score >= 60 ? "Fair" : "Poor"}
                    </Badge>
                  </div>
                </div>
                <Progress value={section.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};