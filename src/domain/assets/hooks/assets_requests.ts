import Portfolio from '../../../models/portfolio'
import Assets from '../../../models/assets'
import Money from '../../../models/money'

export type LatestPeriodicAssetsRequest = {
  period: Portfolio.Period
  type: Assets.AssetType
}
export type PeriodicAssetValuesRequest = {
  assetId: string
  period: Portfolio.Period
}

export type NewSecurityRequest = {
  quantity: number
  isin: string
  purchaseDate: Date
  costPerUnit: Money.MoneyValue
}
