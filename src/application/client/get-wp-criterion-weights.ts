import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { UseCase } from '@/application/shared';
import { WPCriterionWeight } from '@/domain/entities';
import type { WeightProductRepository } from '@/domain/repositories';

@injectable()
export class GetWPCriterionWeights implements UseCase<WPCriterionWeight[]> {
  private readonly weightProductRepository: WeightProductRepository;

  public constructor(
    @inject(Symbols.WeightProductRepository)
    weightProductRepository: WeightProductRepository,
  ) {
    this.weightProductRepository = weightProductRepository;
  }

  public execute(): WPCriterionWeight[] {
    return this.weightProductRepository.getWPCriterionWeight();
  }
}
