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
  calculateWPCriterionWeights: (state: WPCriterionWeightUIDto[]) => WPCriterionWeightUIDto[];
  setWPCriterionWeights: (state: WPCriterionWeightUIDto[]) => void;
  getWPCriterionWeights: () => void;
  calculateWPAlternativeVectors: (state: WPAlternativeVectorUIDto[]) => WPAlternativeVectorUIDto[];
  setWPAlternativeVectors: (state: WPAlternativeVectorUIDto[]) => void;
  getWPAlternativeVectors: () => void;
}

export function createWeightProductStore(initStates?: Partial<WeightProductStates>) {
  return createStore<WeightProductStates & WeightProductActions, [['zustand/immer', never]]>(
    immer((set, get) => ({
      wpCriterionWeights: [],
      wpAlternativeVectors: [],
      ...initStates,

      calculateWPCriterionWeights: (state: WPCriterionWeightUIDto[]) => {
        const sumOfWeights = state.reduce((acc, state) => acc + state.weight, 0);

        return state.map((state) => ({
          ...state,
          normalizedWeight: (state.weight / sumOfWeights) * (state.type === 'cost' ? -1 : 1),
        }));
      },
      setWPCriterionWeights: (state: WPCriterionWeightUIDto[]) => {
        const setWPCriterionWeights = clientContainer.get<SetWPCriterionWeights>(
          Symbols.SetWPCriterionWeights,
        );
        const newState = get().calculateWPCriterionWeights(state);

        setWPCriterionWeights.execute(newState.map(WPCriterionWeightUIMapper.toDomain));
        set({ wpCriterionWeights: newState });
      },
      getWPCriterionWeights: () => {
        mainStore.getState().getCriteria();

        const getWPCriterionWeights = clientContainer.get<GetWPCriterionWeights>(
          Symbols.GetWPCriterionWeights,
        );

        const criteria = mainStore.getState().criteria;
        const criterionWeights = getWPCriterionWeights.execute();
        const wpCriterionWeights = get().calculateWPCriterionWeights(
          criteria.map((criterion) =>
            WPCriterionWeightUIMapper.fromDomain(
              criterion,
              criterionWeights.find(
                (criterionWeight) => criterionWeight.criterionId === criterion.id,
              ) ?? new WPCriterionWeight(criterion.id, 0),
              {
                normalizedWeight: 0,
              },
            ),
          ),
        );

        set({ wpCriterionWeights: wpCriterionWeights });
      },
      calculateWPAlternativeVectors: (state: WPAlternativeVectorUIDto[]) => {
        get().getWPCriterionWeights();

        const criterionWeights = get().wpCriterionWeights;
        const sVectors = state.map((state) => {
          return criterionWeights.reduce(
            (acc, criterionWeight) =>
              acc * state.marks[criterionWeight.id] ** criterionWeight.normalizedWeight,
            1,
          );
        });
        const sumOfSVectors = sVectors.reduce((acc, sVector) => acc + sVector, 0);
        const vVectors = sVectors.map((sVector) => sVector / sumOfSVectors);

        return state.map((state, index) => {
          return {
            ...state,
            sVector: sVectors[index],
            vVector: vVectors[index],
          };
        });
      },
      setWPAlternativeVectors: (state: WPAlternativeVectorUIDto[]) => {
        const setWPAlternativeVectors = clientContainer.get<SetWPAlternativeVectors>(
          Symbols.SetWPAlternativeVectors,
        );

        setWPAlternativeVectors.execute(state.map(WPAlternativeVectorUIMapper.toDomain));
        set({ wpAlternativeVectors: state });
      },
      getWPAlternativeVectors: () => {
        mainStore.getState().getAlternatives();

        const getWPAlternativeVectors = clientContainer.get<GetWPAlternativeVectors>(
          Symbols.GetWPAlternativeVectors,
        );

        const alternatives = mainStore.getState().alternatives;
        const alternativeVectors = getWPAlternativeVectors.execute();
        const wpAlternativeVectors = alternatives.map((alternative) =>
          WPAlternativeVectorUIMapper.fromDomain(
            alternative,
            alternativeVectors.find(
              (alternativeVector) => alternativeVector.alternativeId === alternative.id,
            ) ?? new WPAlternativeVector(alternative.id, 0, 0),
          ),
        );
        set({ wpAlternativeVectors: wpAlternativeVectors });
      },
    })),
  );
}
