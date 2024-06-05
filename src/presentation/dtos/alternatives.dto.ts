import { Alternative } from '@/domain/entities';

export interface AlternativeUIDto {
  id: string;
  name: string;
  marks: { [key: string]: number };
  isNew: boolean;
}

export class AlternativeUIMapper {
  public static fromDomain(criterion: Alternative, others: { isNew: boolean }): AlternativeUIDto {
    return {
      id: criterion.id,
      name: criterion.name,
      marks: criterion.marks,
      isNew: others.isNew,
    };
  }

  public static toDomain(dto: AlternativeUIDto): Alternative {
    return new Alternative(dto.id, dto.name, dto.marks);
  }
}
