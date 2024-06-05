import { WPCriterionWeight } from '@/domain/entities';

export interface WeightProductRepository {
  getWPCriterionWeight(): WPCriterionWeight[];
  setWPCriterionWeight(criterionWeights: WPCriterionWeight[]): void;
}
