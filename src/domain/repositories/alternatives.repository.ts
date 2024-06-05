import { Alternative } from '@/domain/entities';

export interface AlternativesRepository {
  getAlternatives(): Alternative[];
  setAlternatives(alternatives: Alternative[]): void;
}
