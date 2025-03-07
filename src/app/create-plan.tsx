'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useMutation } from '@tanstack/react-query'
import { Plan } from '@/types'
import { usePlanStore } from '@/store'
import { useState } from 'react'

const formSchema = z.object({
  departure: z
    .string()
    .min(1, {
      message: '必须输入出发地！'
    })
    .max(50)
    .nonempty(),
  budget: z.coerce.number().min(0),
  duration: z.coerce.number().min(0),
  personNumber: z.enum(['solo', 'duo', 'family', 'group'])
})

type FormParam = z.infer<typeof formSchema>

const fetchPlan = async (params: FormParam) => {
  const res = await fetch('/api/plan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  const data = await res.json()
  return data
}

function CreatePlan() {
  const [formOpen, toggleFormOpen] = useState(false)
  const { setPlan } = usePlanStore()
  const form = useForm<FormParam>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: '',
      budget: 0,
      duration: 0,
      personNumber: 'solo'
    }
  })

  const handleSubmit = (values: FormParam) => {
    mutate(values)
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ['get-plan'],
    mutationFn: (params: FormParam) => fetchPlan(params),
    onSuccess: (data) => {
      const planData = JSON.parse(data) as Plan
      setPlan(planData)
      toggleFormOpen(false)
    }
  })

  return (
    <Dialog open={formOpen} onOpenChange={toggleFormOpen}>
      <DialogTrigger asChild>
        <Button size='lg' variant='default'>
          创建旅行计划
        </Button>
      </DialogTrigger>

      <DialogContent className='min-h-[400px] sm:max-w-[425px]'>
        {!isPending ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <DialogHeader>
                <DialogTitle>创建您的旅行计划</DialogTitle>
                <DialogDescription>
                  在下方输入您的信息，让AI来为您生成旅行计划！
                </DialogDescription>
              </DialogHeader>

              <div className='mt-4 grid w-full items-center gap-2'>
                <FormField
                  control={form.control}
                  name='departure'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>出发地</FormLabel>
                      <FormControl>
                        <Input placeholder='您所在的地方' {...field} />
                      </FormControl>
                      {/* <FormDescription>输入你出发的地方.</FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='budget'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>预算</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='您计划的预算, 不填则不限'
                          type='number'
                          min={0}
                          step={100}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='duration'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>旅行时长</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='您计划的旅行时长, 不填则不限'
                          type='number'
                          step={0.5}
                          min={0}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='personNumber'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>人数</FormLabel>
                      <FormControl>
                        <Select {...field}>
                          <SelectTrigger
                            className='bg-bw text-text'
                            id='person'
                          >
                            <SelectValue placeholder='选择' />
                          </SelectTrigger>
                          <SelectContent position='popper'>
                            <SelectItem value='solo'>单人</SelectItem>
                            <SelectItem value='duo'>双人</SelectItem>
                            <SelectItem value='family'>家庭</SelectItem>
                            <SelectItem value='group'>跟团</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className='mt-4 w-full'>
                <Button type='submit' className='w-full'>
                  生成
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-bg'>
            AI正在生成计划中，请稍等...
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePlan
