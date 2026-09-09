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
import MobileHeader from "./components/MobileHeader"
import LightDarkToggle from "./components/LightDarkToggle"


// "city" pour le geocodage - "custom" pour le click sur la map
type LocationMode = "city" | "custom"


function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 48.0365, lon: 2.5779 })
  const [location, setLocation] = useState('Chapelon')
  const [mapType, setMapType] = useState('clouds_new')
  const [locationMode, setLocationMode] = useState<LocationMode>("city")
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

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
      <MobileHeader setIsSidePanelOpen={setIsSidePanelOpen} />
      <div
        className="flex flex-col gap-8 pt-4 p-8 xs:pt-8 w-full lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-280"
      >
        <div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold">Ville: </h1>
            <LocationDropdown
              location={location}
              locationMode={locationMode}
              onLocationChange={handleCityChange}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold whitespace-nowrap">Type Map: </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>

          <div className="ml-auto flex gap-4 items-center">
            <div className="hidden xs:block">
              <LightDarkToggle />
            </div>
            <button
              onClick={() => setIsSidePanelOpen(true)}
              className="hidden xs:block"
            >
              <Hamburger className="size-6 lg:hidden" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4" >

          <div className="relative z-0 h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <Map
              coords={coords}
              onLocationChange={handleMapLocationChange}
              mapType={mapType}
            />
            <MapLegend mapType={mapType} />
          </div>

          <div className="col-span-1 2xl:row-span-2 order-2">
            <CurrentWeather
              data={weatherData}
              isLoading={isWeatherLoading}
            />
          </div>
          
          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
            <DailyForecast
              data={weatherData}
              isLoading={isWeatherLoading}
            />
          </div>

          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
            <HourlyForecast
              data={weatherData}
              isLoading={isWeatherLoading}
            />
          </div>

          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
            <AdditionalInfo
              data={weatherData}
              isLoading={isWeatherLoading}
            />
          </div>

        </div>

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