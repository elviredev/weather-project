import type { AirPollution } from "@/schemas/airPollutionSchema"

export const airPollutionMock: AirPollution = {
    coord: {
        lon: 2.3522,
        lat: 48.8566
    },
    list: [
        {
            main: {
                aqi: 2
            },
            components: {
                co: 201.94,
                no: 0.01,
                no2: 8.34,
                o3: 68.66,
                so2: 0.64,
                pm2_5: 5.54,
                pm10: 7.19,
                nh3: 0.27
            },
            dt: 1788600000
        }
    ]
}