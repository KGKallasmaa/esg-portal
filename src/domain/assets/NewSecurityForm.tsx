import { PlusSmallIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import {
  useNewSecurityAsset,
  useSecurityPriceAtDate,
} from './hooks/assets_hooks'
import { NewSecurityRequest } from './hooks/assets_requests'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { popularSecurites, stockInfo } from './media/stock_info'
import { SecurityIcon } from '../holdings/media/security_icons'
import { ErrorMessage } from '../../components/ErrorMessage'
import { formatMoney, round } from '../money/money'

const stockInfoKeys = Object.keys(stockInfo)
const minStep = '0.0000001'

function NewSecurityForm({ onSecurityAdded }: { onSecurityAdded: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  if (isModalOpen) {
    return (
      <Modal
        title={`Add stocks`}
        backgroundColor="bg-white"
        border="border border-primary"
        closable={true}
        onClose={() => setIsModalOpen(false)}
      >
        <NewSecurity
          onStockSubmitted={() => {
            setIsModalOpen(false)
            onSecurityAdded()
          }}
        />
      </Modal>
    )
  }
  return (
    <button
      onClick={() => setIsModalOpen(!isModalOpen)}
      className="ml-auto flex items-center gap-x-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
      Add stocks
    </button>
  )
}

function NewSecurity({ onStockSubmitted }: { onStockSubmitted: () => void }) {
  const [step, setStep] = useState(0)
  const [symbol, setSymbol] = useState('')

  const mutation = useNewSecurityAsset({
    onSuccess: () => {
      onStockSubmitted()
    },
  })

  const onSubmit = (d) => {
    const { isin, currency } = stockInfo[symbol]
    const { quantity, purchaseDate, costPerUnit } = d

    // @ts-ignore
    let request: NewSecurityRequest = {
      quantity: parseFloat(quantity),
      isin: stockInfo[symbol].isin,
      purchaseDate: new Date(purchaseDate),
      costPerUnit: {
        amount: parseFloat(costPerUnit),
        currency: currency,
      },
    }
    mutation.mutate({ req: request })
  }

  const selectStock = (symbol: string) => {
    setSymbol(symbol)
    setStep(1)
  }

  if (step === 0) {
    return <SecuritySelectForm onSelectSecurity={selectStock} />
  }
  const { isin, currency } = stockInfo[symbol]
  return (
    <SecurityDetailsForm
      currency={currency}
      isin={isin}
      symbol={symbol}
      onStockSubmitted={onSubmit}
    />
  )
}

function SecuritySelectForm({
  onSelectSecurity,
}: {
  onSelectSecurity: (symbol: string) => void
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredSecurities, setFilteredSecurities] = useState(stockInfo)

  const handleSearchChange = (event) => {
    const value = event.target.value
    setSearchTerm(value)

    if (value.length > 0) {
      // Filter the stockInfo based on the search term
      let filtered = {}
      for (let index = 0; index < stockInfoKeys.length; index++) {
        const stockSymbol = stockInfoKeys[index]
        const { name } = stockInfo[stockSymbol]

        if (stockSymbol.toLowerCase().includes(value.toLowerCase())) {
          filtered[stockSymbol] = stockInfo[stockSymbol]
        }
        if (name.toLowerCase().includes(value.toLowerCase())) {
          filtered[stockSymbol] = stockInfo[stockSymbol]
        }
      }
      // @ts-ignore
      setFilteredSecurities(filtered)
    } else {
      setFilteredSecurities(stockInfo)
    }
  }

  const handleSelectSecurity = (symbol) => {
    onSelectSecurity(symbol)
  }

  return (
    <div>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search Stock & Funds"
        className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
      />
      {searchTerm === '' && <p className="mt-2 border-b-2">Popular</p>}

      <ul className="mt-2">
        {Object.entries(
          searchTerm === '' ? popularSecurites : filteredSecurities
        ).map(([symbol, { name, currency }]) => {
          return (
            <li
              onClick={() => handleSelectSecurity(symbol)}
              key={'security-card-' + symbol}
              className="relative flex justify-between gap-x-6 py-5"
            >
              <div className="flex min-w-0 gap-x-4">
                <SecurityIcon
                  securityType={'equity'}
                  ticker={symbol}
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {name}
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500 dark:text-gray-200">
                    {symbol} - {currency}
                  </p>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function SecurityDetailsForm({ isin, currency, symbol, onStockSubmitted }) {
  const now = new Date()
  const initalDate = now.toISOString().split('T')[0]

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
      costPerUnit: 1,
      purchaseDate: initalDate,
    },
  })

  // @ts-ignore
  const watchedDate = watch('purchaseDate', new Date())
  const watchedQuantity = watch('quantity', 0)
  // @ts-ignore
  const watchedPrice = watch('costPerUnit', 0)

  const { data: priceAtDate, refetch } = useSecurityPriceAtDate(
    isin,
    // @ts-ignore
    new Date(watchedDate)
  )

  useEffect(() => {
    refetch()
  }, [watchedDate, refetch])
  useEffect(() => {
    if (priceAtDate) {
      // @ts-ignore
      setValue('costPerUnit', round(priceAtDate.value.amount, 3))
    }
  }, [priceAtDate, setValue])

  const onSubmit = (data) => {
    onStockSubmitted(data)
  }
  const { name } = stockInfo[symbol]
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <SecurityIcon
            securityType={'equity'}
            ticker={symbol}
            className="h-6 w-6 flex-none rounded-full bg-gray-50"
          />
          <span className="ml-2 text-sm font-medium">{name}</span>
        </div>
        <div>
          <label
            htmlFor="purchaseDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Purchase Date
          </label>
          <input
            type="date"
            {...register('purchaseDate', {
              required: 'Please enter the purchase date',
            })}
            id="purchaseDate"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Quantity
          </label>
          <input
            min={minStep}
            step={minStep}
            type="number"
            {...register('quantity', { required: 'Please enter the quantity' })}
            id="quantity"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>

        <div className="ml-2 flex-1">
          <label
            htmlFor="costPerUnit"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Purchase Price
          </label>
          <input
            min={minStep}
            step={minStep}
            type="number"
            // @ts-ignore
            {...register('costPerUnit', {
              required: 'Please enter the purchase price',
            })}
            id="costPerUnit"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700"
            placeholder="0.00"
          />
        </div>
      </div>
      <div className="flex-1">
        <p>
          Total{' '}
          {formatMoney({
            // @ts-ignore
            amount: watchedQuantity * watchedPrice,
            currency: currency,
          })}
        </p>
      </div>
      {/* 
      // @ts-ignore */}
      <ErrorMessage err={errors.pruchaseDate} />
      <ErrorMessage err={errors.costPerUnit} />

      <ErrorMessage err={errors.quantity} />
      {/* 
      // @ts-ignore */}
      <ErrorMessage err={errors.purchasePrice} />

      <div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary py-2 text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default NewSecurityForm
