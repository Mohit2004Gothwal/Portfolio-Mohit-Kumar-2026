export type SkillCategory = 'Frontend' | 'Backend' | 'DevOps & Cloud' | 'Core CS & Languages';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: number; // 0 to 100
  experience: string;
  iconName: string;
  description: string;
  tags: string[];
}

export type ProjectCategory = 'All' | 'Full-Stack' | 'Frontend' | 'Backend & Cloud' | 'Systems & AI';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Full-Stack' | 'Frontend' | 'Backend & Cloud' | 'Systems & AI';
  tags: string[];
  highlights: string[];
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
  architecture?: string;
  impact?: string;
  previewGradient: string;
}

export interface BioMilestone {
  period: string;
  title: string;
  organization: string;
  location: string;
  type: 'Education' | 'Experience' | 'Achievement';
  description: string;
  skills: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
}

export interface EmailConfirmationResult {
  success: boolean;
  message: string;
  receiptId: string;
  recipient: string;
  confirmationMethod: 'smtp' | 'simulated_delivery';
  timestamp: string;
  emailPreview: {
    to: string;
    subject: string;
    text: string;
    html: string;
  };
}

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  eventName: string;
  parameters: Record<string, any>;
}

export type ThemeMode = 'light' | 'dark' | 'system';
