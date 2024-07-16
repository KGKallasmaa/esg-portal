import { memo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  useGetSaleByProductId,
  useNewSale,
  useUpdateSale,
} from './hooks/sales_hooks'
import LoadingCard from '../../components/LoadingCard'

function ProductSalesForm({
  productId,
  onClose,
}: {
  productId: string
  onClose: () => void
}) {
  const { data: currentSales, isLoading } = useGetSaleByProductId(productId)

  const updateSalesMutation = useUpdateSale()
  const newSalesMutation = useNewSale()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (currentSales) {
      reset({
        quantity: currentSales.quantity,
        total: currentSales.price.amount,
      })
    }
  }, [currentSales])

  const onSubmit = (data: { quantity: string; total: string }) => {
    if (currentSales) {
      updateSalesMutation.mutate(
        {
          id: currentSales.id,
          req: {
            quantity: parseInt(data.quantity),
            total: {
              amount: parseFloat(data.total),
              currency: 'USD',
            },
          },
        },
        {
          onSuccess: () => {
            toast.success('Sales updated')
            onClose()
          },
          onError: (error) => {
            toast.error('Sales uptate failed.')
            console.error(error)
          },
        }
      )
    } else {
      newSalesMutation.mutate(
        {
          req: {
            product_id: productId,
            quantity: parseInt(data.quantity),
            total: {
              amount: parseFloat(data.total),
              currency: 'USD',
            },
          },
        },
        {
          onSuccess: () => {
            toast.success('Sales created')
            onClose()
          },
          onError: (error) => {
            toast.error('Sales creation failed.')
            console.error(error)
          },
        }
      )
    }
  }

  if (isLoading) {
    return <LoadingCard count={1} />
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-lg bg-white p-4 shadow-md"
    >
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="mb-1 block font-medium text-gray-900">
            Quantity
          </label>
          <input
            type="number"
            placeholder="Enter quantity sold"
            {...register('quantity', {
              required: 'Quantity is required',
              min: { value: 0, message: 'Quantity  must be greater than 0' },
            })}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.quantity && (
            <p className="text-xs italic text-red-500">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div className="w-1/2">
          <label className="mb-1 block font-medium text-gray-900">
            Total Sales (USD):
          </label>
          <input
            type="number"
            {...register('total', {
              required: 'Total sales is required',
              min: { value: 0, message: 'Sales must be greater than 0' },
            })}
            placeholder="Enter total sales volume"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.total && (
            <p className="text-xs italic text-red-500">
              {errors.total.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between space-x-4">
        <button
          type="button"
          onClick={onClose}
          className="focus:shadow-outline rounded bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-800 focus:outline-none"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-primary px-4 py-2 font-bold text-white hover:bg-primary-darker focus:outline-none"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default memo(ProductSalesForm)
