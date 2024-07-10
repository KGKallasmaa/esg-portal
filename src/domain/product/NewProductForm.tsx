import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useNewProduct } from './hooks/product_hooks'
import toast from 'react-hot-toast'

function NewProductForm({
  producerId,
  onClose,
}: {
  producerId: string
  onClose: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const newProductMutation = useNewProduct()

  const onSubmit = (data) => {
    newProductMutation.mutate(
      {
        producer_id: producerId,
        name: data.name,
        barcode: data.barcode,
      },
      {
        onSuccess: () => {
          toast.success('Product created')
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
      className="mb-4 rounded px-8 pb-8"
    >
      <h2 className="mb-4 text-xl font-bold">New Product Form</h2>

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
        {errors.barcode && (
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
          id="name"
          type="text"
          {...register('name', { required: 'Name is required' })}
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {errors.name && (
          <p className="text-xs italic text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          title="Confirm"
          type="submit"
          className="focus:shadow-outline rounded bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-800 focus:outline-none"
        >
          Cancel
        </button>
        <button
          title="Confirm"
          type="submit"
          className="focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-white hover:bg-primary-darker focus:outline-none"
        >
          Create
        </button>
      </div>
    </form>
  )
}

export default memo(NewProductForm)
