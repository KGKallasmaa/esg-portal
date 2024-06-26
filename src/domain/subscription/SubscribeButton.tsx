import {
  useGetMySubscription,
  useSubscriptionSession,
} from './hooks/subscription_hooks'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
function SubscribeButton() {
  // TODO: check if the user is already subscribed. If they are, hide it
  const { data: mySubscription } = useGetMySubscription()
  const newSubscription = useSubscriptionSession()
  if (mySubscription) {
    return null
  }

  const subscribe = () => {
    newSubscription.mutate({
      plan: 'starter',
      period: 'monthly',
    })
  }

  return (
    <div>
      <button
        onClick={subscribe}
        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900"
      >
        <CalendarDaysIcon className="h-7 w-7 text-white" />
        <span className="text-white hover:text-black">Subscribe</span>
      </button>
    </div>
  )
}

export default SubscribeButton
