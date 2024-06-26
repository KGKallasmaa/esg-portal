import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid'
import RetirementCalculator from './RetirementCalculator'

function DefaultPlanView() {
  return (
    <div className="py-10 md:px-6">
      <div className="max-w-3xl text-base leading-7">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Your retirement plan
        </h1>
        <p className="mt-6 text-xl leading-8">
          Retirement is a time to enjoy the rewards of your life&apos;s hard
          work. This plan will help you get there.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            Here are are the assumptions we used to create your retirement plan:
          </p>
          <Assumptions />

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary">
            Yearly savings
          </h2>
          <p className="mt-6">
            Every year, before retirement, you&apos;ll save a certain amount of
            money. Here&apos;s how that will look.
            <RetirementCalculator
              retirementAge={65}
              isEditingAllowed={false}
              visibleCharts={['yearlySavings']}
            />
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary">
            Retirement withdrawal
          </h2>
          <p className="mt-6">
            In your retirement, you&apos;ll withdraw a certain amount of money
            every year. Here&apos;s how that will look.
            <RetirementCalculator
              retirementAge={65}
              isEditingAllowed={false}
              visibleCharts={['yearlyWithdrawal']}
            />
          </p>
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary">
            Portfolio value
          </h2>
          <p className="mt-6">
            Withdrawals are possible only if you have enough money in your
            portfolio. Here&apos;s how your portfolio value will look.
            <RetirementCalculator
              retirementAge={65}
              isEditingAllowed={false}
              visibleCharts={['portfolioValue']}
            />
          </p>
        </div>
      </div>
    </div>
  )
}

function Assumptions() {
  const assumptions = [
    {
      title: 'Retirement age',
      description: 'You want to retire in 30 years (at age 70).',
    },
    {
      title: 'Monthly spending',
      description: 'You want to spend $2500 per month in retirement.',
    },
    {
      title: 'Inflation',
      description: 'We assume an average annual inflation rate of 2%.',
    },
    {
      title: 'Return Rate',
      description: 'We assume an average annual return rate of 5%.',
    },
    {
      title: 'Time in retirement',
      description: "We assume you'll spend 30 years in retirement.",
    },
  ]
  return (
    <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
      {assumptions.map((assumption) => (
        <li key={assumption.title} className="flex gap-x-3">
          <CheckCircleIcon
            className="mt-1 h-5 w-5 flex-none text-primary"
            aria-hidden="true"
          />
          <span>
            <strong className="font-semibold text-primary-darker">
              {assumption.title}
            </strong>{' '}
            <div className={'text-gray-400'}>{assumption.description}</div>
          </span>
        </li>
      ))}
    </ul>
  )
}

export default DefaultPlanView
