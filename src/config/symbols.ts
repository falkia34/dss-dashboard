export const Symbols = {
  // Use cases
  SetSidebarExtendedState: Symbol.for('SetSidebarExtendedState'),
  GetSidebarExtendedState: Symbol.for('GetSidebarExtendedState'),
  SetCriteria: Symbol.for('SetCriteria'),
  GetCriteria: Symbol.for('GetCriteria'),
  SetAlternatives: Symbol.for('SetAlternatives'),
  GetAlternatives: Symbol.for('GetAlternatives'),

  // Repositories
  AlternativesRepository: Symbol.for('AlternativesRepository'),
  ClientRepository: Symbol.for('ClientRepository'),
  CriteriaRepository: Symbol.for('CriteriaRepository'),

  // Data sources
  LocalStorageDataSource: Symbol.for('LocalStorageDataSource'),
  SessionStorageDataSource: Symbol.for('SessionStorageDataSource'),
};
