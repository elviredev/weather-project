import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet"
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
            <MapClick onLocationChange={onLocationChange} coords={coords} />
            <TileLayer
                attribution='Données © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> / ODbL - rendu <a href="https://openstreetmap.fr/">OSM France</a>'
                url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                maxZoom={20}
            />
            <Marker position={[coords.lat, coords.lon]} />
        </MapContainer>
    )
}

function MapClick({ 
    onLocationChange, 
    coords 
}: { 
    onLocationChange: (coords: Coords) => void 
    coords: Coords
}) {
    const map = useMap()
    map.panTo([coords.lat, coords.lon])

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