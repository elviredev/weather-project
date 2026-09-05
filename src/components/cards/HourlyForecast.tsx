import { type Weather } from "../../schemas/weatherSchemas"
import HourlySkeleton from "../skeletons/HourlySkeleton"
import WeatherIcon from "../WeatherIcon"
import Card from "./Card"

type Props = {
  data: Weather | undefined
  isLoading: boolean
}

export default function HourlyForecast({ data, isLoading }: Props) {

  if (isLoading || !data) {
    return (
      <HourlySkeleton />
    )
  }

  return (
    <Card title="Prévisions horaires (48h)" childrenClassName="flex gap-6 overflow-x-scroll">
      {data.hourly.map((hour) => (
        <div key={hour.dt} className="flex flex-col gap-2 items-center p-2">
          <p>{new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
            timeStyle: "short"
          })}</p>
          <WeatherIcon
            src={hour.weather[0].icon}
          />
          <p>{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  )
}