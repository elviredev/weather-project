import { z } from "zod";

const geocodeSchema = z.array(
    z.object({
        name: z.string(),

        local_names: z
            .record(z.string(), z.string())
            .optional(),

        lat: z.number(),
        lon: z.number(),

        country: z.string(),

        state: z.string().optional(),
    })
)

export type Geocode = z.infer<typeof geocodeSchema>

export default geocodeSchema