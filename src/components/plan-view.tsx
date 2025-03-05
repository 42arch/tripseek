import { ArrowLeftIcon, MenuIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Plan } from '@/types'

function PlanView(plan: Plan) {
  const [infoOpen, toggleInfoOpen] = useState(true)

  return (
    <>
      <Button
        size='icon'
        variant='neutral'
        color='#fff'
        className='absolute left-4 top-4 z-10'
        onClick={() => toggleInfoOpen((prev) => !prev)}
      >
        <MenuIcon />
      </Button>
      <div
        className={cn(
          infoOpen ? 'visible translate-x-0' : 'invisible -translate-x-full',
          'absolute left-0 top-0 z-20 h-full w-[320px] overflow-hidden border-r-4 border-black bg-bg backdrop-blur-md transition-transform duration-300 ease-in-out dark:bg-darkBg'
        )}
      >
        <div className='flex flex-none items-center justify-between border-b-4 border-black px-4 py-2'>
          <h3 className='text-lg font-bold'>旅行计划</h3>
          <Button
            className='bg-white'
            size='icon'
            variant='noShadow'
            onClick={() => toggleInfoOpen((prev) => !prev)}
          >
            <ArrowLeftIcon />
          </Button>
        </div>
        <div className='flex flex-col overflow-y-auto'>
          <div className='border-b-4 border-black px-4 py-2 text-sm'>
            {plan.summary}
          </div>
          <div className='flex flex-col px-4 py-2 text-sm'>
            {plan.itinerary.map((item, idx) => (
              <div className='h-40 border-b border-black pb-2 pt-1' key={idx}>
                <h4 className='text-lg'>
                  {item.day} - {item.destination}
                </h4>
                <div>{item.description}</div>
                <div>当天预算：{item.budget}元</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default PlanView
