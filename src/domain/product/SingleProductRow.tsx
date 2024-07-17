import classNames from 'classnames'
import { Menu } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Bars2Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import EditProductModal from './EditProductDetailsModal'
import DeleteProduct from './DeleteProduct'
import ProductDetailsView from './ProductDetailsView'

const stateColors = {
  active: 'text-green-700 bg-green-50 ring-green-600/20',
  draft: 'text-gray-600 bg-gray-50 ring-gray-500/10',
}

export default function SingleProductRow({ id, name, barcode, state }) {
  const [mode, setMode] = useState('')

  switch (mode) {
    case 'edit':
      return <EditProductModal handleClose={() => setMode('')} productId={id} />
    case 'delete':
      return <DeleteProduct productId={id} />
  }

  return (
    <>
      <li
        onClick={
          mode === 'details' ? () => setMode('') : () => setMode('details')
        }
        className="flex items-center justify-between gap-x-6 py-5 hover:bg-gray-50"
      >
        <div className="min-w-0 ">
          <div className="flex items-start gap-x-3">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {name}
            </p>
            {state !== 'active' && (
              <p
                className={classNames(
                  stateColors[state],
                  'mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                )}
              >
                {state}
              </p>
            )}
          </div>
          <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
            <Bars2Icon className="h-4 w-4" />
            <p className="whitespace-nowrap">{barcode}</p>
          </div>
        </div>
        <div className="flex flex-none items-center gap-x-4">
          <Menu as="div" className="relative flex-none">
            <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
              <span className="sr-only">Open options</span>
              <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
            </Menu.Button>
            <Menu.Items
              // @ts-ignore
              transition
              className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <Menu.Item>
                <button
                  onClick={() => setMode('edit')}
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:font-bold hover:text-black data-[focus]:bg-gray-50"
                >
                  Edit<span className="sr-only">, {name}</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <a
                  onClick={() => setMode('delete')}
                  className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                >
                  Delete<span className="sr-only">, {name}</span>
                </a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </li>
      {mode === 'details' && <ProductDetailsView productId={id} />}
    </>
  )
}
