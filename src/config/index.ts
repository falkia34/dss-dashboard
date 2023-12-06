import { NestedMenu, PathMenu, UrlMenu } from '@/domain/entities';

export * from './fonts';
export * from './symbols';
export * from './themes';

export const Config: {
  site: {
    url: string;
    title: string;
    tagline: string;
    description: string;
    locale: string;
  };
  nav: {
    menus: Required<
      | Omit<PathMenu, 'matcher'>
      | UrlMenu
      | NestedMenu<Omit<PathMenu, 'icon' | 'matcher'> | Omit<UrlMenu, 'icon'>>
    >[];
  };
  sidebar: {
    menus: RequiredProperty<PathMenu | NestedMenu<RequiredProperty<PathMenu, 'icon'>>, 'icon'>[];
  };
} = {
  site: {
    url: process.env.NEXT_PUBLIC_APP_URL as string,
    title: 'Decision Support System',
    tagline: 'Sederhana, Presisi, Konsisten',
    description:
      'Decision Support System (DSS) atau Sistem Pendukung Keputusan (SPK) adalah sistem yang membantu pengambilan keputusan.',
    locale: 'en-UK',
  },
  nav: {
    menus: [],
  },
  sidebar: {
    menus: [
      {
        name: 'Overview',
        icon: 'space-dashboard',
        path: '/',
      },
      {
        name: 'Criteria',
        icon: 'list',
        path: '/criteria',
      },
      {
        name: 'Alternatives',
        icon: 'people',
        path: '/alternatives',
      },
    ],
  },
};
