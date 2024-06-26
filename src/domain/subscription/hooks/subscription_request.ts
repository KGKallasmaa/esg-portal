import Subscription from '../../../models/subscription'

export type NewSubscriptionSessionRequest = {
  plan: Subscription.SubscriptionPlan
  period: Subscription.BillingPeriod
}
