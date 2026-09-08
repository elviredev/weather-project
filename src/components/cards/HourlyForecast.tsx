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
        <div
          key={hour.dt}
          className="flex flex-col 2xl:justify-between gap-2 items-center p-2"
        >
          <p className="2xl:scale-110">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              timeStyle: "short"
            })}
          </p>
          <WeatherIcon
            className="2xl:size-10"
            src={hour.weather[0].icon}
          />
          <p className="2xl:scale-110">{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  )
}