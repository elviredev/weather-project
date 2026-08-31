import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import { weatherMock } from "./mocks/weatherMock"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"


// Utilisation de weatherMock ou apiData
const USE_MOCK = true

function App() {

  /* Données API */
  const lat = 48.8566
  const lon = 2.3522

  const { data: apiData } = useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => getWeather({ lat, lon }),
    enabled: !USE_MOCK
  })

  const data = USE_MOCK ? weatherMock : apiData

  if (!data) {
    return <p>Chargement...</p>
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <CurrentWeather data={data} />

        <HourlyForecast data={data} />

        <DailyForecast data={data} />

        <AdditionalInfo data={data} />
      </div>
    </>
  )
}

export default App