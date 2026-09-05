import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"


type Props = {
    location: string
    locationMode: "city" | "custom"
    onLocationChange: (location: string) => void
}

export default function LocationDropdown({ location, locationMode, onLocationChange }: Props) {

    return (
        <Select
            value={location}
            onValueChange={(value) => {
                if (value) {
                    onLocationChange(value)
                }
            }}
        >

            <SelectTrigger className="w-45">
                {locationMode === "custom" ? (
                    <span>Personnalisé</span>
                ) : (
                    <SelectValue placeholder="Choisir une ville" />
                )}
            </SelectTrigger>

            <SelectContent className="z-50">                
                {locations.map(city => (
                    <SelectItem key={city} value={city}>
                        {city}
                    </SelectItem>
                ))}
            </SelectContent>

        </Select>
    )
}

const locations = [
    "Bangkok",
    "Tokyo",
    "Seoul",
    "Dubai",
    "Manila",
    "London",
    "New York",
    "Paris",
    "Berlin",
    "Madrid",
    "Rome",
    "Lisbon"
]