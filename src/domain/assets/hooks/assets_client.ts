import { makeRequest } from '../../../config/request'

import { WEBAPP_URL } from '../../../config/url'
import Assets from '../../../models/assets'
import { NewSecurityRequest } from './assets_requests'

async function getAssetById(id: string): Promise<Assets.Asset> {
  const path = `v1/assets/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getAssetsByIds(ids: string[]): Promise<Assets.Asset[]> {
  const path = `v1/assets?ids=${ids}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getLatestSecurityPrice(
  isin: string
): Promise<Assets.PeriodicAsset> {
  const path = `v1/assets/security/latest-price?isin=${isin}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getSecurityPriceAtDate(
  isin: string,
  date: Date
): Promise<Assets.PeriodicAsset> {
  const path = `v1/assets/security/price-at-date?isin=${isin}&date=${date.toISOString()}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function postNewSecurity(req: NewSecurityRequest): Promise<Assets.Asset> {
  const path = `v1/assets/security`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

export const AssetsClient = {
  getAssetById,
  getAssetsByIds,
  getLatestSecurityPrice,
  getSecurityPriceAtDate,
  postNewSecurity,
}
