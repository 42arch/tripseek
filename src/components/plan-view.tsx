import { ArrowLeftIcon, CalendarDays, MenuIcon } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Button } from './ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Plan } from '@/types'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { usePlanStore } from '@/store'

function PlanView(plan: Plan) {
  const { setCurrentItinerary, currentItinerary } = usePlanStore()
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
        <div className='flex h-[calc(100%-60px)] flex-col overflow-y-auto'>
          <ScrollArea className='' type='auto'>
            <div className='border-b-4 border-black px-4 py-2 text-sm'>
              {plan.summary}
            </div>
            <Accordion
              className='w-full lg:w-[unset]'
              type='single'
              collapsible
            >
              <AccordionItem
                className='max-w-full border-0 lg:w-[500px] '
                value='itinerary'
              >
                <AccordionTrigger>行程安排</AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-col text-sm'>
                    {plan.itinerary.map((item, idx) => (
                      <div
                        className={cn(
                          'h-auto cursor-pointer border-b border-black px-1 pb-4 pt-2 hover:bg-main',
                          currentItinerary?.day === item.day ? 'bg-main' : ''
                        )}
                        key={idx}
                        onClick={() => {
                          if (currentItinerary?.day === item.day) {
                            setCurrentItinerary(null)
                          } else {
                            setCurrentItinerary(item)
                          }
                        }}
                      >
                        <h4 className='my-1 flex text-lg font-semibold'>
                          <CalendarDays />
                          <span className='ml-2'>
                            {item.day} - {item.destination}
                          </span>
                        </h4>
                        <div className='mt-2 text-sm text-secondaryBlack'>
                          <div>{item.description}</div>
                          <div>当天预算：{item.budget}元</div>
                          <div>交通工具：{item.transportation}</div>
                          {item.attractions.length ? (
                            <div>
                              景点：
                              {item.attractions.map((i) => i.name).join(',')}
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                className='max-w-full border-x-0 lg:w-[500px]'
                value='budget'
              >
                <AccordionTrigger>预算汇总</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[80px]'>用途</TableHead>
                        <TableHead className='w-[80px]'>预算</TableHead>
                        <TableHead className='text-center'>说明</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plan.budget.map((item) => (
                        <TableRow key={item.category}>
                          <TableCell className='font-base'>
                            {item.category}
                          </TableCell>
                          <TableCell>{item.amount}元</TableCell>
                          <TableCell className='text-right'>
                            {item.summary}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>总计</TableCell>
                        <TableCell className='text-right'>$2,500.00</TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      </div>
    </>
  )
}

export default PlanView
