import { z } from 'zod'

export const planSchema = z.object({
  summary: z.string(),
  itinerary: z.array(
    z.object({
      day: z.string(),
      from: z.string(),
      destination: z.string(),
      coordinates: z.array(z.number(), z.number()),
      description: z.string(),
      transportation: z.string(),
      budget: z.number(),
      attractions: z.array(
        z.object({
          name: z.string(),
          description: z.string(),
          coordinates: z.array(z.number(), z.number())
        })
      )
    })
  ),
  budget: z.array(
    z.object({
      category: z.string(),
      amount: z.number(),
      summary: z.string()
    })
  )
})

export type Plan = z.infer<typeof planSchema>
