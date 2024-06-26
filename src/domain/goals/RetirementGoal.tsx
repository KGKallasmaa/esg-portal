import { useForm } from 'react-hook-form'
import { formatMoney, futureValue } from '../money/money'
import 'chart.js/auto'
import { Bar, Line } from 'react-chartjs-2'
import {
  useGetGoalById,
  useGetGoalPlan,
  useUpdateGoal,
} from './hooks/goals_hooks'
import { useEffect } from 'react'
import Goals from '../../models/goals'

export default function RetirementGoal({
  id,
  refetch,
}: {
  id: string
  refetch: () => void
}) {
  let { data: myGoal } = useGetGoalById(id)
  const { data: myRetirementPlan } = useGetGoalPlan(id)
  const updateGoalMutation = useUpdateGoal({
    onSuccess: () => {
      refetch
    },
  })
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      retirementStart: myGoal?.metadata?.retirementStart,
      retirementEnd: myGoal?.metadata?.retirementEnd,
      currentSavings: myGoal?.metadata?.currentSavings,
      currentSavingsCurrency: 'GBP',

      monthlyIncomePresentValue: myGoal?.metadata?.monthlyIncomeAtRetirement,
      montlyIncomeCurrency: 'GBP',
      inflationPercent: myGoal?.metadata?.annualInflationPercent || 30,
      returnOnInvestmentPercent: myGoal?.metadata?.annualReturnPercent || 30,
    },
  })

  const onSubmit = (d) => {
    const { retiremenStart } = d
    if (myGoal) {
      myGoal.metadata['retiremenStart'] = retiremenStart
      // @ts-ignore
      updateGoalMutation.mutate(myGoal)

      console.log(d)
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <form
            className="bg-gray-900 p-4 text-white"
            onSubmit={handleSubmit(onSubmit)}
          >
            <RetirmenetGoalInput register={register} />
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 font-bold text-white hover:bg-primary-darker"
            >
              Update
            </button>
          </form>
        </div>
        <div>(one-off expenses) (date, title, notes, amount)</div>
      </div>

      <RetirmenetGoalOuptut plan={myRetirementPlan} />
    </>
  )
}
function RetirmenetGoalInput({ register }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
  }

  return (
    <>
      <h3 className="mb-4 text-lg font-semibold leading-7">Preferences</h3>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="retiremenStart"
            className="mb-2 block text-sm font-medium"
          >
            Retirement start
          </label>
          <input
            id="retiremenStart"
            name="retiremenStart"
            type="date"
            {...register('retiremenStart', {
              required: 'Please enter your first name.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>

        <div className="w-full px-3 md:w-1/2">
          <label
            htmlFor="retiremenEnd"
            className="mb-2 block text-sm font-medium"
          >
            Retirement end
          </label>
          <input
            id="retiremenEnd"
            name="retiremenEnd"
            type="date"
            {...register('retiremenEnd', {
              required: 'Please enter your first name.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>
      </div>

      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="returnOnInvestmentPercent"
            className="mb-2 block text-sm font-medium"
          >
            Return on investment (%)
          </label>
          <input
            id="returnOnInvestmentPercent"
            name="returnOnInvestmentPercent"
            type="number"
            {...register('returnOnInvestmentPercent', {
              required: 'Please enter your first name.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            htmlFor="inflationPercent"
            className="mb-2 block text-sm font-medium"
          >
            Inflation (%)
          </label>
          <input
            id="inflationPercent"
            name="inflationPercent"
            type="number"
            {...register('inflationPercent', {
              required: 'Please enter your first name.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>
      </div>

      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label
            htmlFor="currentSavings"
            className="mb-2 block text-sm font-medium"
          >
            Current savings (in 2024 amount)
          </label>
          <input
            id="currentSavings"
            name="currentSavings"
            type="number"
            {...register('currentSavings', {
              required: 'Please enter your first name.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            htmlFor="montlyIncomeCurrency"
            className="mb-2 block text-sm font-medium"
          >
            Currency
          </label>
          <select
            id="currentSavingsCurrency"
            name="currentSavingsCurrency"
            {...register('currentSavingsCurrency', {
              required: 'Please select a currency',
            })}
            className="block w-full rounded-md border-gray-500 bg-gray-800 py-2 pl-3 pr-10 text-base text-white focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option value={'USD'}>USD</option>
            <option value={'EUR'}>EUR</option>
            <option value={'GBP'}>GBP</option>
            <option value={'CHF'}>CHF</option>
            {/* Add other currency options here */}
          </select>
        </div>
      </div>

      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <label htmlFor="returnO" className="mb-2 block text-sm font-medium">
            Montly retirement income (in 2024 amount)
          </label>
          <input
            id="monthlyIncomePresentValue"
            name="monthlyIncomePresentValue"
            type="number"
            {...register('monthlyIncomePresentValue', {
              required: 'Please enter your first name.',
            })}
            className="block w-full rounded-none border-0 border-b border-gray-600 bg-gray-800 p-2 text-white focus:border-white focus:ring-0"
          />
        </div>
        <div className="w-full px-3 md:w-1/2">
          <label
            htmlFor="montlyIncomeCurrency"
            className="mb-2 block text-sm font-medium"
          >
            Currency
          </label>
          <select
            id="montlyIncomeCurrency"
            name="currency"
            {...register('montlyIncomeCurrency', {
              required: 'Please select a currency',
            })}
            className="block w-full rounded-md border-gray-500 bg-gray-800 py-2 pl-3 pr-10 text-base text-white focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
          >
            <option value={'USD'}>USD</option>
            <option value={'EUR'}>EUR</option>
            <option value={'GBP'}>GBP</option>
            <option value={'CHF'}>CHF</option>
            {/* Add other currency options here */}
          </select>
        </div>
      </div>
    </>
  )
}

function RetirmenetGoalOuptut({ plan }: { plan: Goals.GoalPlan | undefined }) {
  if (!plan) {
    return null
  }
  let portfolioValues = []
  for (let index = 0; index < plan?.portfolioValues.length; index++) {
    const element = plan?.portfolioValues[index]
    // @ts-ignore
    portfolioValues.push(element.value.amount)
  }
  if (portfolioValues.length == 0) {
    return null
  }
  const data = {
    labels: formattedLabels(plan?.labels),
    datasets: [
      {
        label: 'Portfolio Value',
        data: portfolioValues,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  }

  console.log(data.datasets)

  const options = {
    scales: {
      y: {
        label: 'GBP',
        beginAtZero: false,
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
    },
  }

  const monlySavings = {
    amount: portfolioValues[1] - portfolioValues[0],
    currency: plan?.portfolioValues[0].value.currency,
  }

  return (
    <>
      <Line data={data} options={options} />

      <>
        <div className="min-w-0 flex-1">
          <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Monthly savings {formatMoney(monlySavings)}
          </h2>
        </div>
      </>
    </>
  )
}

function formattedLabels(allTimes: Date[] | undefined) {
  if (!allTimes) {
    return []
  }
  const locale = navigator.language || 'en-US'
  const formatter = new Intl.DateTimeFormat(locale)
  return allTimes.map((p) => {
    return formatter.format(new Date(p)).toString()
  })
}
