import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useNewProduct } from './hooks/product_hooks'
import toast from 'react-hot-toast'

function ProductSalesForm({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      units: 1,
      sales: 100,
  }});
  const newProductMutation = useNewProduct();

  const onSubmit = (data) => {
    newProductMutation.mutate(
      {
        producer_id: productId,
        name: data.name,
        barcode: data.barcode,
      },
      {
        onSuccess: () => {
          toast.success('Product created');
          onClose();
        },
        onError: (error) => {
          toast.error('Product creation failed.');
          console.error(error);
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 p-4 bg-white rounded-lg shadow-md"
    >
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block font-medium mb-1 text-gray-900">Units Sold:</label>
          <input
            type="number"
            {...register('units', {
              required: 'Units Sold is required',
              min: { value: 0, message: 'Units Sold must be greater than 0' },
            })}
            placeholder="Enter units sold"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.units && (
            <p className="text-xs italic text-red-500">{errors.units.message}</p>
          )}
        </div>

        <div className="w-1/2">
          <label className="block font-medium mb-1 text-gray-900">Sales Volume (USD):</label>
          <input
            type="number"
            {...register('sales', {
              required: 'Sales is required',
              min: { value: 0, message: 'Sales must be greater than 0' },
            })}
            placeholder="Enter sales volume"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.sales && (
            <p className="text-xs italic text-red-500">{errors.sales.message}</p>
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
  );
}

export default memo(ProductSalesForm)
