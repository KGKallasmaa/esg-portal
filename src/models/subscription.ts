namespace Subscription {
  export type SubscriptionPlan = 'free' | 'starter'
  export type BillingPeriod = 'monthly' | 'yearly'
  export type SubscriptionStatus =
    | 'incomplete'
    | 'incomplete_expired'
    | 'trialing'
    | 'active'
    | 'past_due'
    | 'canceled'
    | 'unpaid'

  export type Subscription = {
    id: string
    plan: SubscriptionPlan
    customerId: string
    status: SubscriptionStatus
    createdAt: Date
    canceledAt: Date
  }
}
export default Subscription
