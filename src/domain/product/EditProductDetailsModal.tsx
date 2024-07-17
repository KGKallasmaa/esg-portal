import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from '@radix-ui/react-alert-dialog'
import { memo } from 'react'
import { AlertDialogHeader } from '../../components/ui/alert-dialog'
import ProductDetailsForm from './ProductDetailsForm'

function EditProductDetailsModal({
  productId,
  handleClose,
}: {
  productId: string
  handleClose: () => void
}) {
  return (
    <AlertDialog defaultOpen={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit product</AlertDialogTitle>
        </AlertDialogHeader>
        <ProductDetailsForm
          productId={productId}
          onClose={() => handleClose()}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default memo(EditProductDetailsModal)
