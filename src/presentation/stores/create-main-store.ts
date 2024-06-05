import { clientContainer } from '@/client-injection';
import { createStore } from 'zustand';
import { Criterion } from '@/domain/entities';
import {
  GetCriteria,
  GetSidebarExtendedState,
  SetCriteria,
  SetSidebarExtendedState,
} from '@/application/client';
import { immer } from 'zustand/middleware/immer';
import { Symbols } from '@/config';

export interface MainStates {
  sidebarOpened: boolean;
  sidebarExtended: boolean;
  sidebarHovered: boolean;
  criteria: Criterion[];
}

export interface MainActions {
  setSidebarOpenedState: (state: boolean) => void;
  getSidebarExtendedState: () => void;
  setSidebarExtendedState: (state: boolean) => void;
  setSidebarHoveredState: (state: boolean) => void;
  setCriteria: (state: Criterion[]) => void;
  getCriteria: () => void;
}

export function createMainStore(initStates?: Partial<MainStates>) {
  return createStore<MainStates & MainActions, [['zustand/immer', never]]>(
    immer((set) => ({
      sidebarOpened: false,
      sidebarExtended: true,
      sidebarHovered: false,
      criteria: [],
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
      setCriteria: (state: Criterion[]) => {
        const setCriteria = clientContainer.get<SetCriteria>(Symbols.SetCriteria);

        setCriteria.execute(state);
        set({ criteria: state });
      },
      getCriteria: () => {
        const getCriteria = clientContainer.get<GetCriteria>(Symbols.GetCriteria);

        set({ criteria: getCriteria.execute() });
      },
    })),
  );
}
