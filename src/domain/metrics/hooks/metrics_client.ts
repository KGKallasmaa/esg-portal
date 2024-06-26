import { WEBAPP_URL } from '../../../config/url'
import { makeRequest } from '../../../config/request'
import Metrics from '../../../models/metrics'
import { DashboardMetricsRequest } from './metrics_requests'

async function postDashboardMetrics(
  req: DashboardMetricsRequest
): Promise<Metrics.DashboardMetrics> {
  const path = `v1/metrics/dashboard`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

export const MetricsClient = {
  postDashboardMetrics,
}
