import {
  AlternativeUIDto,
  AlternativeUIMapper,
  CriterionUIDto,
  CriterionUIMapper,
} from '@/presentation/dtos';
import { clientContainer } from '@/client-injection';
import { createStore } from 'zustand';
import {
  GetAlternatives,
  GetCriteria,
  GetSidebarExtendedState,
  SetAlternatives,
  SetCriteria,
  SetSidebarExtendedState,
} from '@/application/client';
import { immer } from 'zustand/middleware/immer';
import { Symbols } from '@/config';

export interface MainStates {
  sidebarOpened: boolean;
  sidebarExtended: boolean;
  sidebarHovered: boolean;
  criteria: CriterionUIDto[];
  alternatives: AlternativeUIDto[];
}

export interface MainActions {
  setSidebarOpenedState: (state: boolean) => void;
  getSidebarExtendedState: () => void;
  setSidebarExtendedState: (state: boolean) => void;
  setSidebarHoveredState: (state: boolean) => void;
  setCriteria: (state: CriterionUIDto[]) => void;
  getCriteria: () => void;
  setAlternatives: (state: AlternativeUIDto[]) => void;
  getAlternatives: () => void;
}

export function createMainStore(initStates?: Partial<MainStates>) {
  return createStore<MainStates & MainActions, [['zustand/immer', never]]>(
    immer((set) => ({
      sidebarOpened: false,
      sidebarExtended: true,
      sidebarHovered: false,
      criteria: [],
      alternatives: [],
      ...initStates,

      setSidebarOpenedState: (state: boolean) => set(() => ({ sidebarOpened: state })),
      getSidebarExtendedState: () => {
        const getSidebarExtendedState = clientContainer.get<GetSidebarExtendedState>(
          Symbols.GetSidebarExtendedState,
        );

        set({ sidebarExtended: getSidebarExtendedState.execute() });
      },
      setSidebarExtendedState: (state: boolean) => {
        const setSidebarExtendedState = clientContainer.get<SetSidebarExtendedState>(
          Symbols.SetSidebarExtendedState,
        );

        setSidebarExtendedState.execute(state);
        set({ sidebarExtended: state });
      },
      setSidebarHoveredState: (state: boolean) => set(() => ({ sidebarHovered: state })),
      setCriteria: (state: CriterionUIDto[]) => {
        const setCriteria = clientContainer.get<SetCriteria>(Symbols.SetCriteria);

        setCriteria.execute(state.map(CriterionUIMapper.toDomain));
        set({ criteria: state });
      },
      getCriteria: () => {
        const getCriteria = clientContainer.get<GetCriteria>(Symbols.GetCriteria);
        const criteria = getCriteria.execute();

        set({
          criteria: criteria.map((criterion) =>
            CriterionUIMapper.fromDomain(criterion, { isNew: false }),
          ),
        });
      },
      setAlternatives: (state: AlternativeUIDto[]) => {
        const setAlternatives = clientContainer.get<SetAlternatives>(Symbols.SetAlternatives);

        setAlternatives.execute(state.map(AlternativeUIMapper.toDomain));
        set({ alternatives: state });
      },
      getAlternatives: () => {
        const getAlternatives = clientContainer.get<GetAlternatives>(Symbols.GetAlternatives);
        const alternatives = getAlternatives.execute();

        set({
          alternatives: alternatives.map((alternative) =>
            AlternativeUIMapper.fromDomain(alternative, { isNew: false }),
          ),
        });
      },
    })),
  );
}
