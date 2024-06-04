import { Criterion } from '@/domain/entities';
import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { UseCase } from '@/application/shared';
import type { CriteriaRepository } from '@/domain/repositories';

@injectable()
export class GetCriteria implements UseCase<Criterion[]> {
  private readonly criteriaRepository: CriteriaRepository;

  public constructor(
    @inject(Symbols.CriteriaRepository)
    criteriaRepository: CriteriaRepository,
  ) {
    this.criteriaRepository = criteriaRepository;
  }

  public execute(): Criterion[] {
    return this.criteriaRepository.getCriteria();
  }
}
