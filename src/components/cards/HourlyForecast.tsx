import { type Weather } from "../../schemas/weatherSchemas"
import WeatherIcon from "../WeatherIcon"
import Card from "./Card"

type Props = {
  data: Weather
}

export default function HourlyForecast({ data }: Props) {
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