
export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  visible: boolean;
  order: number;
}

export type BlockType = 'markdown' | 'image' | 'embed' | 'hero' | 'gallery' | 'columns' | 'faq' | 'cta';

export interface ContentBlock {
  id: string;
  type: BlockType;
  content: string;
  settings?: {
    layout?: 'full' | 'contained';
    aspectRatio?: string;
    caption?: string;
    columns?: string[];
    bgColor?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface PageContent {
  id: string;
  title: string;
  path: string;
  blocks: ContentBlock[];
  seo: SEOData;
}

export interface CMSSettings {
  siteName: string;
  favicon: string;
  headerLogo: string;
  primaryColor: string;
}

export interface CMSState {
  settings: CMSSettings;
  pages: PageContent[];
  menu: MenuItem[];
  files: UploadedFile[];
  isFirstRun: boolean;
}

export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'pdf';
  size: number;
  uploadedAt: string;
}

export enum AdminView {
  DASHBOARD = 'DASHBOARD',
  PAGES = 'PAGES',
  MENU = 'MENU',
  FILES = 'FILES',
  SETTINGS = 'SETTINGS',
  SEO = 'SEO'
}
