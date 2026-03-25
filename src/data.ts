import { AIDesignTool } from './types';

export const TOOLS: AIDesignTool[] = [
  {
    id: 'ai-studio',
    name: 'AI Studio',
    url: 'https://aistudio.google.com/',
    description: 'Web based coding environment.',
    bestFor: 'simple coding tasks, getting started with an idea',
    category: 'Coding'
  },
  {
    id: 'antigravity',
    name: 'Antigravity',
    url: '',
    description: 'An AI-accelerated, browser-based workflow for building full-stack web and multiplatform applications.',
    bestFor: '',
    category: 'Coding'
  },
  {
    id: 'firecrawl',
    name: 'Firecrawl',
    url: 'https://firecrawl.dev',
    description: 'An open-source API that crawls websites and converts them into LLM-ready clean Markdown format.',
    bestFor: '',
    category: 'Design'
  },
  {
    id: 'gravity-claw',
    name: 'gravity claw tool generator',
    url: 'https://gravity-claw.vercel.app/',
    description: 'Selects a list of tools and generates a prompt to add them to the gravity claw app Generates tool addition prompts',
    bestFor: '',
    category: 'Coding'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com/',
    description: '',
    bestFor: '',
    category: 'Inspiration'
  }
];
