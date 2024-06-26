import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ArrowsUpDownIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline'
import classNames from 'classnames'
import useCashflowStore from '../../state_management/stores/cashflow.store'
import { formatMoney } from '../money/money'
import {
  useGetCashflowInsights,
  useGetSingleCategoryCashflowInsights,
} from './hooks/cashflow_hooks'
import { useGetTransactions } from '../transactions/hooks/transactions_hooks'

export function MultiCategoryCashflowNumbers() {
  const {
    cashflowStart,
    cashflowEnd,
    detailedView,
    setDetailedView,
    transactionCategories,
  } = useCashflowStore()
  const { data: insights } = useGetCashflowInsights(
    cashflowStart,
    cashflowEnd,
    transactionCategories
  )
  if (!insights) return null

  const { summary } = insights
  const { total } = summary
  const { income, expenses } = total

  const net = {
    amount: income.amount - expenses.amount,
    currency: income.currency,
  }
  const stats = [
    {
      name: 'Income',
      value: income,
      onClick: () => setDetailedView('income'),
      highLight: true,
      icon: <ArrowLongUpIcon className="h-6 w-6 text-green-400" />,
    },
    {
      name: 'Expenses',
      value: expenses,
      onClick: () => setDetailedView('expenses'),
      highLight: detailedView === 'expenses',
      icon: <ArrowLongDownIcon className="h-6 w-6 text-red-400" />,
    },
    {
      name: 'Net',
      value: net,
      highLight: false,
      icon: <ArrowsUpDownIcon className="h-6 w-6 text-blue-400" />,
    },
  ]
  return (
    <div className="dray-9">
      <div className="grid grid-cols-3 gap-px bg-white/5">
        {stats.map((stat) => (
          <div
            onClick={stat.onClick}
            key={stat.name}
            className="bg-gray-600 px-4 py-2 dark:bg-gray-800 sm:px-6 lg:px-8"
          >
            <div className="flex items-center space-x-3">
              {stat.icon}
              <p
                className={classNames(
                  'text-sm font-medium leading-6 text-white dark:text-gray-400',
                  {
                    'font-semibold': stat.highLight,
                  }
                )}
              >
                {stat.name}
              </p>
            </div>
            <div className="mt-2 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  'text-2xl font-semibold tracking-tight text-white',
                  {
                    'text-primary': stat.highLight,
                  }
                )}
              >
                {formatMoney(stat.value)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function SingleCategoryCashflowNumbers({
  category,
}: {
  category: string
}) {
  const { cashflowStart, cashflowEnd, detailedView } = useCashflowStore()
  const { data: insights } = useGetSingleCategoryCashflowInsights(
    category,
    cashflowStart,
    cashflowEnd
  )
  const { data: groupedTransactions, isLoading } = useGetTransactions({
    start: cashflowStart,
    end: cashflowEnd,
    category,
  })

  if (!insights) return null
  if (isLoading) return null

  const { summary } = insights
  const { total } = summary
  const { income, expenses } = total

  const net = {
    amount: income.amount - expenses.amount,
    currency: income.currency,
  }

  const subCategoryMap = {}
  if (groupedTransactions) {
    const allTransactions = groupedTransactions.transactions
      .map((transaction) => transaction.transactions)
      .flat()
    allTransactions.forEach((transaction) => {
      subCategoryMap[transaction.personalFinanceCategory.detailed] = true
    })
  }

  const subcategoryCount = Object.keys(subCategoryMap).length

  const stats = [
    {
      name: 'Net',
      value: formatMoney(net),
      icon: <ArrowsUpDownIcon className="h-6 w-6 text-blue-400" />,
    },
    {
      name: 'Subcategories',
      value: subcategoryCount,
      icon: <PuzzlePieceIcon className="h-6 w-6 text-gray-400" />,
    },
  ]
  return (
    <div className="dray-9">
      <div className="grid grid-cols-2 gap-px bg-white/5">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-600 px-4 py-2 dark:bg-gray-800 sm:px-6 lg:px-8"
          >
            <div className="flex items-center space-x-3">
              {stat.icon}
              <p
                className={classNames(
                  'text-sm font-medium leading-6 text-gray-400'
                )}
              >
                {stat.name}
              </p>
            </div>
            <div className="mt-2 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  'text-2xl font-semibold tracking-tight text-white'
                )}
              >
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
