import { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import Tabs from '../../components/Tabs'
import Goal from './Goal'
import { useGetMyGoals, useNewGoal } from './hooks/goals_hooks'

export default function GoalsOverview() {
  const { data: myGoals, refetch, isLoading } = useGetMyGoals()
  const [currentGoal, setCurrentGoal] = useState('')
  useEffect(() => {
    if (myGoals && myGoals.length > 0) {
      setCurrentGoal(myGoals[0].id)
    }
  }, [myGoals])

  const goalTabs = myGoals
    ? myGoals?.map((goal) => {
        return {
          label: goal.name,
          value: goal.id,
          isCurrent: currentGoal === goal.id,
        }
      })
    : []

  return (
    <div className="ml-2">
      <GoalsHeader refetch={refetch} />
      <div className="mt-2">
        <Tabs setCurrentTab={setCurrentGoal} tabs={goalTabs} />
      </div>
      {currentGoal.length > 0 && <Goal refetch={refetch} id={currentGoal} />}
    </div>
  )
}

function GoalsHeader({ refetch }) {
  const newGoal = useNewGoal({
    onSucces: {
      refetch,
    },
  })
  const handleNewGoal = () => {
    newGoal.mutate('RETIREMENT')
  }

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="mt-2 text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          Goals
        </h2>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="sm:ml-3">
          <button
            onClick={handleNewGoal}
            type="button"
            className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            New goal
          </button>
        </span>
      </div>
    </div>
  )
}
