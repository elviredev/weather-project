import { useQuery } from "@tanstack/react-query"

import { getAirPollution } from "@/api"
import type { Coords } from "@/types"

import { airPollutionMock } from "@/mocks/airPollutionMock"
import { USE_MOCK } from "@/config"

import Card from "./cards/Card"
import { Slider } from "./ui/slider"
import clsx from "clsx"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import Information from '../assets/information.svg?react'
import Chevron from '../assets/ChevronLeft.svg?react'
import type { Dispatch, SetStateAction } from "react"
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton"




type Props = {
    coords: Coords
    isSidePanelOpen: boolean
    setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>
}

export default function SidePanel({ coords, isSidePanelOpen, setIsSidePanelOpen }: Props) {

    const { data: airPollutionData, isLoading } = useQuery({
        queryKey: ['pollution', coords.lat, coords.lon],
        queryFn: () => getAirPollution(coords),
        enabled: !USE_MOCK
    })

    const pollutionData = USE_MOCK
        ? airPollutionMock
        : airPollutionData

    return (
        <div
            className={clsx(
                "fixed top-0 right-0 h-screen w-(--sidebar-width) shadow-md bg-sidebar py-8 px-4 overflow-y-scroll scrollbar-hidden transition-transform duration-300 lg:translate-x-0! z-10", 
                isSidePanelOpen ? 'translate-x-0' : 'translate-x-full'
            )}
        >
            <button onClick={() => setIsSidePanelOpen(false)}>
                <Chevron className="size-8 invert -ml-2 lg:hidden" />
            </button>
            
            <AirPollution
                data={pollutionData}
                isLoading={isLoading}
            />
        </div>
    )
}

type AirPollutionProps = {
    data: typeof airPollutionMock | undefined
    isLoading: boolean
}

function AirPollution({ data, isLoading }: AirPollutionProps) {

    if (isLoading || !data) {
        return (
            <div className="flex flex-col gap-4">
                <SidePanelSkeleton />
            </div>
        )
    }

    return (        
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-semibold">Air Pollution</h1>
            <h2 className="text-5xl font-semibold">{data.list[0].main.aqi}</h2>
            <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">AQI</h3>
                <Tooltip>
                    <TooltipTrigger>
                        <Information className="size-4 invert" />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="max-w-xs">
                            {" "}
                            Air Quality Index. Valeurs possibles: 1 = Bon, 2 = Passable, 3 = Modéré, 4 = Médiocre, 5 = Pitoyable.
                        </p>
                    </TooltipContent>
                </Tooltip>
            </div>

            {Object.entries(data.list[0].components).map(([key, value]) => {

                const pollutant = airQualityRanges[key.toUpperCase() as keyof typeof airQualityRanges]
                const numericValue = Number(value)
                const max = pollutant['Pitoyable'].min
                const currentLevel = (() => {
                    for (const [level, range] of Object.entries(pollutant)) {
                        if (value >= range.min && (range.max === null || value <= range.max)) return level
                    }
                    return 'Pitoyable'
                })()

                // console.log({
                //     key,
                //     value,
                //     max,
                //     percentage: (numericValue / max) * 100
                // })

                const qualityColor = (() => {
                    switch (currentLevel) {
                        case "Bon":
                            return 'bg-green-500'
                        case "Passable":
                            return 'bg-yellow-500'
                        case "Modéré":
                            return 'bg-orange-500'
                        case "Médiocre":
                            return 'bg-red-500'
                        case "Pitoyable":
                            return 'bg-purple-500'
                        default:
                            return 'bg-zinc-500'
                    }
                })()

                const pollutantName = pollutantNameMapping[
                    key.toUpperCase() as Pollutant
                ]

                const useD = ["Ozone", "Ammoniac"].includes(pollutantName)

                return (
                    <Card
                        key={key}
                        childrenClassName="flex flex-col gap-3"
                        className="hover:scale-105 transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
                    >
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold capitalize">{key}</span>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Information className="size-4 invert" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="max-w-xs">
                                            Concentration {useD ? "d'" : "de "}{pollutantName}
                                        </p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <span className="text-lg font-semibold">{value}</span>
                        </div>

                        <Slider
                            min={0}
                            max={max}
                            value={[Math.min(numericValue, max)]}
                            disabled
                        />

                        <div className="flex justify-between text-xs">
                            <p>0</p>
                            <p>{max}</p>
                        </div>

                        <div className="flex justify-between">
                            {Object.keys(pollutant).map((quality, index) => (
                                <span
                                    key={index}
                                    className={clsx("px-2 py-1 rounded-md text-xs font-medium",
                                        quality === currentLevel
                                            ? qualityColor
                                            : 'bg-muted text-muted-foreground'
                                    )}
                                >
                                    {quality}
                                </span>
                            ))}
                        </div>
                    </Card>
                )
            })}

        </div>
    )
}

