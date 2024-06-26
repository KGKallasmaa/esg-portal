import { WEBAPP_URL } from '../../../config/url'
import { makeRequest } from '../../../config/request'
import OpenBanking from '../../../models/open_banking'

async function getGenerateLinkToken(): Promise<string> {
  const path = `v1/integrations/open-banking/generate-link-token`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postExchangePublicToken(token: string): Promise<null> {
  const req = {
    token: token,
  }
  const path = `v1/integrations/open-banking/exchange-public-token`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

async function getOpenBankingStatus(): Promise<OpenBanking.StatusInfo> {
  const path = `v1/integrations/open-banking/access-status`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

export const OpenBankingClient = {
  getOpenBankingStatus,
  getGenerateLinkToken,
  postExchangePublicToken,
}
