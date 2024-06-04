import { Criterion } from '@/domain/entities';

export interface CriteriaRepository {
  getCriteria(): Criterion[];
  setCriteria(criteria: Criterion[]): void;
}
