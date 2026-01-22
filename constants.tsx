
import { PageContent, MenuItem, CMSState } from './types';

export const DEFAULT_PAGES: PageContent[] = [
  {
    id: 'home',
    title: 'Home',
    path: '/',
    blocks: [
      {
        id: 'b1',
        type: 'hero',
        content: '# SanjanaLite\nYour Open Source Vision.',
        settings: { textAlign: 'center' }
      },
      {
        id: 'b2',
        type: 'markdown',
        content: '## Modular. Extensible. Powerful.\nSanjanaLite is designed for organizations that require a structured, block-based approach to digital presence.',
      }
    ],
    seo: {
      title: 'Home | SanjanaLite',
      description: 'Sophisticated modular web building with an enterprise feel.',
      keywords: 'odoo, modular, cms, studio',
      ogImage: 'https://picsum.photos/1200/630'
    }
  }
];

export const DEFAULT_MENU: MenuItem[] = [
  { id: '1', label: 'Home', path: '/', visible: true, order: 0 },
  { id: '2', label: 'Services', path: '/services', visible: true, order: 1 },
  { id: '3', label: 'Contact', path: '/contact', visible: true, order: 2 }
];

export const INITIAL_CMS_STATE: CMSState = {
  settings: {
    siteName: 'SanjanaLite',
    favicon: 'https://picsum.photos/32/32',
    headerLogo: 'https://cdn-icons-png.flaticon.com/512/1162/1162456.png',
    primaryColor: '#1D1D1F', // Apple Deep Black
  },
  pages: DEFAULT_PAGES,
  menu: DEFAULT_MENU,
  files: [],
  isFirstRun: true
};
