import Card from './Card'
import weatherSchema, { type Weather } from '../../schemas/weatherSchemas'

type Props = {
    data: Weather
}

export default function DailyForecast({ data }: Props) {



    return (
        <Card title="Prévisions journalière">
            <div className='flex flex-col gap-4'>
                {data?.daily.map((day) => (
                    <div key={day.dt} className='flex justify-between'>
                        <p>{day.temp.day}°C</p>
                    </div>
                ))}
            </div>
        </Card>
    )
}