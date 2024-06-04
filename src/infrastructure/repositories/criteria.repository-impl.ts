import type { LocalStorageDataSource } from '@/infrastructure/datasources/client';
import { Criterion } from '@/domain/entities';
import { CriteriaRepository } from '@/domain/repositories';
import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';

@injectable()
export class CriteriaRepositoryImpl implements CriteriaRepository {
  private readonly localStorageDataSource: LocalStorageDataSource;

  public constructor(
    @inject(Symbols.LocalStorageDataSource)
    localStorageDataSource: LocalStorageDataSource,
  ) {
    this.localStorageDataSource = localStorageDataSource;
  }

  public getCriteria(): Criterion[] {
    return this.localStorageDataSource.get<Criterion[]>('criteria') || [];
  }

  public setCriteria(criteria: Criterion[]): void {
    this.localStorageDataSource.set<Criterion[]>('criteria', criteria);
  }
}
