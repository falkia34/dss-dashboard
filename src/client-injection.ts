'use client';

import 'reflect-metadata';
import { Container } from 'inversify';
import {
  GetAlternatives,
  GetCriteria,
  GetSidebarExtendedState,
  GetWPAlternativeVectors,
  GetWPCriterionWeights,
  SetAlternatives,
  SetCriteria,
  SetSidebarExtendedState,
  SetWPAlternativeVectors,
  SetWPCriterionWeights,
} from '@/application/client';
import {
  LocalStorageDataSource,
  LocalStorageDataSourceImpl,
  SessionStorageDataSource,
  SessionStorageDataSourceImpl,
} from '@/infrastructure/datasources/client';
import {
  AlternativesRepository,
  ClientRepository,
  CriteriaRepository,
  WeightProductRepository,
} from '@/domain/repositories';
import {
  AlternativesRepositoryImpl,
  ClientRepositoryImpl,
  CriteriaRepositoryImpl,
  WeightProductRepositoryImpl,
} from '@/infrastructure/repositories';
import { Symbols } from '@/config';

export const clientContainer = new Container();

// Use cases
clientContainer
  .bind<SetSidebarExtendedState>(Symbols.SetSidebarExtendedState)
  .to(SetSidebarExtendedState);
clientContainer
  .bind<GetSidebarExtendedState>(Symbols.GetSidebarExtendedState)
  .to(GetSidebarExtendedState);
clientContainer.bind<SetCriteria>(Symbols.SetCriteria).to(SetCriteria);
clientContainer.bind<GetCriteria>(Symbols.GetCriteria).to(GetCriteria);
clientContainer.bind<SetAlternatives>(Symbols.SetAlternatives).to(SetAlternatives);
clientContainer.bind<GetAlternatives>(Symbols.GetAlternatives).to(GetAlternatives);
clientContainer
  .bind<SetWPCriterionWeights>(Symbols.SetWPCriterionWeights)
  .to(SetWPCriterionWeights);
clientContainer
  .bind<GetWPCriterionWeights>(Symbols.GetWPCriterionWeights)
  .to(GetWPCriterionWeights);
clientContainer
  .bind<GetWPAlternativeVectors>(Symbols.GetWPAlternativeVectors)
  .to(GetWPAlternativeVectors);
clientContainer
  .bind<SetWPAlternativeVectors>(Symbols.SetWPAlternativeVectors)
  .to(SetWPAlternativeVectors);

// Repositories
clientContainer
  .bind<AlternativesRepository>(Symbols.AlternativesRepository)
  .to(AlternativesRepositoryImpl);
clientContainer.bind<ClientRepository>(Symbols.ClientRepository).to(ClientRepositoryImpl);
clientContainer.bind<CriteriaRepository>(Symbols.CriteriaRepository).to(CriteriaRepositoryImpl);
clientContainer
  .bind<WeightProductRepository>(Symbols.WeightProductRepository)
  .to(WeightProductRepositoryImpl);

// Data sources
clientContainer
  .bind<LocalStorageDataSource>(Symbols.LocalStorageDataSource)
  .to(LocalStorageDataSourceImpl);
clientContainer
  .bind<SessionStorageDataSource>(Symbols.SessionStorageDataSource)
  .to(SessionStorageDataSourceImpl);
