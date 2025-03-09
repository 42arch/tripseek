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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
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
import { FormParam, formSchema, Plan } from '@/types'
import { usePlanStore } from '@/store'
import { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { Sparkles } from 'lucide-react'
import { Loading } from '@/components/loading'

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
      destination: '',
      budget: undefined,
      duration: undefined,
      personNumber: 'solo',
      ps: ''
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
    },
    onError: (error) => {
      console.error(error)
    }
  })

  return (
    <Dialog open={formOpen} onOpenChange={toggleFormOpen}>
      <DialogTrigger asChild>
        <Button size='default' variant='default'>
          <Sparkles size={18} />
          创建旅行计划
        </Button>
      </DialogTrigger>

      <DialogContent className='min-h-[400px] sm:max-w-[425px]'>
        {!isPending ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <DialogHeader>
                <DialogTitle>创建旅行计划</DialogTitle>
                <DialogDescription>
                  在下方输入信息，让AI来为您生成旅行计划！
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
                        <Input placeholder='必填项，您所在的地方' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='destination'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>目的地</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='不填的话则没有限制，交给AI决定'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='budget'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>预算（元）</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='不填的话则没有限制，交给AI决定'
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
                      <FormLabel>时长（天）</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='不填的话则没有限制，交给AI决定'
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            className='bg-bw text-text'
                            id='person'
                          >
                            <SelectValue placeholder='选择' />
                          </SelectTrigger>
                          <SelectContent position='popper'>
                            <SelectItem value='solo'>单人出行</SelectItem>
                            <SelectItem value='duo'>双人出行</SelectItem>
                            <SelectItem value='family'>家庭出行</SelectItem>
                            <SelectItem value='group'>组团出行</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='ps'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>补充</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='提供更多的信息，比如：想在周末出行，偏好自然风光或者出国旅行等等'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter className='mt-4 w-full'>
                <Button type='submit' className='w-full'>
                  <Sparkles size={14} />
                  生成
                </Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center bg-bg'>
            <Loading />
            <p className='pt-4'>AI 正在生成计划中，请稍等...</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CreatePlan
