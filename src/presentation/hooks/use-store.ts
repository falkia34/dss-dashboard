'use client';

import { createMainStore, createWeightProductStore } from '@/presentation/stores';
import { useStore } from 'zustand';

export const mainStore = createMainStore();
export const weightProductStore = createWeightProductStore();

export { useStore };
