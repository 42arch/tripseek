import { z } from 'zod'

export const formSchema = z.object({
  departure: z
    .string()
    .min(1, {
      message: '必须输入出发地！'
    })
    .max(50)
    .nonempty(),
  destination: z.string(),
  budget: z.coerce.number().optional(),
  duration: z.coerce.number().optional(),
  personNumber: z.enum(['solo', 'duo', 'family', 'group']),
  ps: z.string()
})

export const attractionSchema = z.object({
  name: z.string(),
  description: z.string(),
  coordinates: z.tuple([z.number(), z.number()])
})

export type Attraction = z.infer<typeof attractionSchema>

export type FormParam = z.infer<typeof formSchema>

export const ItinerarySchema = z.object({
  day: z.string(),
  from: z.string(),
  destination: z.string(),
  coordinates: z.tuple([z.number(), z.number()]),
  description: z.string(),
  transportation: z.string(),
  budget: z.number(),
  attractions: z.array(attractionSchema)
})

export type Itinerary = z.infer<typeof ItinerarySchema>

export const planSchema = z.object({
  summary: z.string(),
  itinerary: z.array(ItinerarySchema),
  budget: z.array(
    z.object({
      category: z.string(),
      amount: z.number(),
      summary: z.string()
    })
  )
})

export type Plan = z.infer<typeof planSchema>
