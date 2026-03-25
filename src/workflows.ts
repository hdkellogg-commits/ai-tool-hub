export interface WorkflowStep {
  toolId: string;
  action: string;
}

export interface Workflow {
  id: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
}

export const WORKFLOWS: Workflow[] = [
  {
    id: 'website',
    title: 'Building a Website',
    description: 'From initial concept to a live full-stack web application.',
    steps: [
      { toolId: 'dribbble', action: 'Research visual trends and UI patterns for your site layout.' },
      { toolId: 'firecrawl', action: 'Crawl competitor sites to extract structured content and SEO data.' },
      { toolId: 'ai-studio', action: 'Prototype core components and logic using Gemini models.' },
      { toolId: 'antigravity', action: 'Deploy the full-stack application to a production-ready environment.' }
    ]
  },
  {
    id: 'mobile-app',
    title: 'Building a Mobile App',
    description: 'Creating cross-platform mobile experiences with AI assistance.',
    steps: [
      { toolId: 'dribbble', action: 'Explore mobile-specific interactions and navigation flows.' },
      { toolId: 'ai-studio', action: 'Draft app logic and API integrations in a sandboxed environment.' },
      { toolId: 'gravity-claw', action: 'Generate specialized tool prompts to extend your app functionality.' },
      { toolId: 'antigravity', action: 'Build and preview the multiplatform app across different devices.' }
    ]
  }
];
