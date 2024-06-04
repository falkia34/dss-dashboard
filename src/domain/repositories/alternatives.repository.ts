import { Alternative } from '@/domain/entities/alternative';

export interface AlternativesRepository {
  getAlternatives(): Alternative[];
  setAlternatives(alternatives: Alternative[]): void;
}
