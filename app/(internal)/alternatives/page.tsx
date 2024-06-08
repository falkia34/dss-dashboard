import { AlternativesList } from '@/presentation/components/internal/alternatives';
import { Metadata } from 'next';
import { SectionHeader } from '@/presentation/components/internal/shared';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Alternatives',
};

export default async function AlternativesPage() {
  return (
    <>
      <SectionHeader title="Alternatives" />
      <AlternativesList />
    </>
  );
}
