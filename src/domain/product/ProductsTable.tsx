import { isMobile } from 'react-device-detect'
import LoadingCard from '../../components/LoadingCard'
import { useGetProductsByProducerId } from './hooks/product_hooks'
import NewProductButton from './NewProductButton'
import SingleProductRow from './SingleProductRow'

export default function ProductsTable({ producerId }: { producerId: string }) {
  const { data: products, isLoading } = useGetProductsByProducerId(producerId)
  if (isLoading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Products
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the products your company is selling and their
              yearly sales volume.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <NewProductButton producerId={producerId} />
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <ul role="list" className="min-w-full divide-y divide-gray-300">
                <LoadingCard count={isMobile ? 2 : 3} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const nrOfProducts = products?.length || 0
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Products
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products your company is selling and their yearly
            sales volume.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <NewProductButton producerId={producerId} />
        </div>
      </div>
      {nrOfProducts > 0 && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <ul role="list" className="min-w-full divide-y divide-gray-300">
                {products?.map((product) => {
                  const { id, details } = product
                  return (
                    <SingleProductRow
                      key={`single-product-row-${id}`}
                      id={id}
                      name={details.title}
                      barcode={details.barcode}
                      state={product.state}
                    />
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
