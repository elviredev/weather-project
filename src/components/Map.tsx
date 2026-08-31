import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import type { Coords } from "../types"


type Props = {
    coords: Coords
    onLocationChange: (coords: Coords) => void
}

export default function Map({ coords, onLocationChange }: Props) {
    return (
        <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={5}
            style={{ width: '700px', height: '500px' }}
        >
            <MapClick onLocationChange={onLocationChange} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[coords.lat, coords.lon]} />
        </MapContainer>
    )
}

function MapClick({ onLocationChange }: { onLocationChange: (coords: Coords) => void}) {
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng

            onLocationChange({
                lat,
                lon: lng,
            })
        },
    })

    return null
}