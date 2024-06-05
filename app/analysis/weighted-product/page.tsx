import { CriteriaWeightList } from '@/presentation/components/weighted-product';
import { Metadata } from 'next';
import { SectionHeader } from '@/presentation/components/shared';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Weighted Product',
};

export default async function WeightedProductPage() {
  return (
    <>
      <SectionHeader title="Weighted Product" />
      <CriteriaWeightList />
    </>
  );
}
