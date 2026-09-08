import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import type { Coords } from "../types"
import { useEffect } from "react"
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk"

const API_KEY = import.meta.env.VITE_API_KEY

type Props = {
    coords: Coords
    onLocationChange: (coords: Coords) => void
    mapType: string
}

export default function Map({ coords, onLocationChange, mapType }: Props) {
    return (
        <MapContainer
            center={[coords.lat, coords.lon]}
            zoom={5}
            style={{ width: '100%', height: '100%' }}
        >
            <MapPosition coords={coords} />
            <MapClick onLocationChange={onLocationChange} />
            {/* <TileLayer
                attribution='Données © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> / ODbL - rendu <a href="https://openstreetmap.fr/">OSM France</a>'
                url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
                maxZoom={20}
            /> */}

            <MapTileLayer />

            <TileLayer
                opacity={0.7}
                url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
            />
            <Marker position={[coords.lat, coords.lon]} />
        </MapContainer>
    )
}

function MapPosition({ coords }: { coords: Coords }) {
    const map = useMap()
    map.panTo([coords.lat, coords.lon])

    return null
}

function MapClick({
    onLocationChange
}: {
    onLocationChange: (coords: Coords) => void
}) {

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

function MapTileLayer() {
    const map = useMap()

    useEffect(() => {
        const tileLayer = new MaptilerLayer({ 
            style: 'basic-dark', 
            apiKey: 'fdodZFlzWTPDTdYWjU0B' 
        })
        tileLayer.addTo(map)

        return () => {map.removeLayer(tileLayer)}
    }, [map])

    return null
}