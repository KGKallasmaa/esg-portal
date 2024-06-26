import { useGetRetirementPlanById } from '../hooks/studio_hooks'
import NewIncomesButtonGroup from './NewIncomesButtonGroup'
import { OneTimeIncomeCard } from './OneTimeCard'
import { RecurringIncomeCard } from './RecurringCard'

export default function IncomeColumn({ id }: { id: string }) {
  const { data: myRetirementPlan, refetch } = useGetRetirementPlanById(id)

  return (
    <div>
      <h2>Income</h2>

      <ul role="list" className="divide-y divide-gray-800">
        {myRetirementPlan?.incomes?.recurringIncomes?.map((income) => (
          <RecurringIncomeCard
            key={'recurring-income-' + income.id}
            id={income.id}
            title={income.title}
            description={income.description}
            category={income.category}
          />
        ))}

        {myRetirementPlan?.incomes?.oneTimeIncomes?.map((income) => (
          <OneTimeIncomeCard
            key={'one-time-incom-' + income.id}
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
      <NewIncomesButtonGroup onSuccess={() => refetch} planId={id} />
    </div>
  )
}
