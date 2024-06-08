import { About, HowToUse, Methods } from '@/presentation/components/overview';
import { Config } from '@/config';
import { Metadata } from 'next';
import { SectionHeader } from '@/presentation/components/shared';

export const metadata: Metadata = {
  title: `Overview - ${Config.site.title}`,
};

export default function OverviewPage() {
  return (
    <>
      <SectionHeader title="Overview" />
      <About />
      <Methods />
      <HowToUse />
    </>
  );
}
