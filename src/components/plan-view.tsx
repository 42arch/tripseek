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
          'dark:bg-darkBg absolute left-0 top-0 z-20 h-full w-[320px] overflow-hidden border-r-4 border-black bg-bg backdrop-blur-md transition-transform duration-300 ease-in-out'
        )}
      >
        <div className='flex flex-none items-center justify-between border-b-4 border-black bg-main px-4 py-2'>
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
        <div className='flex h-[calc(100%-60px)] w-full flex-col overflow-y-auto'>
          <ScrollArea className='' type='auto'>
            <div className='border-b-4 border-black px-4 py-2 text-sm'>
              {plan.summary}
            </div>
            <Accordion className='w-full' type='single' collapsible>
              <AccordionItem className='max-w-full border-0 ' value='itinerary'>
                <AccordionTrigger>行程安排</AccordionTrigger>
                <AccordionContent className='bg-bg'>
                  <div className='flex flex-col text-sm '>
                    {plan.itinerary.map((item, idx) => (
                      <div
                        className={cn(
                          'h-auto cursor-pointer border-b border-black px-2 pb-4 pt-2 hover:bg-main',
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
                        <div className='mt-2 text-sm'>
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
              <AccordionItem className='max-w-full border-x-0' value='budget'>
                <AccordionTrigger>预算汇总</AccordionTrigger>
                <AccordionContent className='bg-bg px-2 py-4'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='w-[80px] text-center'>
                          用途
                        </TableHead>
                        <TableHead className='w-[100px] text-center'>
                          预算
                        </TableHead>
                        <TableHead className='text-center'>说明</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plan.budget.map((item) => (
                        <TableRow key={item.category}>
                          <TableCell className='p-1 text-center'>
                            {item.category}
                          </TableCell>
                          <TableCell className='p-1 text-center'>
                            {item.amount}元
                          </TableCell>
                          <TableCell className='p-1 text-center'>
                            {item.summary}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2}>总计</TableCell>
                        <TableCell className='text-right'>
                          {plan.budget.reduce(
                            (prev, cur) => prev + cur.amount,
                            0
                          )}{' '}
                          元
                        </TableCell>
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
