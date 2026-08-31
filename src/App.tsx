import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import { weatherMock } from "./mocks/weatherMock"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useState } from "react"
import type { Coords } from "./types"


// Utilisation de weatherMock ou apiData
const USE_MOCK = true

function App() {
  const [coords, setCoords] = useState<Coords>({lat: 48.8566, lon: 2.3522})  

  const { data: apiData } = useQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => getWeather(coords),
    enabled: !USE_MOCK
  })

  const data = USE_MOCK ? weatherMock : apiData

  if (!data) {
    return <p>Chargement...</p>
  }

  // console.log(coords);
  

  return (
    <>
      <div className="flex flex-col gap-8">
        <Map coords={coords} onLocationChange={setCoords} />

        <CurrentWeather data={data} />

        <HourlyForecast data={data} />

        <DailyForecast data={data} />

        <AdditionalInfo data={data} />
      </div>
    </>
  )
}

export default App