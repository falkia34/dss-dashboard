import type { LocalStorageDataSource } from '@/infrastructure/datasources/client';
import { Alternative } from '@/domain/entities';
import { AlternativesRepository } from '@/domain/repositories';
import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';

@injectable()
export class AlternativesRepositoryImpl implements AlternativesRepository {
  private readonly localStorageDataSource: LocalStorageDataSource;

  public constructor(
    @inject(Symbols.LocalStorageDataSource)
    localStorageDataSource: LocalStorageDataSource,
  ) {
    this.localStorageDataSource = localStorageDataSource;
  }

  public getAlternatives(): Alternative[] {
    return this.localStorageDataSource.get<Alternative[]>('alternatives') || [];
  }

  public setAlternatives(alternatives: Alternative[]): void {
    this.localStorageDataSource.set<Alternative[]>('alternatives', alternatives);
  }
}
