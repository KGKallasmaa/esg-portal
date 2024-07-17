import { Button } from '../../components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog'
import UpdateProducerDetailsForm from './UpdateProducerDetailsForm'

export default function UpdateProducerDetailsButton({
  producerId,
  onUpdated,
}: {
  producerId: string
  onUpdated: () => void
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Update emissions</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update emissions</DialogTitle>
          <DialogDescription>
            Make changes to your emmisions here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <UpdateProducerDetailsForm
          producerId={producerId}
          onClose={() => onUpdated()}
        />
      </DialogContent>
    </Dialog>
  )
}
