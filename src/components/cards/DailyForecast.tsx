import Card from './Card'
import { type Weather } from '../../schemas/weatherSchemas'
import WeatherIcon from '../WeatherIcon'

type Props = {
    data: Weather
}

export default function DailyForecast({ data }: Props) {

    return (
        <Card title="Prévisions journalière" childrenClassName='flex flex-col gap-4'>

            {data?.daily.map((day) => (
                <div key={day.dt} className='flex justify-between'>
                    <p className='w-9'>
                        {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                            weekday: "short"
                        })}
                    </p>
                    <WeatherIcon
                        src={day.weather[0].icon}
                    />
                    <p>{Math.round(day.temp.day)}°C</p>
                    <p className='text-gray-500/75'>{Math.round(day.temp.min)}°C</p>
                    <p className='text-gray-500/75'>{Math.round(day.temp.max)}°C</p>
                </div>
            ))}

        </Card>
    )
}