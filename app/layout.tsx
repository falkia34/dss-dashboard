import '@/presentation/styles/globals.css';
import { Config, Fonts } from '@/config';
import { MuiSetup, SkipToContentButton } from '@/presentation/components/shared';
import { Footer, Header, Main, Sidebar } from '@/presentation/components/shared';
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

export default async function Layout({ children }: Props) {
  return (
    <html lang={Config.site.locale} className={`${Fonts.sans.variable} ${Fonts.mono.variable}`}>
      <body id="__next" className="w-full">
        <MuiSetup>
          <SkipToContentButton />
          <Header />
          <Sidebar menus={Config.sidebar.menus} />
          <Main>{children}</Main>
          <Footer />
        </MuiSetup>
      </body>
    </html>
  );
}
