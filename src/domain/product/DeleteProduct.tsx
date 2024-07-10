import { memo } from 'react'
import toast from 'react-hot-toast'
import { useDeleteProduct } from './hooks/product_hooks'

function DeleteProduct({ productId }: { productId: string }) {
  const deleteProductMutation = useDeleteProduct({
    onSuccess: () => {
      toast.success('Product deleted')
      window.location.reload()
    },
    onError: (error) => {
      toast.error('Product deletion failed.')
      console.error(error)
    },
  })
  deleteProductMutation.mutate(productId)
  return null
}

export default memo(DeleteProduct)
