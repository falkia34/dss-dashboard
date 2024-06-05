import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { UseCase } from '@/application/shared';
import { WPCriterionWeight } from '@/domain/entities';
import type { WeightProductRepository } from '@/domain/repositories';

export type SetWPCriterionWeightsParams = [wpCriterionWeights: WPCriterionWeight[]];

@injectable()
export class SetWPCriterionWeights implements UseCase<void, SetWPCriterionWeightsParams> {
  private readonly weightProductRepository: WeightProductRepository;

  public constructor(
    @inject(Symbols.WeightProductRepository)
    weightProductRepository: WeightProductRepository,
  ) {
    this.weightProductRepository = weightProductRepository;
  }

  public execute(wpCriterionWeights: WPCriterionWeight[]): void {
    this.weightProductRepository.setWPCriterionWeights(wpCriterionWeights);
  }
}
