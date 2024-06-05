import { clientContainer } from '@/client-injection';
import { createStore } from 'zustand';
import {
  GetWPAlternativeVectors,
  GetWPCriterionWeights,
  SetWPAlternativeVectors,
  SetWPCriterionWeights,
} from '@/application/client';
import { immer } from 'zustand/middleware/immer';
import { mainStore } from '@/presentation/hooks';
import { Symbols } from '@/config';
import { WPAlternativeVector, WPCriterionWeight } from '@/domain/entities';
import {
  AlternativeUIMapper,
  WPAlternativeVectorUIDto,
  WPAlternativeVectorUIMapper,
  WPCriterionWeightUIDto,
  WPCriterionWeightUIMapper,
} from '@/presentation/dtos';

export interface WeightProductStates {
  wpCriterionWeights: WPCriterionWeightUIDto[];
  wpAlternativeVectors: WPAlternativeVectorUIDto[];
}

export interface WeightProductActions {
  setWPCriterionWeights: (state: WPCriterionWeightUIDto[]) => void;
  getWPCriterionWeights: () => void;
  calculateWPAlternativeVectors: () => void;
  setWPAlternativeVectors: (state: WPAlternativeVectorUIDto[]) => void;
  getWPAlternativeVectors: () => void;
}

export function createWeightProductStore(initStates?: Partial<WeightProductStates>) {
  return createStore<WeightProductStates & WeightProductActions, [['zustand/immer', never]]>(
    immer((set, get) => ({
      wpCriterionWeights: [],
      wpAlternativeVectors: [],
      ...initStates,

      setWPCriterionWeights: (state: WPCriterionWeightUIDto[]) => {
        const setWPCriterionWeights = clientContainer.get<SetWPCriterionWeights>(
          Symbols.SetWPCriterionWeights,
        );
        const sumOfWeights = state.reduce((acc, state) => acc + state.weight, 0);
        const newState = state.map((state) => ({
          ...state,
          normalizedWeight: (state.weight / sumOfWeights) * (state.type === 'cost' ? -1 : 1),
        }));

        setWPCriterionWeights.execute(newState.map(WPCriterionWeightUIMapper.toDomain));
        set({ wpCriterionWeights: newState });
      },
      getWPCriterionWeights: () => {
        const getWPCriterionWeights = clientContainer.get<GetWPCriterionWeights>(
          Symbols.GetWPCriterionWeights,
        );

        mainStore.getState().getCriteria();

        const criteria = mainStore.getState().criteria;
        const criterionWeights = getWPCriterionWeights.execute();
        const sumOfWeights = criterionWeights.reduce(
          (acc, criterionWeight) => acc + criterionWeight.weight,
          0,
        );
        const wpCriterionWeights = criteria.map((criterion) => {
          const criterionWeight = criterionWeights.find(
            (criterionWeight) => criterionWeight.criterionId === criterion.id,
          );

          return WPCriterionWeightUIMapper.fromDomain(
            criterion,
            criterionWeight ?? new WPCriterionWeight(criterion.id, 0),
            {
              normalizedWeight:
                ((criterionWeight?.weight || 0) / sumOfWeights) *
                (criterion.type === 'cost' ? -1 : 1),
            },
          );
        });
        set({ wpCriterionWeights: wpCriterionWeights });
      },
      calculateWPAlternativeVectors: () => {
        const setWPAlternativeVectors = clientContainer.get<SetWPAlternativeVectors>(
          Symbols.SetWPAlternativeVectors,
        );

        mainStore.getState().getAlternatives();
        get().getWPCriterionWeights();

        const alternatives = mainStore.getState().alternatives;
        const criterionWeights = get().wpCriterionWeights;

        const sVectors = alternatives.map((alternative) => {
          return criterionWeights.reduce(
            (acc, criterionWeight) =>
              acc *
              alternative.marks[criterionWeight.name.toLowerCase()] **
                criterionWeight.normalizedWeight,
            1,
          );
        });
        const sumOfSVectors = sVectors.reduce((acc, sVector) => acc + sVector, 0);
        const vVectors = sVectors.map((sVector) => sVector / sumOfSVectors);

        const wpAlternativeVectors = alternatives.map((alternative, index) => {
          return WPAlternativeVectorUIMapper.fromDomain(alternative, {
            alternativeId: alternative.id,
            sVector: sVectors[index],
            vVector: vVectors[index],
          });
        });

        setWPAlternativeVectors.execute(
          wpAlternativeVectors.map(WPAlternativeVectorUIMapper.toDomain),
        );
        set({ wpAlternativeVectors: wpAlternativeVectors });
      },
      setWPAlternativeVectors: (state: WPAlternativeVectorUIDto[]) => {
        const setWPAlternativeVectors = clientContainer.get<SetWPAlternativeVectors>(
          Symbols.SetWPAlternativeVectors,
        );

        setWPAlternativeVectors.execute(state.map(WPAlternativeVectorUIMapper.toDomain));
        set({ wpAlternativeVectors: state });
      },
      getWPAlternativeVectors: () => {
        const getWPAlternativeVectors = clientContainer.get<GetWPAlternativeVectors>(
          Symbols.GetWPAlternativeVectors,
        );

        mainStore.getState().getAlternatives();

        const alternatives = mainStore.getState().alternatives.map(AlternativeUIMapper.toDomain);
        const alternativeVectors = getWPAlternativeVectors.execute();
        const wpAlternativeVectors = alternatives.map((alternative) => {
          const alternativeVector = alternativeVectors.find(
            (alternativeVector) => alternativeVector.alternativeId === alternative.id,
          );

          return WPAlternativeVectorUIMapper.fromDomain(
            alternative,
            alternativeVector ?? new WPAlternativeVector(alternative.id, 0, 0),
          );
        });
        set({ wpAlternativeVectors: wpAlternativeVectors });
      },
    })),
  );
}
