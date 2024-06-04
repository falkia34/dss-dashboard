import { Alternative } from '@/domain/entities';
import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { UseCase } from '@/application/shared';
import type { AlternativesRepository } from '@/domain/repositories';

export type SetAlternativesParams = [alternatives: Alternative[]];

@injectable()
export class SetAlternatives implements UseCase<void, SetAlternativesParams> {
  private readonly alternativesRepository: AlternativesRepository;

  public constructor(
    @inject(Symbols.AlternativesRepository)
    alternativesRepository: AlternativesRepository,
  ) {
    this.alternativesRepository = alternativesRepository;
  }

  public execute(alternatives: Alternative[]): void {
    this.alternativesRepository.setAlternatives(alternatives);
  }
}
