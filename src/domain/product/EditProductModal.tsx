import { memo } from 'react'
import Modal from '../../components/Modal'
import EditProductForm from './EditProductForm'

function EditProductModal({
  productId,
  handleClose,
}: {
  productId: string
  handleClose: () => void
}) {
  return (
    <Modal
      backgroundColor="bg-white"
      title={'Edit product'}
      titleColor="text-primary"
      border="border border-primary"
      closable={true}
      onClose={() => handleClose()}
    >
      <EditProductForm productId={productId} onClose={() => handleClose()} />
    </Modal>
  )
}

export default memo(EditProductModal)
