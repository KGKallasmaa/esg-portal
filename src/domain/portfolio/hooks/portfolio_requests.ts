import Portfolio from '../../../models/portfolio'
import Assets from '../../../models/assets'

export type PortfolioValueRequest = {
  period: Portfolio.Period
  holdingTypes: Assets.AssetType[]
}
