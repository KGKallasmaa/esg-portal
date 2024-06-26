import Assets from '../../../models/assets'
import Portfolio from '../../../models/portfolio'
import { PeriodicAssetValuesRequest } from './assets_requests'

export const AssetQueries = {
  LatestPeriodicAssets: (period: Portfolio.Period, type: Assets.AssetType) => [
    'latestPeriodicAssets',
    period,
    type,
  ],
  AssetById: (assetId: string) => ['assetById', assetId],
  AssetByIds: (assetIds: string[]) => ['assetByIds', assetIds],
  LatestSecurityPrice: (isin: string) => ['latestSecurityPrice', isin],
  SecurityPriceAtDate: (isin: string, date: Date) => [
    'securityPriceAtDate',
    isin,
    date,
  ],
  PeriodicAssetValues: (req: PeriodicAssetValuesRequest) => [
    'periodicAssetValues',
    req,
  ],
}
