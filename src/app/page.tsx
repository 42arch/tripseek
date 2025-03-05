import { usePlanStore } from '@/store'
import CreatePlan from './create-plan'
import PlanContainer from './plan-container'

export default async function IndexPage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center sm:px-4 md:mx-auto md:max-w-[1248px]'>
      <section className='my-4 flex w-full items-center justify-center'>
        <CreatePlan />
      </section>

      <section className='h-[calc(100%-32px-44px)] w-full'>
        <PlanContainer />
      </section>
    </div>
  )
}
