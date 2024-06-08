export const Symbols = {
  // Use cases
  SetSidebarExtendedState: Symbol.for('SetSidebarExtendedState'),
  GetSidebarExtendedState: Symbol.for('GetSidebarExtendedState'),
  SetCriteria: Symbol.for('SetCriteria'),
  GetCriteria: Symbol.for('GetCriteria'),
  SetAlternatives: Symbol.for('SetAlternatives'),
  GetAlternatives: Symbol.for('GetAlternatives'),
  SetWPCriterionWeights: Symbol.for('SetWPCriterionWeights'),
  GetWPCriterionWeights: Symbol.for('GetWPCriterionWeights'),
  SetWPAlternativeVectors: Symbol.for('SetWPAlternativeVectors'),
  GetWPAlternativeVectors: Symbol.for('GetWPAlternativeVectors'),

  // Controllers
  NextAuthController: Symbol.for('NextAuthController'),

  // Repositories
  AlternativesRepository: Symbol.for('AlternativesRepository'),
  ClientRepository: Symbol.for('ClientRepository'),
  CriteriaRepository: Symbol.for('CriteriaRepository'),
  WeightProductRepository: Symbol.for('WeightProductRepository'),

  // Data sources
  LocalStorageDataSource: Symbol.for('LocalStorageDataSource'),
  SessionStorageDataSource: Symbol.for('SessionStorageDataSource'),
};
