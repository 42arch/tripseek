'use client'

import MapView from '@/components/map-view'
import PlanView from '@/components/plan-view'
import { Card } from '@/components/ui/card'
import { usePlanStore } from '@/store'

function PlanContainer() {
  const { plan } = usePlanStore()

  return (
    <Card className='relative h-full w-full border-4 bg-bg'>
      {plan && <PlanView {...plan} />}
      <MapView />
    </Card>
  )
}

export default PlanContainer
