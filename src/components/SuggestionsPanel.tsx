import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle, 
  Lightbulb, 
  Target,
  FileText,
  Star
} from "lucide-react";
import { ATSAnalysis } from "./AtsChecker";

interface SuggestionsPanelProps {
  analysis: ATSAnalysis;
}

export const SuggestionsPanel = ({ analysis }: SuggestionsPanelProps) => {
  const { suggestions, formatIssues } = analysis;

  const highPrioritySuggestions = suggestions.filter(s => s.priority === 'high');
  const mediumPrioritySuggestions = suggestions.filter(s => s.priority === 'medium');
  const lowPrioritySuggestions = suggestions.filter(s => s.priority === 'low');

  const criticalIssues = formatIssues.filter(i => i.severity === 'error');
  const warnings = formatIssues.filter(i => i.severity === 'warning');
  const infos = formatIssues.filter(i => i.severity === 'info');

  const getSuggestionIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'medium': return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getIssueIcon = (severity: string) => {
    switch (severity) {
      case 'error': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning': return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-primary" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Improvement Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="suggestions" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="issues">Format Issues</TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggestions" className="space-y-4">
            {/* High Priority */}
            {highPrioritySuggestions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <h3 className="font-semibold text-destructive">High Priority</h3>
                  <Badge variant="destructive">{highPrioritySuggestions.length}</Badge>
                </div>
                <div className="space-y-3">
                  {highPrioritySuggestions.map((suggestion, index) => (
                    <div key={index} className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        {getSuggestionIcon(suggestion.priority)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Impact: {suggestion.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
              </div>
            )}

            {/* Medium Priority */}
            {mediumPrioritySuggestions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-warning" />
                  <h3 className="font-semibold text-warning">Medium Priority</h3>
                  <Badge variant="secondary">{mediumPrioritySuggestions.length}</Badge>
                </div>
                <div className="space-y-3">
                  {mediumPrioritySuggestions.map((suggestion, index) => (
                    <div key={index} className="bg-warning/5 border border-warning/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        {getSuggestionIcon(suggestion.priority)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Impact: {suggestion.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
              </div>
            )}

            {/* Low Priority */}
            {lowPrioritySuggestions.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <h3 className="font-semibold text-success">Low Priority</h3>
                  <Badge variant="outline">{lowPrioritySuggestions.length}</Badge>
                </div>
                <div className="space-y-3">
                  {lowPrioritySuggestions.map((suggestion, index) => (
                    <div key={index} className="bg-success/5 border border-success/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        {getSuggestionIcon(suggestion.priority)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {suggestion.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Impact: {suggestion.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            {/* Critical Issues */}
            {criticalIssues.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <h3 className="font-semibold text-destructive">Critical Issues</h3>
                  <Badge variant="destructive">{criticalIssues.length}</Badge>
                </div>
                <div className="space-y-2">
                  {criticalIssues.map((issue, index) => (
                    <div key={index} className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        {getIssueIcon(issue.severity)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{issue.type}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {issue.description}
                          </p>
                          <div className="mt-2 p-2 bg-success/10 rounded text-xs">
                            <strong>Fix:</strong> {issue.suggestion}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
              </div>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-warning" />
                  <h3 className="font-semibold text-warning">Warnings</h3>
                  <Badge variant="secondary">{warnings.length}</Badge>
                </div>
                <div className="space-y-2">
                  {warnings.map((issue, index) => (
                    <div key={index} className="bg-warning/5 border border-warning/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        {getIssueIcon(issue.severity)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{issue.type}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {issue.description}
                          </p>
                          <div className="mt-2 p-2 bg-primary/10 rounded text-xs">
                            <strong>Suggestion:</strong> {issue.suggestion}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
              </div>
            )}

            {/* Info */}
            {infos.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <h3 className="font-semibold text-primary">Recommendations</h3>
                  <Badge variant="outline">{infos.length}</Badge>
                </div>
                <div className="space-y-2">
                  {infos.map((issue, index) => (
                    <div key={index} className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        {getIssueIcon(issue.severity)}
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{issue.type}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {issue.description}
                          </p>
                          <div className="mt-2 p-2 bg-accent/10 rounded text-xs">
                            <strong>Tip:</strong> {issue.suggestion}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};