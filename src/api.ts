import weatherSchema from "./schemas/weatherSchemas"

const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({ lat, lon }: { lat: number, lon: number }) {
    
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&lang=fr&exclude=minutely,alerts&appid=${API_KEY}`)

    const data = await res.json()
    
    const result = weatherSchema.safeParse(data)

    if (!result.success) {
        console.error("❌ ERREUR ZOD :", result.error)
        console.log("📦 DONNÉES API :", data)

        throw result.error
    }

    return result.data
}