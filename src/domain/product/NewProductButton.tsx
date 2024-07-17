import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@radix-ui/react-alert-dialog'
import { memo } from 'react'
import { AlertDialogHeader } from '../../components/ui/alert-dialog'
import NewProductForm from './NewProductForm'

function NewProductButton({ producerId }: { producerId: string }) {
  const handleClose = () => {
    window.location.reload()
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>New product</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add product</AlertDialogTitle>
        </AlertDialogHeader>
        <NewProductForm producerId={producerId} onClose={() => handleClose()} />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(NewProductButton)
