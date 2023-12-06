import 'reflect-metadata';
import { Container } from 'inversify';
import { GetSidebarExtendedState, SetSidebarExtendedState } from '@/application/client';
import {
  LocalStorageDataSource,
  LocalStorageDataSourceImpl,
  SessionStorageDataSource,
  SessionStorageDataSourceImpl,
} from '@/infrastructure/datasources/client';
import { ClientRepository } from '@/domain/repositories';
import { ClientRepositoryImpl } from '@/infrastructure/repositories';
import { Symbols } from '@/config';

export const clientContainer = new Container();

// Use cases
clientContainer
  .bind<SetSidebarExtendedState>(Symbols.SetSidebarExtendedState)
  .to(SetSidebarExtendedState);
clientContainer
  .bind<GetSidebarExtendedState>(Symbols.GetSidebarExtendedState)
  .to(GetSidebarExtendedState);

// Repositories
clientContainer.bind<ClientRepository>(Symbols.ClientRepository).to(ClientRepositoryImpl);

// Data sources
clientContainer
  .bind<LocalStorageDataSource>(Symbols.LocalStorageDataSource)
  .to(LocalStorageDataSourceImpl);
clientContainer
  .bind<SessionStorageDataSource>(Symbols.SessionStorageDataSource)
  .to(SessionStorageDataSourceImpl);
