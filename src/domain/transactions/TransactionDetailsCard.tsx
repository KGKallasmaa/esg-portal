import { useState } from 'react'
import categoryEmojis from '../cashflow/category_emoji'
import { formatMoney, formatMoneyAbs } from '../money/money'
import {
  useDeleteTransaction,
  useGetTransaction,
  useUpdateTransaction,
} from './hooks/transactions_hooks'
import Transactions from '../../models/transactions'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import Account from './AccountName'

export function TransactionDetailsCard({
  transactionId,
}: {
  transactionId: string
}) {
  const [editMode, setEditMode] = useState(false)
  const {
    data: transaction,
    isLoading,
    refetch,
  } = useGetTransaction(transactionId)
  const transferUpdateMutation = useUpdateTransaction({
    onSuccess: () => refetch(),
  })

  const handleIncludeInAnalysisChange = (e) => {
    transferUpdateMutation.mutate({
      id: transactionId,
      request: {
        includeInAnalysis: e.target.checked,
      },
    })
  }

  const handleHiglightChange = (e) => {
    transferUpdateMutation.mutate({
      id: transactionId,
      request: {
        highlight: e.target.checked,
      },
    })
  }

  if (!transaction) return null

  if (editMode) {
    const handleEditComplete = () => {
      refetch()
      setEditMode(false)
    }
    return (
      <Modal
        title={`Edit transaction details`}
        titleColor="text-primary"
        backgroundColor="bg-gray-300"
        border="border border-primary"
        closable={true}
        onClose={() => setEditMode(false)}
      >
        <EditTransaction
          transaction={transaction}
          onDelete={() => {
            window.location.reload()
          }}
          onEditComplete={handleEditComplete}
        />
      </Modal>
    )
  }

  const {
    id,
    thirdPartyId,
    accountId,
    date,
    money,
    location,
    name,
    merchantName,
    paymentChannel,
    personalFinanceCategory,
    accountOwner,
    transactionType,
    isIncome,
    includeInAnalysis,
    highlight,
  } = transaction

  return (
    <div className="w-fit rounded-lg p-6 text-gray-500 shadow-lg dark:bg-gray-800 dark:text-white">
      <div className="mb-4 text-center">
        <div className="text-sm text-gray-400">{id}</div>
        <div className="py-2 text-4xl font-bold">{formatMoneyAbs(money)}</div>
      </div>
      <div className="mb-4 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
          {categoryEmojis(
            personalFinanceCategory?.primary,
            personalFinanceCategory?.detailed
          )}
        </div>
        <div className="flex-grow text-center">
          <h3 className="text-lg font-semibold">
            {personalFinanceCategory.primary}
          </h3>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 border-t-[1px] border-white text-sm">
        {!isLoading && accountId && (
          <div className="">
            <p className="font-semibold">Account:</p>
            <p>
              <Account accountId={accountId} />
            </p>
          </div>
        )}
        <div>
          <p className="font-semibold">Original amount:</p>
          <p>{formatMoney(money)}</p>
        </div>
        <div>
          <p className="font-semibold">Date:</p>
          <p>{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Include in analysis:</p>
          <label className="switch">
            <input
              type="checkbox"
              onChange={handleIncludeInAnalysisChange}
              checked={includeInAnalysis}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex items-center justify-between">
          <p className="font-semibold">Highlight :</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={highlight}
              onChange={handleHiglightChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => setEditMode(!editMode)}
          className="rounded bg-primary px-4 py-2 font-bold text-white hover:bg-primary-darker"
        >
          Edit transaction
        </button>
      </div>
    </div>
  )
}

function EditTransaction({
  onEditComplete,
  onDelete,
  transaction,
}: {
  onEditComplete: () => void
  onDelete: () => void
  transaction: Transactions.Transaction
}) {
  const deleteTransactionMutation = useDeleteTransaction({
    onSuccess: () => onDelete(),
  })
  const transferUpdateMutation = useUpdateTransaction({
    onSuccess: () => onEditComplete(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: transaction.name,
      date: new Date(transaction.date).toISOString().slice(0, 10),
    },
  })

  const onSubmit = (data) => {
    transferUpdateMutation.mutate({
      id: transaction.id,
      request: {
        name: data.name,
        date: new Date(data.date),
      },
    })
  }

  const handleDelete = () => {
    deleteTransactionMutation.mutate(transaction.id)
    onDelete()
  }

  return (
    <div className="mx-auto max-w-lg rounded-lg p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Transaction Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name', {
              required: 'This field is required',
              maxLength: { value: 50, message: 'Name is too long' },
            })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-500 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800 sm:text-sm"
          />
          {errors.name && (
            <p className="text-xs italic text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Transaction Date
          </label>
          <input
            type="date"
            id="date"
            {...register('date', { required: 'This field is required' })}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-500 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:bg-gray-800 sm:text-sm"
          />
          {errors.date && (
            <p className="text-xs italic text-red-500">{errors.date.message}</p>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
          >
            Delete Transaction
          </button>
        </div>
      </form>
    </div>
  )
}
