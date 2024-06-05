import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { WeightProductRepository } from '@/domain/repositories';
import { WPAlternativeVector, WPCriterionWeight } from '@/domain/entities';
import type { LocalStorageDataSource } from '@/infrastructure/datasources/client';

@injectable()
export class WeightProductRepositoryImpl implements WeightProductRepository {
  private readonly localStorageDataSource: LocalStorageDataSource;

  public constructor(
    @inject(Symbols.LocalStorageDataSource)
    localStorageDataSource: LocalStorageDataSource,
  ) {
    this.localStorageDataSource = localStorageDataSource;
  }

  public getWPCriterionWeights(): WPCriterionWeight[] {
    return this.localStorageDataSource.get<WPCriterionWeight[]>('wp-criteria-weights') || [];
  }

  public setWPCriterionWeights(criterionWeights: WPCriterionWeight[]): void {
    this.localStorageDataSource.set<WPCriterionWeight[]>('wp-criteria-weights', criterionWeights);
  }

  public getWPAlternativeVectors(): WPAlternativeVector[] {
    return this.localStorageDataSource.get<WPAlternativeVector[]>('wp-alternative-vectors') || [];
  }

  public setWPAlternativeVectors(alternativeVectors: WPAlternativeVector[]): void {
    this.localStorageDataSource.set<WPAlternativeVector[]>(
      'wp-alternative-vectors',
      alternativeVectors,
    );
  }
}
