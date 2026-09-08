import Card from './Card'
import { type Weather } from '../../schemas/weatherSchemas'
import Sunrise from "../../assets/sunrise.svg?react"
import Sunset from '../../assets/sunset.svg?react'
import Cloud from '../../assets/cloud.svg?react'
import Uv from '../../assets/uv.svg?react'
import Wind from '../../assets/wind.svg?react'
import Pressure from '../../assets/pressure.svg?react'
import UpArrow from '../../assets/uparrow.svg?react'
import AdditionalInfoSkeleton from '../skeletons/AdditionalInfoSkeleton'

type Props = {
    data: Weather | undefined
    isLoading: boolean
}

export default function AdditionalInfo({ data, isLoading }: Props) {

    if (isLoading || !data) {
        return (
            <AdditionalInfoSkeleton />
        )
    }

    return (
        <Card
            title='Informations complémentaires'
            childrenClassName='grid grid-cols-1 md:grid-cols-2 gap-8'
        >
            {rows.map(({ label, value, Icon }) => (
                <div key={value} className='flex justify-between'>
                    <div className='flex gap-4'>
                        <span className='text-gray-500'>{label}</span>
                        <Icon className='size-8 invert' />
                    </div>
                    <span>
                        <FormatComponent
                            value={value}
                            number={data.current[value]}
                        />
                    </span>
                </div>
            ))}
        </Card>
    )
}

function FormatComponent({ value, number }: { value: string, number: number }) {

    if (value === "sunrise" || value === "sunset") {
        return new Date(number * 1000).toLocaleTimeString(undefined, {
            timeStyle: "short"
        })
    }

    if (value === "wind_deg") return <UpArrow className='size-8 invert' style={{ transform: `rotate(${number}deg)` }} />

    return number
}

const rows = [
    {
        label: "Couverture nuageuse (%)",
        value: 'clouds',
        Icon: Cloud
    },
    {
        label: "UV Index",
        value: 'uvi',
        Icon: Uv
    },
    {
        label: "Vent (direction)",
        value: 'wind_deg',
        Icon: Wind
    },
    {
        label: "Pression Atmosphérique (hPa)",
        value: 'pressure',
        Icon: Pressure
    },
    {
        label: "Lever du soleil",
        value: 'sunrise',
        Icon: Sunrise
    },
    {
        label: "Coucher du soleil",
        value: 'sunset',
        Icon: Sunset
    },

] as const