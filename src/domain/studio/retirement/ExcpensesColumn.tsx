import { useGetRetirementPlanById } from '../hooks/studio_hooks'
import NewExcpensesButtonGroup from './NewExcpensesButtonGroup'
import { OneTimeExcpenseCard } from './OneTimeCard'
import { RecurringExcpenseCard } from './RecurringCard'

export default function ExcpensesColumn({ id }: { id: string }) {
  const { data: myRetirementPlan, refetch } = useGetRetirementPlanById(id)
  // TODO: show current excpenses + have a button to add new excpenses
  return (
    <div>
      <h2>Excpnese</h2>

      <ul role="list" className="divide-y divide-gray-800">
        {myRetirementPlan?.expenses?.recurringExpenses?.map((excpense) => (
          <RecurringExcpenseCard
            key={'recurring-excpense-' + excpense.id}
            title={excpense.title}
            description={excpense.description}
            category={excpense.category}
          />
        ))}

        {myRetirementPlan?.expenses?.oneTimeExpenses?.map((excpense) => (
          <OneTimeExcpenseCard
            key={'one-time-excpense-' + excpense.id}
            onDelete={() => refetch}
            planId={id}
            id={excpense.id}
            title={excpense.title}
            description={excpense.description}
            category={excpense.category}
            amount={excpense.value}
            date={excpense.date}
          />
        ))}
      </ul>
      <NewExcpensesButtonGroup onSuccess={() => refetch} planId={id} />
    </div>
  )
}
