import RetirementGoal from './RetirementGoal'

export default function Goal({
  id,
  refetch,
}: {
  id: string
  refetch: () => void
}) {
  return <RetirementGoal refetch={refetch} id={id} />
}
