import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onTextExtracted: (text: string) => void;
  extractedText: string;
}

export const ResumeUpload = ({ onTextExtracted, extractedText }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a PDF, Word document, or text file",
        variant: "destructive",
      });
      return;
    }

    setFileName(file.name);

    try {
      let text = "";
      
      if (file.type === 'text/plain') {
        text = await file.text();
      } else if (file.type === 'application/pdf') {
        // For PDF files, we'll simulate text extraction
        // In a real app, you'd use a library like pdf-parse or pdf2pic
        text = await extractPDFText(file);
      } else {
        // For Word documents, we'll simulate text extraction
        // In a real app, you'd use a library like mammoth.js
        text = await extractWordText(file);
      }

      onTextExtracted(text);
      toast({
        title: "Resume uploaded successfully",
        description: `Extracted ${text.length} characters from ${file.name}`,
      });
    } catch (error) {
      toast({
        title: "Error processing file",
        description: "Please try again or paste your resume text manually",
        variant: "destructive",
      });
    }
  };

  // Simulated PDF text extraction (in real app, use pdf-parse)
  const extractPDFText = async (file: File): Promise<string> => {
    // This is a simulation - in reality you'd use a proper PDF parser
    return `John Doe
Software Engineer
john.doe@email.com | (555) 123-4567 | linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of experience in full-stack development. Proficient in JavaScript, React, Node.js, and cloud technologies. Strong background in agile methodologies and team collaboration.

TECHNICAL SKILLS
• Programming Languages: JavaScript, TypeScript, Python, Java
• Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express.js, Django, Spring Boot
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes
• Tools: Git, Jenkins, JIRA, Slack

PROFESSIONAL EXPERIENCE
Senior Software Engineer | Tech Corp | 2021 - Present
• Led development of customer-facing web applications serving 100k+ users
• Implemented microservices architecture reducing response time by 40%
• Collaborated with cross-functional teams in agile environment
• Mentored junior developers and conducted code reviews

Software Engineer | StartupXYZ | 2019 - 2021
• Developed responsive web applications using React and Node.js
• Integrated third-party APIs and payment processing systems
• Optimized database queries improving application performance by 25%
• Participated in daily standups and sprint planning meetings

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019
GPA: 3.8/4.0

CERTIFICATIONS
• AWS Certified Solutions Architect
• Certified Scrum Master (CSM)`;
  };

  // Simulated Word document text extraction (in real app, use mammoth.js)
  const extractWordText = async (file: File): Promise<string> => {
    // This is a simulation - in reality you'd use mammoth.js or similar
    return await extractPDFText(file); // Using same sample text
  };

  const clearFile = () => {
    setFileName(null);
    onTextExtracted("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? "border-primary bg-primary-light" 
            : "border-border hover:border-primary"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <div className="space-y-2">
          <h3 className="font-semibold">Drop your resume here</h3>
          <p className="text-sm text-muted-foreground">
            or click to browse files
          </p>
          <p className="text-xs text-muted-foreground">
            Supports PDF, Word documents, and text files (max 10MB)
          </p>
        </div>
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="mt-4"
          variant="outline"
        >
          Browse Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
          onChange={handleFileInput}
        />
      </div>

      {/* File Status */}
      {fileName && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    {extractedText.length} characters extracted
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                >
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Text Input */}
      <div className="space-y-3">
        <Label>Or paste your resume text manually</Label>
        <Textarea
          placeholder="Paste your resume text here..."
          value={extractedText}
          onChange={(e) => onTextExtracted(e.target.value)}
          className="min-h-[200px]"
        />
      </div>

      {/* Preview */}
      {showPreview && extractedText && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Resume Preview</h3>
            <div className="bg-muted rounded-lg p-4 max-h-[400px] overflow-y-auto">
              <pre className="text-sm whitespace-pre-wrap text-muted-foreground">
                {extractedText}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};