type AirQualityLevel = "Bon" | "Passable" | "Modéré" | "Médiocre" | "Pitoyable"

interface Range {
    min: number
    max: number | null
}

type Pollutant = "SO2" | "NO2" | "PM10" | "PM2_5" | "O3" | "CO" | "NO" | "NH3"

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>

const airQualityRanges: AirQualityRanges = {
    SO2: {
        Bon: { min: 0, max: 20 },
        Passable: { min: 20, max: 80 },
        Modéré: { min: 80, max: 250 },
        Médiocre: { min: 250, max: 350 },
        "Pitoyable": { min: 350, max: null },
    },
    NO2: {
        Bon: { min: 0, max: 40 },
        Passable: { min: 40, max: 70 },
        Modéré: { min: 70, max: 150 },
        Médiocre: { min: 150, max: 200 },
        "Pitoyable": { min: 200, max: null },
    },
    PM10: {
        Bon: { min: 0, max: 20 },
        Passable: { min: 20, max: 50 },
        Modéré: { min: 50, max: 100 },
        Médiocre: { min: 100, max: 200 },
        "Pitoyable": { min: 200, max: null },
    },
    PM2_5: {
        Bon: { min: 0, max: 10 },
        Passable: { min: 10, max: 25 },
        Modéré: { min: 25, max: 50 },
        Médiocre: { min: 50, max: 75 },
        "Pitoyable": { min: 75, max: null },
    },
    O3: {
        Bon: { min: 0, max: 60 },
        Passable: { min: 60, max: 100 },
        Modéré: { min: 100, max: 140 },
        Médiocre: { min: 140, max: 180 },
        "Pitoyable": { min: 180, max: null },
    },
    CO: {
        Bon: { min: 0, max: 4400 },
        Passable: { min: 4400, max: 9400 },
        Modéré: { min: 9400, max: 12400 },
        Médiocre: { min: 12400, max: 15400 },
        "Pitoyable": { min: 15400, max: null },
    },
    NO: {
        Bon: { min: 0, max: 20 },
        Passable: { min: 20, max: 40 },
        Modéré: { min: 40, max: 60 },
        Médiocre: { min: 60, max: 80 },
        "Pitoyable": { min: 80, max: null },
    },
    NH3: {
        Bon: { min: 0, max: 40 },
        Passable: { min: 40, max: 70 },
        Modéré: { min: 70, max: 150 },
        Médiocre: { min: 150, max: 200 },
        "Pitoyable": { min: 200, max: null },
    },
}

const pollutantNameMapping: Record<Pollutant, string> = {
    SO2: "Dioxyde de soufre",
    NO2: "Dioxyde d'azote",
    PM10: "Particules PM10",
    PM2_5: "Particules fines",
    O3: "Ozone",
    CO: "Monoxyde de carbone",
    NO: "Monoxyde d'azote",
    NH3: "Ammoniac",
}