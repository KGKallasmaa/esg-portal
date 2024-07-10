import NewProductButton from './NewProductButton'
import SingleProductRow from './SingleProductRow'

const products = [
  {
    id: 'product-123',
    name: 'Cheese one',
    barcode: '123456789',
    state: 'active',
  },
  {
    id: 'product-456',
    name: 'Cheese two',
    barcode: '2345678',
    state: 'draft',
  },
]

export default function ProductsTable({ producerId }: { producerId: string }) {
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
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <ul role="list" className="min-w-full divide-y divide-gray-300">
              {products.map((product) => {
                return (
                  <SingleProductRow
                    key={'single-product-row' - product.id}
                    id={product.id}
                    name={product.name}
                    barcode={product.barcode}
                    state={product.state}
                    image={undefined}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
