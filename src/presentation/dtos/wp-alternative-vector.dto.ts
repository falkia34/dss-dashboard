import { Alternative, WPAlternativeVector } from '@/domain/entities';

export interface WPAlternativeVectorUIDto {
  id: string;
  name: string;
  marks: { [key: string]: number };
  sVector: number;
  vVector: number;
}

export class WPAlternativeVectorUIMapper {
  public static fromDomain(
    alternative: Alternative,
    alternativeVector: WPAlternativeVector,
  ): WPAlternativeVectorUIDto {
    return {
      id: alternative.id,
      name: alternative.name,
      marks: alternative.marks,
      sVector: alternativeVector.sVector,
      vVector: alternativeVector.vVector,
    };
  }

  public static toDomain(dto: WPAlternativeVectorUIDto): WPAlternativeVector {
    return new WPAlternativeVector(dto.id, dto.sVector, dto.vVector);
  }
}
