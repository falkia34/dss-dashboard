import { clientContainer } from '@/client-injection';
import { createStore } from 'zustand';
import { GetWPCriterionWeights, SetWPCriterionWeights } from '@/application/client';
import { immer } from 'zustand/middleware/immer';
import { mainStore } from '@/presentation/hooks';
import { Symbols } from '@/config';
import { WPCriterionWeight } from '@/domain/entities';
import { WPCriterionWeightUIDto, WPCriterionWeightUIMapper } from '@/presentation/dtos';

export interface WeightProductStates {
  wpCriterionWeights: WPCriterionWeightUIDto[];
}

export interface WeightProductActions {
  setWPCriterionWeights: (state: WPCriterionWeightUIDto[]) => void;
  getWPCriterionWeights: () => void;
}

export function createWeightProductStore(initStates?: Partial<WeightProductStates>) {
  return createStore<WeightProductStates & WeightProductActions, [['zustand/immer', never]]>(
    immer((set) => ({
      wpCriterionWeights: [],
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
    })),
  );
}
