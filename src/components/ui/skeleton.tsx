import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-base bg-bw animate-pulse border-2 border-border',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
