import { PlusSmallIcon } from '@heroicons/react/24/outline'
import { useNewDefaultRetirementPlan } from '../hooks/studio_hooks'

export function RetirementPageHeader({ onSuccess }: { onSuccess: () => void }) {
  const newRetirmenetPlanMutation = useNewDefaultRetirementPlan({
    onSuccess: () => onSuccess(),
  })

  return (
    <header className="pb-4 pt-6 sm:pb-6">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-end gap-6 px-4 sm:flex-nowrap sm:px-2 lg:px-2">
        <button
          onClick={() => newRetirmenetPlanMutation.mutate()}
          className="ml-auto flex items-center gap-x-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
          New Retirement Plan
        </button>
      </div>
    </header>
  )
}
