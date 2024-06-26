import Modal from '../../../components/Modal'
import { useState } from 'react'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { useForm } from 'react-hook-form'
import {
  useNewOneTimeIncome,
  useNewOneTimeInvestment,
  useNewRecurringIncome,
  useNewRecurringInvestment,
} from '../hooks/studio_hooks'

export default function NewInvestmentsButtonGroup({
  planId,
  onSuccess,
}: {
  planId: string
  onSuccess: () => void
}) {
  const [showOneTimeInvestmentModal, setShowOneTimeInvestmentModal] =
    useState(false)
  const [showRecurringInvestmentModal, setShowRecurringInvestmentModal] =
    useState(false)
  if (showOneTimeInvestmentModal) {
    return (
      <Modal
        title={`Add one-time investment`}
        backgroundColor="bg-white"
        border="border border-primary"
        closable={true}
        onClose={() => setShowOneTimeInvestmentModal(false)}
      >
        <NewOneTimeInvestmentForm
          planId={planId}
          onSuccess={() => {
            setShowOneTimeInvestmentModal(false)
            onSuccess()
          }}
        />
      </Modal>
    )
  }
  if (showRecurringInvestmentModal) {
    return (
      <Modal
        title={`Add recurring investments`}
        backgroundColor="bg-white"
        border="border border-primary"
        closable={true}
        onClose={() => setShowRecurringInvestmentModal(false)}
      >
        <NewReccuringInvestmentForm
          planId={planId}
          onSuccess={() => {
            setShowRecurringInvestmentModal(false)
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
        onClick={() => setShowOneTimeInvestmentModal(true)}
        className="flex-grow rounded-l-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
      >
        New one-time
      </button>
      <button
        type="button"
        onClick={() => setShowRecurringInvestmentModal(true)}
        className="flex-grow border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
      >
        New recurring
      </button>
    </div>
  )
}

function NewOneTimeInvestmentForm({
  planId,
  onSuccess,
}: {
  planId: string
  onSuccess: () => void
}) {
  const newOneTimeInvestmentMutation = useNewOneTimeInvestment({
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
    newOneTimeInvestmentMutation.mutate({
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
            <option value="pension">Pension</option>
            <option value="dividends">Dividends</option>
            <option value="rent">Rent</option>
            <option value="other">Other</option>
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

function NewReccuringInvestmentForm({
  planId,
  onSuccess,
}: {
  planId: string
  onSuccess: () => void
}) {
  const newRecurringInvestmentMutation = useNewRecurringInvestment({
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
      cost: '',
      firstDate: new Date(),
      endDate: new Date(),
      frequency: '',
    },
  })
  const onSubmit = (data) => {
    const {
      title,
      description,
      category,
      cost,
      firstDate,
      endDate,
      frequency,
    } = data

    newRecurringInvestmentMutation.mutate({
      planId: planId,
      title: title,
      description: description,
      category: category,
      firstDate: new Date(firstDate),
      endDate: new Date(endDate),
      value: {
        amount: Number(cost),
        currency: 'USD',
      },
      frequency: frequency,
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
            <option value="pension">Pension</option>
            <option value="dividends">Dividends</option>
            <option value="rent">Rent</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label
            htmlFor="firstDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            First Date
          </label>
          <input
            type="date"
            {...register('firstDate', { required: 'When does it start?' })}
            id="firstDate"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>

        <div className="ml-2 flex-1">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            End Date
          </label>
          <input
            type="date"
            {...register('endDate', { required: 'When does it end?' })}
            id="endDate"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Frequency
          </label>
          <select
            id="frequency"
            {...register('frequency')}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Choose a freequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quaterly">Quaterly</option>
            <option value="yearly">Yearly</option>
          </select>
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
