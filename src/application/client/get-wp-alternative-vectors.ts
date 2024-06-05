import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { UseCase } from '@/application/shared';
import { WPAlternativeVector } from '@/domain/entities';
import type { WeightProductRepository } from '@/domain/repositories';

@injectable()
export class GetWPAlternativeVectors implements UseCase<WPAlternativeVector[]> {
  private readonly weightProductRepository: WeightProductRepository;

  public constructor(
    @inject(Symbols.WeightProductRepository)
    weightProductRepository: WeightProductRepository,
  ) {
    this.weightProductRepository = weightProductRepository;
  }

  public execute(): WPAlternativeVector[] {
    return this.weightProductRepository.getWPAlternativeVectors();
  }
}
