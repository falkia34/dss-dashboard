import { Alternative } from '@/domain/entities';
import { inject, injectable } from 'inversify';
import { Symbols } from '@/config';
import { UseCase } from '@/application/shared';
import type { AlternativesRepository } from '@/domain/repositories';

@injectable()
export class GetAlternatives implements UseCase<Alternative[]> {
  private readonly alternativesRepository: AlternativesRepository;

  public constructor(
    @inject(Symbols.AlternativesRepository)
    alternativesRepository: AlternativesRepository,
  ) {
    this.alternativesRepository = alternativesRepository;
  }

  public execute(): Alternative[] {
    return this.alternativesRepository.getAlternatives();
  }
}
