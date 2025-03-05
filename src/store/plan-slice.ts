import { Plan } from '@/types'
import { StateCreator } from 'zustand'

export interface PlanSlice {
  plan: Plan | null
  setPlan: (plan: Plan) => void
}

export const createPlanSilce: StateCreator<PlanSlice, [], [], PlanSlice> = (
  set
) => ({
  plan: null,
  setPlan: (plan: Plan) => set({ plan: plan })
})
