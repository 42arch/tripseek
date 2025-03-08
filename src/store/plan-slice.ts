import { Itinerary, Plan } from '@/types'
import { StateCreator } from 'zustand'

export interface PlanSlice {
  plan: Plan | null
  setPlan: (plan: Plan) => void
  currentItinerary: Itinerary | null
  setCurrentItinerary: (itinerary: Itinerary | null) => void
}

export const createPlanSilce: StateCreator<PlanSlice, [], [], PlanSlice> = (
  set
) => ({
  plan: null,
  setPlan: (plan: Plan) => set({ plan: plan }),
  currentItinerary: null,
  setCurrentItinerary: (itinerary: Itinerary | null) =>
    set({ currentItinerary: itinerary })
})
