import { Criterion } from '@/domain/entities';
import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { UseCase } from '@/application/shared';
import type { CriteriaRepository } from '@/domain/repositories';

export type SetCriteriaParams = [criteria: Criterion[]];

@injectable()
export class SetCriteria implements UseCase<void, SetCriteriaParams> {
  private readonly criteriaRepository: CriteriaRepository;

  public constructor(
    @inject(Symbols.CriteriaRepository)
    criteriaRepository: CriteriaRepository,
  ) {
    this.criteriaRepository = criteriaRepository;
  }

  public execute(criteria: Criterion[]): void {
    this.criteriaRepository.setCriteria(criteria);
  }
}
