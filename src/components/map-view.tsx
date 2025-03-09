import Map, {
  Layer,
  LineLayerSpecification,
  MapProvider,
  Marker,
  Popup,
  Source,
  useMap
} from 'react-map-gl/maplibre'
import { usePlanStore } from '@/store'
import { useEffect, useMemo, useState } from 'react'
import { Attraction, Plan } from '@/types'
import { lineString, points } from '@turf/helpers'
import { bbox, buffer } from '@turf/turf'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import MapControl from './map-control'
import 'maplibre-gl/dist/maplibre-gl.css'

type Location = {
  name: string
  coordinates: [number, number]
  itinerary: Plan['itinerary']
}

const mapToken = process.env.NEXT_PUBLIC_MAP_TOKEN

const pathStyle: LineLayerSpecification = {
  id: 'path',
  source: 'path',
  type: 'line',
  paint: {
    'line-color': '#ffdc58',
    'line-width': 4
  },
  layout: {}
}

function MapScene() {
  const { plan, currentItinerary } = usePlanStore()
  const { map } = useMap()
  const [popupInfo, setPopupInfo] = useState<Location | null>(null)
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [attractionInfo, setAttactionInfo] = useState<Attraction | null>(null)

  const locations = useMemo(() => {
    const locs: Location[] = []

    plan?.itinerary.forEach((item) => {
      const exist = locs.find((loc) => loc.name === item.destination)
      if (exist) {
        exist.itinerary.push(item)
      } else {
        locs.push({
          name: item.destination,
          coordinates: item.coordinates,
          itinerary: [item]
        })
      }
    })
    return locs
  }, [plan])

  const path = useMemo(() => {
    if (plan && plan.itinerary.length > 2) {
      const points: [number, number][] = []

      plan.itinerary.forEach((item) => {
        if (
          !points.find(
            (p) => p[0] === item.coordinates[0] && p[1] === item.coordinates[1]
          )
        ) {
          points.push(item.coordinates)
        }
      })

      const line = lineString(points)
      return line
    } else {
      return null
    }
  }, [plan])

  useEffect(() => {
    if (!locations || !locations.length) return
    const ps = points(locations.map((i) => i.coordinates))
    const [minLng, minLat, maxLng, maxLat] = bbox(ps)

    map?.fitBounds([minLng, minLat, maxLng, maxLat], {
      padding: 100
    })

    if (currentItinerary) {
      const attPoints = currentItinerary.attractions.length
        ? currentItinerary.attractions.map((att) => att.coordinates)
        : [currentItinerary.coordinates]

      setAttractions(currentItinerary.attractions)
      const area = buffer(points(attPoints), 2, {
        units: 'kilometers'
      })
      if (area) {
        const [minLng, minLat, maxLng, maxLat] = bbox(area)
        map?.fitBounds([minLng, minLat, maxLng, maxLat], {
          padding: 100
        })
      }
    }
  }, [locations, map, currentItinerary])

  return (
    <Map
      id='map'
      // mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 120,
        latitude: 30,
        zoom: 4
      }}
      onClick={() => {
        setPopupInfo(null)
        setAttactionInfo(null)
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={`https://basemaps-api.arcgis.com/arcgis/rest/services/styles/OSM:LightGray?type=style&token=${mapToken}`}
    >
      {locations.map((item, idx) => (
        <Marker
          key={idx}
          style={{
            width: '32px',
            height: '32px'
          }}
          longitude={item.coordinates[0]}
          latitude={item.coordinates[1]}
          anchor='bottom'
          onClick={(e) => {
            e.originalEvent.stopPropagation()
            setPopupInfo(item)
          }}
        >
          <img src='/location.png' />
        </Marker>
      ))}
      {popupInfo && (
        <Popup
          anchor='bottom'
          className='z-30'
          longitude={popupInfo.coordinates[0]}
          latitude={popupInfo.coordinates[1]}
          onClose={() => setPopupInfo(null)}
          closeButton={false}
        >
          <Card className='bg-bg p-2'>
            <CardHeader className='p-2'>
              <CardTitle>{popupInfo.name}</CardTitle>
            </CardHeader>
            <CardContent className='w-48 overflow-x-auto p-0'>
              <ScrollArea className='' type='always'>
                <div className='flex'>
                  {popupInfo.itinerary.map((item, idx) => (
                    <div
                      key={idx}
                      className='h-36 w-48 flex-auto flex-shrink-0 flex-grow-0 px-2 py-1'
                    >
                      <h2 className='text-base'>{item.day}</h2>
                      <p className='mt-1 text-xs text-secondaryBlack'>
                        {item.description}
                      </p>
                      {item.attractions.length ? (
                        <p className=' text-secondaryBlack'>
                          推荐景点：
                          {item.attractions.map((i) => i.name).join('，')}
                        </p>
                      ) : null}

                      {/* <a className='py-1 text-right text-secondaryBlack'>
                        详细
                      </a> */}
                    </div>
                  ))}
                </div>

                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            </CardContent>
          </Card>
        </Popup>
      )}
      {attractions.map((item, idx) => (
        <Marker
          key={idx}
          style={{
            width: '30px',
            height: '30px',
            cursor: 'pointer'
          }}
          longitude={item.coordinates[0]}
          latitude={item.coordinates[1]}
          anchor='bottom'
          onClick={(e) => {
            console.log(222222, item)
            e.originalEvent.stopPropagation()
            setAttactionInfo(item)
          }}
        >
          <img src='/attraction.png' />
        </Marker>
      ))}
      {attractionInfo && (
        <Popup
          anchor='bottom'
          className='z-30'
          longitude={attractionInfo.coordinates[0]}
          latitude={attractionInfo.coordinates[1]}
          onClose={() => setAttactionInfo(null)}
          closeButton={false}
        >
          <Card className='bg-bg p-2'>
            <CardHeader className='p-2'>
              <CardTitle className='text-base'>
                景点: {attractionInfo.name}
              </CardTitle>
            </CardHeader>
            <CardContent className='w-48 overflow-x-auto p-0'>
              <p className='p-2 pt-0 text-xs text-secondaryBlack'>
                {attractionInfo.description}
              </p>
            </CardContent>
          </Card>
        </Popup>
      )}
      {path && (
        <Source id='path' type='geojson' data={path}>
          <Layer {...pathStyle} />
        </Source>
      )}
    </Map>
  )
}

function MapView() {
  return (
    <MapProvider>
      <MapScene />
      <MapControl />
    </MapProvider>
  )
}

export default MapView
