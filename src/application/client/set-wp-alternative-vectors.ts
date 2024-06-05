import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { UseCase } from '@/application/shared';
import { WPAlternativeVector } from '@/domain/entities';
import type { WeightProductRepository } from '@/domain/repositories';

export type SetWPAlternativeVectorsParams = [wpAlternativeVectors: WPAlternativeVector[]];

@injectable()
export class SetWPAlternativeVectors implements UseCase<void, SetWPAlternativeVectorsParams> {
  private readonly weightProductRepository: WeightProductRepository;

  public constructor(
    @inject(Symbols.WeightProductRepository)
    weightProductRepository: WeightProductRepository,
  ) {
    this.weightProductRepository = weightProductRepository;
  }

  public execute(wpAlternativeVectors: WPAlternativeVector[]): void {
    this.weightProductRepository.setWPAlternativeVectors(wpAlternativeVectors);
  }
}
