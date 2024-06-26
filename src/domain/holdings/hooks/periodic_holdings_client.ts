import { makeRequest } from '../../../config/request'
import Holdings from '../../../models/holdings'
import { WEBAPP_URL } from '../../../config/url'
import { LatestPeriodicHoldingsRequest } from './periodic_holdings_requests'
import Portfolio from '../../../models/portfolio'

async function postLatestPeriodicHoldings(
  req: LatestPeriodicHoldingsRequest
): Promise<Holdings.PeriodicHolding[]> {
  const path = `v1/periodic-holdings/latest`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

async function getPeriodicHoldingsDiff(
  id: string,
  period: Portfolio.Period
): Promise<Holdings.PeriodicHoldingDiff[]> {
  const path = `/v1/periodic-holdings/${id}/diff?start=${period.start.toISOString()}&end=${period.end.toISOString()}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true, null)
}

export const PeriodicHoldingsClient = {
  getPeriodicHoldingsDiff,
  postLatestPeriodicHoldings,
}
