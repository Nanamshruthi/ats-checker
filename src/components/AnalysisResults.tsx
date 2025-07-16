import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Target, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  TrendingUp,
  Star,
  Hash
} from "lucide-react";
import { ATSAnalysis } from "./AtsChecker";

interface AnalysisResultsProps {
  analysis: ATSAnalysis;
}

export const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  const { keywordMatches, sections } = analysis;

  const foundKeywords = keywordMatches.filter(k => k.found);
  const missingKeywords = keywordMatches.filter(k => !k.found);

  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'high': return <Badge variant="destructive">High</Badge>;
      case 'medium': return <Badge variant="secondary">Medium</Badge>;
      case 'low': return <Badge variant="outline">Low</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getSectionIcon = (sectionName: string) => {
    switch (sectionName) {
      case 'contact': return <Hash className="h-4 w-4" />;
      case 'summary': return <FileText className="h-4 w-4" />;
      case 'experience': return <TrendingUp className="h-4 w-4" />;
      case 'education': return <Star className="h-4 w-4" />;
      case 'skills': return <Target className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="keywords" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="keywords" className="space-y-4">
            {/* Found Keywords */}
            {foundKeywords.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <h3 className="font-semibold text-success">Found Keywords</h3>
                  <Badge variant="outline" className="text-success">
                    {foundKeywords.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {foundKeywords.map((keyword, index) => (
                    <div key={index} className="bg-success/5 border border-success/20 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-success" />
                          <span className="text-sm font-medium">{keyword.keyword}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getImportanceBadge(keyword.importance)}
                          <Badge variant="outline" className="text-xs">
                            {keyword.frequency}x
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {missingKeywords.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-destructive" />
                  <h3 className="font-semibold text-destructive">Missing Keywords</h3>
                  <Badge variant="destructive">
                    {missingKeywords.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  {missingKeywords.map((keyword, index) => (
                    <div key={index} className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <XCircle className="h-3 w-3 text-destructive" />
                          <span className="text-sm font-medium">{keyword.keyword}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {getImportanceBadge(keyword.importance)}
                          <Badge variant="outline" className="text-xs">
                            Add to resume
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keyword Stats */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium mb-3">Keyword Statistics</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <div className="text-xl font-bold text-success">{foundKeywords.length}</div>
                  <div className="text-xs text-muted-foreground">Found</div>
                </div>
                <div className="space-y-1">
                  <div className="text-xl font-bold text-destructive">{missingKeywords.length}</div>
                  <div className="text-xs text-muted-foreground">Missing</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-4">
            {Object.entries(sections).map(([sectionName, section]) => (
              <div key={sectionName} className="space-y-3">
                <div className="flex items-center gap-2">
                  {getSectionIcon(sectionName)}
                  <h3 className="font-semibold capitalize">{sectionName}</h3>
                  {section.found ? (
                    <Badge variant="default">Found</Badge>
                  ) : (
                    <Badge variant="destructive">Missing</Badge>
                  )}
                </div>
                
                <div className={`border rounded-lg p-4 ${
                  section.found 
                    ? 'bg-success/5 border-success/20' 
                    : 'bg-destructive/5 border-destructive/20'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Section Quality</span>
                    <span className="text-sm font-bold">{section.score}%</span>
                  </div>
                  <Progress value={section.score} className="h-2 mb-3" />
                  
                  {section.issues.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Issues & Recommendations
                      </h4>
                      <div className="space-y-1">
                        {section.issues.map((issue, index) => (
                          <div key={index} className="text-xs p-2 bg-background/50 rounded">
                            • {issue}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};