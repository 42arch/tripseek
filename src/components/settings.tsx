import { SettingsIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'

function Settings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='neutral' size='icon'>
          <SettingsIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className='min-h-[400px] sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>设置</DialogTitle>
        </DialogHeader>
        <DialogFooter className='mt-4 w-full'>
          <Button type='submit' className='w-full'>
            确定
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Settings
