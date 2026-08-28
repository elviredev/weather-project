import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import Card from "./components/cards/Card"
import { weatherMock } from "./mocks/weatherMock"
import DailyForecast from "./components/cards/DailyForecast"

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

  if(!data) {
    return <p>Chargement...</p>
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <Card title="Météo actuelle">
          {JSON.stringify(data?.current ?? "Chargement...").slice(0, 100)}
        </Card>
        <Card title="Prévisions horaires (48h)">
          {JSON.stringify(data?.hourly ?? "Chargement...").slice(0, 100)}
        </Card>
        <DailyForecast data={data} />
      </div>
    </>
  )
}

export default App