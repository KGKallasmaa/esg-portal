import { TransactionCard } from '../transactions/TransactionCard'
import Integrations from '../../models/integrations'
import RecurringTransactionCard from './RecurringTransactionCard'
import {
  formatMoney,
  recurringTransactionsToAbsoluteValues,
} from '../money/money'
import Transactions from '../../models/transactions'
import { useGetTransactions } from '../transactions/hooks/transactions_hooks'
import { useState } from 'react'
import Fuse from 'fuse.js'
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline'

export function TransactionsTableWithSearch({
  category,
  startDate,
  endDate,
  accountIds,
}: {
  startDate: Date
  endDate: Date
  category?: string
  accountIds?: string[]
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const { data: groupedTransactions, isLoading } = useGetTransactions({
    start: startDate,
    end: endDate,
    category,
    accountIds,
  })

  if (isLoading) return <div>Loading...</div>
  if (!groupedTransactions) return null

  const filteredData = filterGroupedTransactions(
    searchQuery,
    groupedTransactions
  )

  return (
    <div className="p-4 dark:bg-gray-800 dark:text-white">
      <div className="mb-4 flex items-center">
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassCircleIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            placeholder="Find a transaction"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border py-2 pl-10 pr-4 text-white focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
      </div>
      <TransactionsTable groupedTransactions={filteredData} />
    </div>
  )
}
function filterGroupedTransactions(
  query: string,
  groupedTransactions: Integrations.GroupedTransactions
): Integrations.GroupedTransactions {
  return {
    transactions: groupedTransactions.transactions.map((item) => {
      const transactions = filterTransactions(query, item.transactions)
      return {
        date: item.date,
        transactions: transactions,
      }
    }),
  }
}

function filterTransactions(
  query: string,
  transactions: Transactions.Transaction[]
): Transactions.Transaction[] {
  if (!transactions) return []
  if (query === '') return transactions
  const fuse = new Fuse(transactions, {
    keys: ['name', 'merchantName'], // Adjust based on your data structure
    threshold: 0.3,
  })
  return query ? fuse.search(query).map((result) => result.item) : transactions
}

export function TransactionsTable({
  groupedTransactions,
}: {
  groupedTransactions: Integrations.GroupedTransactions
}) {
  return (
    <div className="overflow-y-auto">
      {groupedTransactions.transactions.map((item) => {
        if (item.transactions.length > 0) {
          return (
            <DailyTransactionTable
              key={'daily_transaction_table' + item.date}
              date={new Date(item.date)}
              transactions={item.transactions}
            />
          )
        }
      })}
    </div>
  )
}

export function RecurringTransactionsTable({
  useAbsTransactionValue = false,
  transactions,
}: {
  useAbsTransactionValue?: boolean
  transactions: Transactions.RecurringTransaction[]
}) {
  if (useAbsTransactionValue) {
    transactions = recurringTransactionsToAbsoluteValues(transactions)
  }
  return (
    <div
      className={
        transactions.length > 5
          ? 'h-[500px] overflow-y-auto'
          : 'overflow-y-auto'
      }
    >
      {transactions.map((item) => (
        <RecurringTransactionCard
          key={'recurring_transaction_card' + item.id}
          transaction={item}
        />
      ))}
    </div>
  )
}

function DailyTransactionTable({
  date,
  transactions,
}: {
  date: Date
  transactions: Transactions.Transaction[]
}) {
  const isSameDay = isTodayDay(date)
  // is the day yesterday?
  const isYDay = isYesterday(date)
  const dateLabel = isSameDay
    ? 'Today'
    : isYDay
    ? 'Yesterday'
    : new Date(date).toLocaleDateString()

  let amount = 0
  for (let index = 0; index < transactions.length; index++) {
    amount += transactions[index].money.amount
  }

  const transactionsTotal = {
    amount: amount,
    currency: transactions[0].money.currency,
  }

  return (
    <div key={'transactions-in_day' + date}>
      <div className="ml-2 flex items-center justify-between">
        <dt className="text-base font-normal text-gray-500 dark:text-gray-300">
          {dateLabel}
        </dt>
        <dt className="mr-2 text-base font-normal text-gray-500 dark:text-gray-300">
          {formatMoney(transactionsTotal)}
        </dt>
      </div>
      <dd className="mt-1">
        <TransactionCards transactions={transactions} />
      </dd>
    </div>
  )
}

function TransactionCards({
  transactions,
}: {
  transactions: Transactions.Transaction[]
}) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {transactions.map((transaction) => (
        <TransactionCard
          key={'transaction-card-' + transaction.id}
          transaction={transaction}
        />
      ))}
    </ul>
  )
}

function isTodayDay(d1: Date) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return (
    today.getFullYear() == today.getFullYear() &&
    d1.getMonth() == today.getMonth() &&
    d1.getDate() == today.getDate()
  )
}

function isYesterday(d1: Date) {
  let yesterday = new Date()
  yesterday.setHours(0, 0, 0, 0)
  yesterday.setDate(yesterday.getDate() - 1)
  if (yesterday.getFullYear() == yesterday.getFullYear()) {
    return (
      d1.getMonth() == yesterday.getMonth() &&
      d1.getDate() == yesterday.getDate()
    )
  }
  return false
}
