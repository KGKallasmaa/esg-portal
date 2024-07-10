import { PlusSmallIcon } from '@heroicons/react/24/outline'
import Modal from '../../components/Modal'
import { memo, useState } from 'react'
import NewProductForm from './ProductSalesForm'
import EditProductForm from './EditProductForm'

function EditProductModal({ productId,handleClose }: { productId: string,handleClose:()=>void }) {
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
