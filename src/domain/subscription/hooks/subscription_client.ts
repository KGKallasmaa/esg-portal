import { WEBAPP_URL } from '../../../config/url'
import { makeRequest } from '../../../config/request'
import { NewSubscriptionSessionRequest } from './subscription_request'
import Subscription from '../../../models/subscription'

type PostSubscriptionSessionResponse = {
  url: string
}

async function getMySubscription(): Promise<Subscription.Subscription> {
  const path = `v1/subscriptions`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postSubscriptionSession(
  req: NewSubscriptionSessionRequest
): Promise<PostSubscriptionSessionResponse> {
  const path = `v1/subscriptions/session`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

export const SubscriptionClient = {
  getMySubscription,
  postSubscriptionSession,
}
