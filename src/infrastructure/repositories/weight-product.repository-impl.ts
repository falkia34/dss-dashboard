import type { LocalStorageDataSource } from '@/infrastructure/datasources/client';
import { WPCriterionWeight } from '@/domain/entities';
import { WeightProductRepository } from '@/domain/repositories';
import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';

@injectable()
export class WeightProductRepositoryImpl implements WeightProductRepository {
  private readonly localStorageDataSource: LocalStorageDataSource;

  public constructor(
    @inject(Symbols.LocalStorageDataSource)
    localStorageDataSource: LocalStorageDataSource,
  ) {
    this.localStorageDataSource = localStorageDataSource;
  }

  public getWPCriterionWeight(): WPCriterionWeight[] {
    return this.localStorageDataSource.get<WPCriterionWeight[]>('wp-criteria-weight') || [];
  }

  public setWPCriterionWeight(criterionWeights: WPCriterionWeight[]): void {
    this.localStorageDataSource.set<WPCriterionWeight[]>('wp-criteria-weight', criterionWeights);
  }
}
