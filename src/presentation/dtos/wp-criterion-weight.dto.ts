import { Criterion, WPCriterionWeight } from '@/domain/entities';

export interface WPCriterionWeightUIDto {
  id: string;
  name: string;
  type: 'cost' | 'benefit';
  weight: number;
  normalizedWeight: number;
}

export class WPCriterionWeightUIMapper {
  public static fromDomain(
    criterion: Criterion,
    criterionWeight: WPCriterionWeight,
    others: {
      normalizedWeight: number;
    },
  ): WPCriterionWeightUIDto {
    return {
      id: criterion.id,
      name: criterion.name,
      type: criterion.type,
      weight: criterionWeight.weight,
      normalizedWeight: others.normalizedWeight,
    };
  }

  public static toDomain(dto: WPCriterionWeightUIDto): WPCriterionWeight {
    return new WPCriterionWeight(dto.id, dto.weight);
  }
}
