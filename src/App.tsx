import { useQuery } from "@tanstack/react-query"
import { getGeocode, getWeather } from "./api"
import { weatherMock } from "./mocks/weatherMock"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useState } from "react"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { geocodeMock } from "./mocks/geocodeMock"
import { USE_MOCK } from "./config"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"

// "city" pour le geocodage - "custom" pour le click sur la map
type LocationMode = "city" | "custom"


function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 48.0365, lon: 2.5779 })
  const [location, setLocation] = useState('Chapelon')
  const [mapType, setMapType] = useState('clouds_new')
  const [locationMode, setLocationMode] = useState<LocationMode>("city")

  // GEOCODAGE
  const { data: apiGeocodeData } = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location),
    enabled: !USE_MOCK
  })

  const geocodeData = USE_MOCK
    ? geocodeMock.filter(city => city.name === location)
    : apiGeocodeData

  // COORDONNEES UTILISEES
  const weatherCoords = locationMode === "custom"
    ? coords
    : geocodeData?.[0]
      ? {
        lat: geocodeData[0].lat,
        lon: geocodeData[0].lon
      }
      : null

  // METEO
  const { data: apiWeatherData } = useQuery({
    queryKey: ['weather', weatherCoords?.lat, weatherCoords?.lon],
    queryFn: () => getWeather(weatherCoords!),
    enabled: !USE_MOCK && weatherCoords !== null
  })

  const weatherData = USE_MOCK ? weatherMock : apiWeatherData

  // HANDLERS
  const handleCityChange = (city: string) => {
    setLocation(city)
    setLocationMode("city")
  }

  const handleMapLocationChange = (newCoords: Coords) => {
    setCoords(newCoords)
    setLocationMode("custom")
  }


  if (!weatherData) {
    return <p>Chargement...</p>
  }

  // console.log(coords);


  return (
    <>
      <div className="flex flex-col gap-8">

        <div className="flex gap-8">
          <div className="flex gap-4">
            <h1 className="text-2xl font-semibold">Ville: </h1>
            <LocationDropdown
              location={location}
              locationMode={locationMode}
              onLocationChange={handleCityChange}
            />
          </div>

          <div className="flex gap-4">
            <h1 className="text-2xl font-semibold">Type Map: </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
        </div>


        <div className="relative z-0">
          <Map
            coords={weatherCoords ?? coords}
            onLocationChange={handleMapLocationChange}
            mapType={mapType}
          />
          <MapLegend mapType={mapType} />
        </div>

        <CurrentWeather data={weatherData} />

        <HourlyForecast data={weatherData} />

        <DailyForecast data={weatherData} />

        <AdditionalInfo data={weatherData} />
      </div>
    </>
  )
}

export default App