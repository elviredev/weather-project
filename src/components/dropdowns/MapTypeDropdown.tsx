import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


type Props = {
    mapType: string
    setMapType: (mapType: string) => void
}

export default function MapTypeDropdown({ mapType, setMapType }: Props) {

    const selectedType = types.find(type => type.value === mapType)

    return (
        <Select
            value={mapType}
            onValueChange={(value) => {
                if (value) {
                    setMapType(value)
                }
            }}
        >

            <SelectTrigger className="w-45">
                <SelectValue placeholder="Type de carte">
                    {selectedType?.label}
                </SelectValue>
            </SelectTrigger>

            <SelectContent className="z-50">
                {types.map(type => (
                    <SelectItem key={type.value} value={type.value} className="capitalize">
                        {type.label}
                    </SelectItem>
                ))}
            </SelectContent>

        </Select>
    )
}

const types = [
    {
        value: "clouds_new",
        label: "Nuages"
    },
    {
        value: "precipitation_new",
        label: "Precipitation"
    },
    {
        value: "pressure_new",
        label: "Préssion"
    },
    {
        value: "wind_new",
        label: "Vent"
    },
    {
        value: "temp_new",
        label: "Température"
    }
]