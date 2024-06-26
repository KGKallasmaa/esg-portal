import { useState } from 'react'
import Tabs from '../../../components/Tabs'
import { useGetAllRetirementPlans } from '../hooks/studio_hooks'
import RetirementDetailedPlanPage from './RetirementDetailedPlanPage'
import { RetirementPageHeader } from './RetirementPageHeader'

export default function RetirementPage() {
  const { data: allRetirementPlans, refetch } = useGetAllRetirementPlans()

  const [currentTab, setCurrentTab] = useState(
    allRetirementPlans && allRetirementPlans?.length > 0
      ? allRetirementPlans[0].id
      : ''
  )

  const tabs = allRetirementPlans
    ? allRetirementPlans.map((plan) => ({
        label: plan.name,
        value: plan.id,
        isCurrent: currentTab === plan.id,
      }))
    : []

  return (
    <div>
      <RetirementPageHeader onSuccess={() => refetch()} />
      <div className="mx-2 mb-2">
        <Tabs setCurrentTab={setCurrentTab} tabs={tabs} />
        {tabs?.map((tab) => {
          return (
            <div key={tab.value}>
              {tab.isCurrent && <RetirementDetailedPlanPage id={tab.value} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
