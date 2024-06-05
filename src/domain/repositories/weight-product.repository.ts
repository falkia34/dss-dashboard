import { WPAlternativeVector, WPCriterionWeight } from '@/domain/entities';

export interface WeightProductRepository {
  getWPCriterionWeights(): WPCriterionWeight[];
  setWPCriterionWeights(criterionWeights: WPCriterionWeight[]): void;
  getWPAlternativeVectors(): WPAlternativeVector[];
  setWPAlternativeVectors(alternativeVectors: WPAlternativeVector[]): void;
}
