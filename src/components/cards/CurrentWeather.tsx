import Card from './Card'
import { type Weather } from '../../schemas/weatherSchemas'
import WeatherIcon from '../WeatherIcon'

type Props = {
    data: Weather
}

export default function CurrentWeather({ data }: Props) {    

    return (
        <Card
            title="Météo actuelle"
            childrenClassName='flex flex-col items-center gap-6'
        >
            <div className='flex flex-col gap-2 items-center'>
                <h2 className='text-6xl font-semibold text-center'>
                    {Math.round(data.current.temp)}°C
                </h2>
                <WeatherIcon
                    src={data.current.weather[0].icon}
                    className='size-14'
                />
                <h3 className='capitalize text-xl'>
                    {data.current.weather[0].description}
                </h3>
            </div>

            <div className='flex flex-col gap-2'>
                <p className='text-xl text-center'>Heure locale:</p>
                <h3 className='text-4xl font-semibold text-center'>
                    {new Intl.DateTimeFormat("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                        timeZone: data.timezone
                    }).format(new Date(data.current.dt * 1000))}
                </h3>
            </div>

            <div className='flex justify-between w-full'>
                <div className="flex flex-col gap-2 items-center">
                    <p className='text-gray-500'>Ressenti</p>
                    <p>{Math.round(data.current.feels_like)}°C</p>
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <p className='text-gray-500'>Humidité</p>
                    <p>{data.current.humidity}%</p>
                </div>

                <div className="flex flex-col gap-2 items-center">
                    <p className='text-gray-500'>Vent</p>
                    <p>{Math.round(data.current.wind_speed * 1.609344)} km/h</p>
                </div>
            </div>
        </Card>
    )
}