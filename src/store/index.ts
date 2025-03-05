import { create } from 'zustand'
import { createPlanSilce, PlanSlice } from './plan-slice'

export const usePlanStore = create<PlanSlice>()((...a) => ({
  ...createPlanSilce(...a)
}))
