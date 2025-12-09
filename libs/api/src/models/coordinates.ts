import { z } from 'zod'

export const CoordinatesModel = z.object({
  latitude: z.number(),
  longitude: z.number(),
})
export type CoordinatesModel = z.infer<typeof CoordinatesModel>
