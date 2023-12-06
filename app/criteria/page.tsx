import { Metadata } from 'next';
import { SectionHeader } from '@/presentation/components/shared';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Criteria',
};

export default async function CriteriaPage() {
  return (
    <>
      <SectionHeader title="Criteria" />
    </>
  );
}
