import Map, {
  Layer,
  LineLayerSpecification,
  MapProvider,
  Marker,
  Popup,
  Source,
  useMap
} from 'react-map-gl/mapbox'
import { usePlanStore } from '@/store'
import { useEffect, useMemo, useState } from 'react'
import { Plan } from '@/types'
import { lineString, points } from '@turf/helpers'
import { bezierSpline, bbox } from '@turf/turf'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

type Location = {
  name: string
  coordinates: number[]
  itinerary: Plan['itinerary']
}

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
  const { plan } = usePlanStore()
  const { map } = useMap()
  const [popupInfo, setPopupInfo] = useState<Location | null>(null)

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
      // return bezierSpline(line)
      return line
    } else {
      return null
    }
  }, [plan])

  console.log('path', path)

  useEffect(() => {
    if (!locations || !locations.length) return
    const ps = points(locations.map((i) => i.coordinates))
    const [minLng, minLat, maxLng, maxLat] = bbox(ps)

    map?.fitBounds([minLng, minLat, maxLng, maxLat], {
      padding: 100
    })
  }, [locations, map])

  return (
    <Map
      id='map'
      mapboxAccessToken='pk.eyJ1IjoiaW5nZW40MiIsImEiOiJjazlsMnliMXoyMWoxM2tudm1hajRmaHZ6In0.rWx_wAz2cAeMIzxQQfPDPA'
      initialViewState={{
        longitude: 120,
        latitude: 30,
        zoom: 4
      }}
      onClick={() => setPopupInfo(null)}
      style={{ width: '100%', height: '100%' }}
      mapStyle='mapbox://styles/mapbox/streets-v9'
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
          anchor='center'
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
              {/* <div className='scrollbar flex'> */}
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
                      <p className=' text-secondaryBlack'>
                        推荐景点：
                        {item.attractions.map((at, i) => `${at.name}，`)}
                      </p>
                      {/* <a className='py-1 text-right text-secondaryBlack'>
                        详细
                      </a> */}
                    </div>
                  ))}
                </div>

                <ScrollBar orientation='horizontal' />
              </ScrollArea>

              {/* </div> */}
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
    </MapProvider>
  )
}

export default MapView
