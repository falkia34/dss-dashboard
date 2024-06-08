import '@/presentation/styles/globals.css';
import { Auth, Config, Fonts } from '@/config';
import { MuiSetup, SkipToContentButton } from '@/presentation/components/shared';
import {
  InternalFooter,
  InternalHeader,
  InternalMain,
  Sidebar,
} from '@/presentation/components/internal/shared';
import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: `${Config.site.title}`,
    template: `%s - ${Config.site.title}`,
  },
  description: Config.site.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function InternalLayout({ children }: Props) {
  const session = await Auth.auth();

  return (
    <html lang={Config.site.locale} className={`${Fonts.sans.variable} ${Fonts.mono.variable}`}>
      <body id="__next" className="w-full">
        <MuiSetup>
          <SkipToContentButton />
          <InternalHeader session={session} />
          <Sidebar menus={Config.sidebar.menus} />
          <InternalMain>{children}</InternalMain>
          <InternalFooter />
        </MuiSetup>
      </body>
    </html>
  );
}
