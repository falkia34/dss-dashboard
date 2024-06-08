import {
  Conclusion,
  CriteriaWeightList,
  RankList,
  SVCalculationList,
} from '@/presentation/components/internal/weighted-product';
import { Metadata } from 'next';
import { SectionHeader } from '@/presentation/components/internal/shared';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Weighted Product Analysis',
};

export default async function WeightedProductPage() {
  return (
    <>
      <SectionHeader title="Weighted Product Analysis" />
      <CriteriaWeightList />
      <SVCalculationList />
      <RankList />
      <Conclusion />
    </>
  );
}
