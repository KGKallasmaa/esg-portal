import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog'
import NewProducerForm from './NewProducerForm'

export default function NewProducerModal({
  onProducerCreated,
}: {
  onProducerCreated: () => void
}) {
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>New producer</AlertDialogTitle>
        </AlertDialogHeader>
        <NewProducerForm
          onClose={() => {
            onProducerCreated()
          }}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
