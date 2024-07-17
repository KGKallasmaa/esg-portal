import { memo } from 'react'
import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import NewProductForm from './NewProductForm'

function NewProductButton({ producerId }: { producerId: string }) {
  const handleClose = () => {
    window.location.reload()
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">New product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update emissions</DialogTitle>
          <DialogDescription>
            Add a new product to your catalogue
          </DialogDescription>
        </DialogHeader>
        <NewProductForm producerId={producerId} onClose={() => handleClose()} />
      </DialogContent>
    </Dialog>
  )
}

export default memo(NewProductButton)
