import { Criterion } from '@/domain/entities';

export interface CriterionUIDto {
  id: string;
  name: string;
  type: 'cost' | 'benefit';
  isNew: boolean;
}

export class CriterionUIMapper {
  public static fromDomain(criterion: Criterion, others: { isNew: boolean }): CriterionUIDto {
    return {
      id: criterion.id,
      name: criterion.name,
      type: criterion.type,
      isNew: others.isNew,
    };
  }

  public static toDomain(dto: CriterionUIDto): Criterion {
    return new Criterion(dto.id, dto.name, dto.type);
  }
}
