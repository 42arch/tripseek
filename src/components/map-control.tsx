import { Minus, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { useMap } from 'react-map-gl/mapbox'

function MapControl() {
  const { map } = useMap()

  return (
    <>
      <div className='absolute right-2 top-2 flex flex-col gap-2'>
        <Button
          size='icon'
          variant='neutral'
          className='h-10 w-10'
          onClick={() => {
            map?.zoomIn()
          }}
        >
          <Plus />
        </Button>
        <Button
          size='icon'
          variant='neutral'
          onClick={() => {
            map?.zoomOut()
          }}
        >
          <Minus />
        </Button>
      </div>
    </>
  )
}

export default MapControl
