# ATS Resume Checker

A modern web application that analyzes resumes for ATS (Applicant Tracking System) compatibility and provides actionable suggestions for improvement.

<img width="1875" height="832" alt="Screenshot 2025-07-16 204109" src="https://github.com/user-attachments/assets/1be252c5-b62d-4ace-b8e2-4ef19a12e671" />

🌐 Live Demo     👉[ Live Preview](https://68dd576eb5225257dbb7ce01--ats-score-check.netlify.app/)
 

## Features

- **Resume Upload**: Support for PDF, Word documents, and text files
- **ATS Compatibility Score**: Get a 0-100 score based on ATS optimization
- **Job Description Analysis**: Compare your resume against specific job requirements
- **Detailed Suggestions**: Prioritized recommendations for improvement
- **Real-time Analysis**: Instant feedback on resume formatting and content
- **Professional UI**: Clean, responsive design with dark/light mode support

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui components
- **Build Tool**: Vite
- **Backend**: Supabase (database and authentication)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ats-resume-checker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Upload Resume**: Click "Upload Resume" and select your PDF, Word, or text file
2. **Add Job Description** (Optional): Paste a job description for targeted analysis
3. **Get Analysis**: View your ATS compatibility score and detailed suggestions
4. **Improve**: Follow the prioritized recommendations to optimize your resume

## Features in Detail

### ATS Analysis
- Keyword matching and density analysis
- Section structure validation
- Format compatibility checking
- Contact information verification

### Suggestions
- Missing keywords identification
- Section improvement recommendations
- Formatting optimization tips
- Content structure guidance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
