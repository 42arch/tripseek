import Settings from '@/components/settings'
import CreatePlan from '@/components/create-plan'
import PlanContainer from './plan-container'

export default async function IndexPage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center px-1 sm:px-4 md:mx-auto md:max-w-[1248px]'>
      <section className='my-4 flex w-full items-center justify-center gap-4'>
        <CreatePlan />
        {/* <Settings /> */}
      </section>

      <section className='mb-1 h-[calc(100%-32px-44px-4px)] w-full md:mb-4 md:h-[calc(100%-32px-44px-16px)]'>
        <PlanContainer />
      </section>
    </div>
  )
}
