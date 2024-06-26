import { useEffect, useState } from 'react'
import {
  useGetRetirementPlanById,
  useUpdateRetirementDetails,
} from '../hooks/studio_hooks'

export function RetirementStartAndEnd({ id }: { id: string }) {
  const { data: myRetirementPlan } = useGetRetirementPlanById(id)
  const [startDate, setStartDate] = useState<Date | undefined>(
    myRetirementPlan?.retirementStartDate || undefined
  )
  const [endDate, setEndDate] = useState<Date | undefined>(
    myRetirementPlan?.retirementEndDate
  )

  const updateRetirementDetails = useUpdateRetirementDetails(id)

  useEffect(() => {
    if (myRetirementPlan?.retirementStartDate) {
      setStartDate(myRetirementPlan.retirementStartDate)
    }
    if (myRetirementPlan?.retirementEndDate) {
      setStartDate(myRetirementPlan.retirementEndDate)
    }
  }, [
    myRetirementPlan?.retirementStartDate,
    myRetirementPlan?.retirementEndDate,
  ])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Start
          </label>
          <input
            type="date"
            onChange={(e) =>
              updateRetirementDetails.mutate({
                startDate: new Date(e.target.value),
              })
            }
            id="startDate"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>

        <div className="ml-2 flex-1">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            End
          </label>
          <input
            type="date"
            onChange={(e) =>
              updateRetirementDetails.mutate({
                endDate: new Date(e.target.value),
              })
            }
            id="endDate"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
          />
        </div>
      </div>
    </div>
  )
}
