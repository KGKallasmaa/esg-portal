import Money from '../../../models/money'
import { formatMoney } from '../../money/money'
import {
  useDeleteInitalAsset,
  useDeleteOneTimeExcpense,
  useDeleteOneTimeIncome,
  useDeleteOneTimeInvestment,
} from '../hooks/studio_hooks'

export function OneTimeExcpenseCard({
  planId,
  id,
  title,
  description,
  category,
  amount,
  date,
  onDelete,
}: {
  planId: string
  id: string
  title: string
  description?: string
  category: string
  amount: Money.MoneyValue
  date: Date
  onDelete: () => void
}) {
  const deleteMutation = useDeleteOneTimeExcpense(planId, {
    onSuccess: () => {
      onDelete()
    },
  })

  const onDeleteExcpense = () => {
    deleteMutation.mutate(id)
  }
  // Convert the date to a readable format, assuming date is a Date object
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date))
  }

  return (
    <li
      key={'one-time-exp-' + id}
      className="flex items-center justify-between gap-x-6 rounded-lg bg-gray-800 py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{categoryEmoji(category)}</span>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
            {description}
          </p>
          <p className="text-xs text-gray-300">
            {formatDate(date)} - {formatMoney(amount)}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDeleteExcpense()}
        className="ml-4 flex-none rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Delete
      </button>
    </li>
  )
}

export function OneTimeIncomeCard({
  planId,
  id,
  title,
  description,
  category,
  amount,
  date,
  onDelete,
}: {
  planId: string
  id: string
  title: string
  description?: string
  category: string
  amount: Money.MoneyValue
  date: Date
  onDelete: () => void
}) {
  const deleteMutation = useDeleteOneTimeIncome(planId, {
    onSuccess: () => {
      onDelete()
    },
  })

  const onDeleteExcpense = () => {
    deleteMutation.mutate(id)
  }
  // Convert the date to a readable format, assuming date is a Date object
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date))
  }

  return (
    <li
      key={'one-time-income' + id}
      className="flex items-center justify-between gap-x-6 rounded-lg bg-gray-800 py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{categoryEmoji(category)}</span>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
            {description}
          </p>
          <p className="text-xs text-gray-300">
            {formatDate(date)} - {formatMoney(amount)}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDeleteExcpense()}
        className="ml-4 flex-none rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Delete
      </button>
    </li>
  )
}

export function OneTimeInvestmentsCard({
  planId,
  id,
  title,
  description,
  category,
  amount,
  date,
  onDelete,
}: {
  planId: string
  id: string
  title: string
  description?: string
  category: string
  amount: Money.MoneyValue
  date: Date
  onDelete: () => void
}) {
  const deleteMutation = useDeleteOneTimeInvestment(planId, {
    onSuccess: () => {
      onDelete()
    },
  })

  const onDeleteExcpense = () => {
    deleteMutation.mutate(id)
  }
  // Convert the date to a readable format, assuming date is a Date object
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date))
  }

  return (
    <li
      key={'one-time-exp-' + id}
      className="flex items-center justify-between gap-x-6 rounded-lg bg-gray-800 py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{categoryEmoji(category)}</span>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
            {description}
          </p>
          <p className="text-xs text-gray-300">
            {formatDate(date)} - {formatMoney(amount)}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDeleteExcpense()}
        className="ml-4 flex-none rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Delete
      </button>
    </li>
  )
}

export function InitalAssetCard({
  planId,
  id,
  title,
  description,
  category,
  amount,
  date,
  onDelete,
}: {
  planId: string
  id: string
  title: string
  description?: string
  category: string
  amount: Money.MoneyValue
  date: Date
  onDelete: () => void
}) {
  const deleteMutation = useDeleteInitalAsset(planId, {
    onSuccess: () => {
      onDelete()
    },
  })

  const onDeleteExcpense = () => {
    deleteMutation.mutate(id)
  }
  // Convert the date to a readable format, assuming date is a Date object
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(date))
  }

  return (
    <li
      key={'inital-asset' + id}
      className="flex items-center justify-between gap-x-6 rounded-lg bg-gray-800 py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{categoryEmoji(category)}</span>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
            {description}
          </p>
          <p className="text-xs text-gray-300">
            {formatDate(date)} - {formatMoney(amount)}
          </p>
        </div>
      </div>

      <button
        onClick={() => onDeleteExcpense()}
        className="ml-4 flex-none rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
      >
        Delete
      </button>
    </li>
  )
}

export function categoryEmoji(category: string) {
  switch (category) {
    case 'car':
      return '🚗'
    default:
      console.error('No emoji for category: ', category)
      return ''
  }
}
