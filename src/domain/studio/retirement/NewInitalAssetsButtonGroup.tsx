import Modal from '../../../components/Modal'
import { useState } from 'react'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { useForm } from 'react-hook-form'
import { useNewInitalAsset } from '../hooks/studio_hooks'

export default function NewInitalAssetsButtonGroup({
  planId,
  onSuccess,
}: {
  planId: string
  onSuccess: () => void
}) {
  const [showInitalAssetModal, setShowInitalAssetModal] = useState(false)
  if (showInitalAssetModal) {
    return (
      <Modal
        title={`Add inital asset`}
        backgroundColor="bg-white"
        border="border border-primary"
        closable={true}
        onClose={() => setShowInitalAssetModal(false)}
      >
        <NewInitalAssetForm
          planId={planId}
          onSuccess={() => {
            setShowInitalAssetModal(false)
            onSuccess()
          }}
        />
      </Modal>
    )
  }
  return (
    <div className="flex w-full rounded-md shadow-sm" role="group">
      <button
        type="button"
        onClick={() => setShowInitalAssetModal(true)}
        className="flex-grow border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
      >
        New asset
      </button>
    </div>
  )
}

function NewInitalAssetForm({
  planId,
  onSuccess,
}: {
  planId: string
  onSuccess: () => void
}) {
  const newInitalAssetMutation = useNewInitalAsset({
    onSuccess: () => {
      onSuccess()
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      category: '',
      date: new Date(),
    },
  })
  const onSubmit = (data) => {
    const { title, description, cost, date, category } = data
    newInitalAssetMutation.mutate({
      planId: planId,
      title: title,
      description: description,
      category: category,
      date: new Date(date),
      value: {
        amount: Number(cost),
        currency: 'USD',
      },
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            type="text"
            {...register('title', {
              required: 'Please give your asset a name',
            })}
            id="title"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Description
          </label>
          <input
            type="text"
            {...register('description', {
              required: 'Please describe your expense in detail',
            })}
            id="description"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            {...register('category')}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Choose a category</option>
            <option value="stocks">Stocks</option>
            <option value="bonds">Bonds</option>
            <option value="real_estate">Real Estate</option>
            <option value="cash">Cash</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Date
          </label>
          <input
            type="date"
            {...register('date', {
              required: 'When will this excpense happen?',
            })}
            id="date"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label
            htmlFor="cost"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Cost (USD)
          </label>
          <input
            min={'0.01'}
            step={'0.01'}
            type="number"
            // @ts-ignore
            {...register('cost', {
              required: 'Enter a cost for your expense',
            })}
            id="cost"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700"
            placeholder="0.00"
          />
        </div>
      </div>

      {/* 
      // @ts-ignore */}
      <ErrorMessage err={errors.title} />
      <ErrorMessage err={errors.description} />

      <div>
        <button
          type="submit"
          className="w-full rounded-md bg-primary py-2 text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Save
        </button>
      </div>
    </form>
  )
}
