import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useUpdateProduct } from './hooks/product_hooks'
import toast from 'react-hot-toast'

function EditProductForm({
  productId,
  onClose,
}: {
  productId: string
  onClose: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const newProductMutation = useUpdateProduct()

  const onSubmit = (data: { title: string; barcode: string }) => {
    newProductMutation.mutate(
      {
        id: productId,
        req: {
          title: data.title,
          barcode: data.barcode,
        },
      },
      {
        onSuccess: () => {
          toast.success('Product updated')
          onClose()
        },
        onError: (error) => {
          toast.error('Product creation failed.')
          console.error(error)
        },
      }
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="debug mb-4 rounded px-8 pb-8"
    >
      <h2 className="mb-4 text-xl font-bold">Update product</h2>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="barcode"
        >
          Barcode
        </label>
        <input
          id="barcode"
          type="text"
          {...register('barcode', { required: 'Barcode is required' })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {errors.barcode && errors.barcode.message && (
          <p className="text-xs italic text-red-500">
            {errors.barcode.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="name"
        >
          Name
        </label>
        <input
          id="title"
          type="text"
          {...register('title', { required: 'Name is required' })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {errors.title && (
          <p className="text-xs italic text-red-500">{errors.title.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          title="Cancel"
          className="focus:shadow-outline rounded bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-800 focus:outline-none"
        >
          Cancel
        </button>
        <button
          title="Update"
          type="submit"
          className="focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-white hover:bg-primary-darker focus:outline-none"
        >
          Update
        </button>
      </div>
    </form>
  )
}

export default memo(EditProductForm)
