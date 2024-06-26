import { makeRequest } from '../../../config/request'
import Holdings from '../../../models/holdings'
import { WEBAPP_URL } from '../../../config/url'
import Assets from '../../../models/assets'

async function getHoldingById(id: string): Promise<Holdings.Holding> {
  const path = `v1/holdings/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getHoldingsByIds(ids: string[]): Promise<Holdings.Holding[]> {
  const path = `v1/holdings/ids?ids=${ids}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function getAllHoldings(
  types: Assets.AssetType[]
): Promise<Holdings.Holding[]> {
  const path = `v1/holdings/types?types=${types.join(',')}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'GET', true)
}

async function deleteHoldingById(id: string): Promise<null> {
  const path = `v1/holdings/${id}`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'DELETE', true)
}

export const HoldingsClient = {
  getAllHoldings,
  getHoldingById,
  getHoldingsByIds,
  deleteHoldingById,
}
