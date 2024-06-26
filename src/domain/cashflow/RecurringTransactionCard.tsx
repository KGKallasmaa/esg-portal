import {
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { memo, useState } from 'react'
import Transactions from '../../models/transactions'
import useCashflowStore from '../../state_management/stores/cashflow.store'
import { formatMoney, formatMoneyAbs } from '../money/money'
import { useDeleteRecurringTransaction } from '../transactions/hooks/transactions_hooks'
import categoryEmojis from './category_emoji'

function RecurringTransactionCard({
  transaction,
}: {
  transaction: Transactions.RecurringTransaction
}) {
  const { setRefreshRecurringTransactions } = useCashflowStore()

  const locale = navigator.language || 'en-US'
  const internationalFormat = new Intl.RelativeTimeFormat(locale)

  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const {
    id,
    isIncome,
    thirdPartyId,
    accountId,
    description,
    merchantName,
    personalFinanceCategory,
    firstDate,
    lastDate,
    frequency,
    transactionIds,
    averageAmount,
    lastAmount,
    isActive,
    status,
    isUserModified,
    lastUserModifiedDatetime,
    isVisible,
  } = transaction

  const deleteMutation = useDeleteRecurringTransaction(id)

  const nextTransactionDate = nextPredictedTransactionDate(
    new Date(lastDate),
    frequency
  )
  const dateDiff = nextTransactionDate.getTime() - new Date().getTime()
  const nrOfDaysTillNextTransaction = internationalFormat.format(
    Math.round(dateDiff / 1_000_000_000),
    'days'
  )
  const isToday = Math.round(dateDiff / 1_000_000_000) === 0

  // Function to handle delete action
  const handleDelete = () => {
    // Implement the delete logic here
    deleteMutation.mutate(id)
  }

  return (
    <>
      <li
        onClick={toggleExpanded}
        key={'income_transaction_' + id}
        className="relative flex justify-between  gap-x-6 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 sm:px-6 md:py-4 lg:py-5"
      >
        <div className="flex min-w-0 gap-x-4">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
            <span className="text-xl">
              {categoryEmojis(
                personalFinanceCategory.primary,
                personalFinanceCategory.detailed
              )}
            </span>
          </div>
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-primary">
              <span className="absolute inset-x-0 -top-px bottom-0 " />
              {description || merchantName}
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              {frequency}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900 dark:text-gray-300">
              {formatMoney(lastAmount)}
            </p>
            {!isToday && (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                <time dateTime={lastDate}>{nrOfDaysTillNextTransaction}</time>
              </p>
            )}
          </div>
          {expanded ? (
            <ChevronDownIcon
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <ChevronRightIcon
              className="h-5 w-5 flex-none rotate-90 transform text-gray-400"
              aria-hidden="true"
            />
          )}
        </div>
      </li>
      {expanded && (
        <div className="rounded-lg bg-gray-600 p-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="font-semibold">Average Amount:</p>
              <p
                className={classNames('', {
                  'text-green-500 dark:text-green-300': isIncome,
                  'text-gray-900 dark:text-gray-300': !isIncome,
                })}
              >
                {formatMoneyAbs(averageAmount)}{' '}
                {/* Include a mini graph here if possible */}
              </p>
            </div>
            <div>
              <p className="font-semibold">Last Amount:</p>
              <p
                className={classNames('', {
                  'text-green-500 dark:text-green-300': isIncome,
                  'text-gray-900 dark:text-gray-300': !isIncome,
                })}
              >
                {formatMoneyAbs(lastAmount)}{' '}
                {/* Include a mini graph here if possible */}
              </p>
            </div>
            <div>
              <p className="font-semibold">Frequency:</p>
              <p>{frequency}</p>
            </div>
            <div>
              <p className="font-semibold">First Transaction:</p>
              <p>{firstDate}</p>
            </div>
            <div>
              <p className="font-semibold">Last Transaction:</p>
              <p>{lastDate}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p className={isActive ? 'text-green-600' : 'text-red-600'}>
                {isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
            <div>
              <p className="font-semibold">Category:</p>
              <p>{personalFinanceCategory.primary}</p>
            </div>
            <div>
              <p className="font-semibold">Sub category:</p>
              <p>{personalFinanceCategory.detailed}</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              onClick={handleDelete}
              className="flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <TrashIcon className="mr-2 h-5 w-5" aria-hidden="true" />
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function nextPredictedTransactionDate(
  lastDate: Date,
  frequency: Transactions.TransactionFrequency
) {
  let predictedNextTransactionDate = new Date(lastDate)
  switch (frequency) {
    case 'WEEKLY':
      predictedNextTransactionDate.setDate(
        predictedNextTransactionDate.getDate() + 7
      )
      break
    case 'BIWEEKLY':
      predictedNextTransactionDate.setDate(
        predictedNextTransactionDate.getDate() + 14
      )
      break
    case 'MONTHLY':
      predictedNextTransactionDate.setMonth(
        predictedNextTransactionDate.getMonth() + 1
      )
      break
    case 'QUARTERLY':
      predictedNextTransactionDate.setMonth(
        predictedNextTransactionDate.getMonth() + 3
      )
      break
    case 'ANNUALLY':
      predictedNextTransactionDate.setFullYear(
        predictedNextTransactionDate.getFullYear() + 1
      )
      break
  }
  return predictedNextTransactionDate
}

export default memo(RecurringTransactionCard)
