import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Portfolio from '../../../models/portfolio'
import { PortfolioValueRequest } from './portfolio_requests'

async function postPortfolioValue(
  req: PortfolioValueRequest
): Promise<Portfolio.PortfolioValue> {
  const path = `v1/portfolio/value`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}
export const PortfolioClient = {
  postPortfolioValue,
}
