'use client';

import 'reflect-metadata';
import { Container } from 'inversify';
import {
  GetAlternatives,
  GetCriteria,
  GetSidebarExtendedState,
  SetAlternatives,
  SetCriteria,
  SetSidebarExtendedState,
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
} from '@/domain/repositories';
import {
  AlternativesRepositoryImpl,
  ClientRepositoryImpl,
  CriteriaRepositoryImpl,
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

// Repositories
clientContainer
  .bind<AlternativesRepository>(Symbols.AlternativesRepository)
  .to(AlternativesRepositoryImpl);
clientContainer.bind<ClientRepository>(Symbols.ClientRepository).to(ClientRepositoryImpl);
clientContainer.bind<CriteriaRepository>(Symbols.CriteriaRepository).to(CriteriaRepositoryImpl);

// Data sources
clientContainer
  .bind<LocalStorageDataSource>(Symbols.LocalStorageDataSource)
  .to(LocalStorageDataSourceImpl);
clientContainer
  .bind<SessionStorageDataSource>(Symbols.SessionStorageDataSource)
  .to(SessionStorageDataSourceImpl);
