import { makeRequest } from '../../../config/request'
import { WEBAPP_URL } from '../../../config/url'
import Assets from '../../../models/assets'
import {
  LatestPeriodicAssetsRequest,
  PeriodicAssetValuesRequest,
} from './assets_requests'

async function postLatestPeriodicAssets(
  req: LatestPeriodicAssetsRequest
): Promise<Assets.PeriodicAsset[]> {
  const path = `v1/periodic-assets/latest`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

async function postPeriodicAssetValues(
  req: PeriodicAssetValuesRequest
): Promise<Assets.PeriodicAsset[]> {
  const path = `v1/periodic-assets/${req.assetId}/values`
  const url = new URL(`${WEBAPP_URL}/${path}`)
  return await makeRequest(url, 'POST', true, req)
}

export const PeriodicAssetsClient = {
  postLatestPeriodicAssets,
  postPeriodicAssetValues,
}
