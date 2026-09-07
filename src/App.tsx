import { useQuery } from "@tanstack/react-query"
import { getGeocode, getWeather } from "./api"
import { weatherMock } from "./mocks/weatherMock"
import DailyForecast from "./components/cards/DailyForecast"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useEffect, useState } from "react"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import { geocodeMock } from "./mocks/geocodeMock"
import { USE_MOCK } from "./config"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"
import SidePanel from "./components/SidePanel"
import Hamburger from './assets/hamburger.svg?react'


// "city" pour le geocodage - "custom" pour le click sur la map
type LocationMode = "city" | "custom"


function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 48.0365, lon: 2.5779 })
  const [location, setLocation] = useState('Chapelon')
  const [mapType, setMapType] = useState('clouds_new')
  const [locationMode, setLocationMode] = useState<LocationMode>("city")
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true)

  // GEOCODAGE
  const { data: apiGeocodeData } = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location),
    enabled: !USE_MOCK
  })

  const geocodeData = USE_MOCK
    ? geocodeMock.find(city => city.name === location)
    : apiGeocodeData?.[0]

  // METEO
  const { data: apiWeatherData, isLoading: isWeatherLoading } = useQuery({
    queryKey: ['weather', coords.lat, coords.lon],
    queryFn: () => getWeather(coords),
    enabled: !USE_MOCK
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

  useEffect(() => {
    if (locationMode !== "city") return
    if (!geocodeData) return

    setCoords({
      lat: geocodeData.lat,
      lon: geocodeData.lon
    })

  }, [geocodeData, locationMode])


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

          <button onClick={() => setIsSidePanelOpen(true)}>
            <Hamburger className="size-8 invert ml-auto" />
          </button>
        </div>
        <div className="relative z-0">
          <Map
            coords={coords}
            onLocationChange={handleMapLocationChange}
            mapType={mapType}
          />
          <MapLegend mapType={mapType} />
        </div>
        <CurrentWeather
          data={weatherData}
          isLoading={isWeatherLoading}
        />
        <HourlyForecast
          data={weatherData}
          isLoading={isWeatherLoading}
        />
        <DailyForecast
          data={weatherData}
          isLoading={isWeatherLoading}
        />
        <AdditionalInfo
          data={weatherData}
          isLoading={isWeatherLoading}
        />
      </div>

      <SidePanel
        coords={coords}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />

    </>
  )
}

export default App