# AI-Built Replica of Enhancv Resume Builder

A professional, full-stack resume builder web application built with Next.js, TypeScript, Tailwind CSS, Supabase, and Google Gemini AI. This application allows users to create, customize, and enhance their resumes with real-time previews, multiple templates, ATS scoring, and AI-powered content suggestions.

##  Key Features

* **Section-Based Resume Editor**: Clean, structured editing workflows for Personal Info, Professional Summary, Work Experience, Projects, Education, and Skills.
* **AI Content Suggestions (Gemini API)**: 
  * Integrated **AI Enhance** buttons into Professional Summary, Experience Description, and Project Description sections.
  * Generates professional, ATS-friendly, and action-verb-driven content suggestions.
  * **Input Validation**: Robust frontend and backend checks to ensure users enter valid text before invoking AI generation.
  * Modal preview workflow allowing users to review and apply enhancements seamlessly with a single click.
* **Live Resume Preview**: Real-time synchronization of all inputs onto professional resume templates.
* **ATS Score Checker**: Evaluates resume completeness and keyword optimization to help users pass Applicant Tracking Systems.
* **PDF Export**: Export generated resumes directly into professional PDF formats.
* **Authentication & Persistence**: Secure user authentication and cloud persistence powered by **Supabase**, allowing users to save and load their resume data anytime.

## 🛠️ Technology Stack

* **Frontend**: Next.js, React, TypeScript, Tailwind CSS
* **State Management**: Zustand
* **AI Integration**: Google Gemini API with fallback handling
* **Database & Auth**: Supabase
* **Deployment**: Vercel

##  Project Structure

```text
enhancv-replica/
├── app/                  # Next.js App Router (pages, API routes)
│   ├── api/              # Backend endpoints (Gemini AI content generation)
│   └── builder/          # Main resume builder workspace
├── components/           # Modular React components
│   ├── editor/           # Summary, Experience, Project, Skills sections
│   └── preview/          # Live resume templates & preview rendering
├── store/                # Zustand global state management
└── public/               # Static assets
