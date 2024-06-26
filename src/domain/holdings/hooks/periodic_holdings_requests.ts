import Portfolio from '../../../models/portfolio'
import Money from '../../../models/money'
import Assets from '../../../models/assets'

export type LatestPeriodicHoldingsRequest = {
  period: Portfolio.Period
  type: Assets.AssetType
}
