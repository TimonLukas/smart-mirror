import z from 'zod'
import { CoordinatesModel } from './coordinates'

export const LocationModel = z.object({
  id: z.string().lowercase().min(1),
  label: z.string().min(1),
  coordinates: CoordinatesModel,
})
export type LocationModel = z.infer<typeof LocationModel>
