import '@/presentation/styles/globals.css';
import { AuthFooter, AuthMain } from '@/presentation/components/auth/shared';
import { MuiSetup, SkipToContentButton } from '@/presentation/components/shared';
import { Config, Fonts } from '@/config';
import { Metadata } from 'next';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: `Auth - ${Config.site.title}`,
    template: `%s - ${Config.site.title}`,
  },
  description: Config.site.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function AuthLayout({ children }: Props) {
  return (
    <html lang={Config.site.locale} className={`${Fonts.sans.variable} ${Fonts.mono.variable}`}>
      <body id="__next">
        <MuiSetup>
          <SkipToContentButton />
          <AuthMain>{children}</AuthMain>
          <AuthFooter />
        </MuiSetup>
      </body>
    </html>
  );
}
