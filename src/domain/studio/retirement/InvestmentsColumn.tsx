import { useGetRetirementPlanById } from '../hooks/studio_hooks'
import NewInvestmentsButtonGroup from './NewInvestmentsButtonGroup'
import { OneTimeInvestmentsCard } from './OneTimeCard'
import { RecurringInvestmetsCard } from './RecurringCard'

export default function InvestmentsColumn({ id }: { id: string }) {
  const { data: myRetirementPlan, refetch } = useGetRetirementPlanById(id)

  return (
    <div>
      <h2>Investments</h2>

      <ul role="list" className="divide-y divide-gray-800">
        {myRetirementPlan?.incomes?.recurringIncomes?.map((income) => (
          <RecurringInvestmetsCard
            key={'recurring-investments-card-' + income.id}
            title={income.title}
            description={income.description}
            category={income.category}
          />
        ))}

        {myRetirementPlan?.incomes?.oneTimeIncomes?.map((income) => (
          <OneTimeInvestmentsCard
            key={'one-time-investments-' + income.id}
            onDelete={() => refetch}
            planId={id}
            id={income.id}
            title={income.title}
            description={income.description}
            category={income.category}
            amount={income.value}
            date={income.date}
          />
        ))}
      </ul>
      <NewInvestmentsButtonGroup onSuccess={() => refetch} planId={id} />
    </div>
  )
}
