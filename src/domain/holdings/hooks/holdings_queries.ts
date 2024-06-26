import Portfolio from '../../../models/portfolio'
import Asset from '../../../models/assets'

export const PeriodicHoldingsQueries = {
  LatestPeriodicHoldings: (period: Portfolio.Period, type: Asset.AssetType) => [
    'latestPeriodicHoldings',
    period,
    type,
  ],
  PeriodicHoldingsDiff: (id: string, period: Portfolio.Period) => [
    'allPeriodicHoldings',
    id,
    period,
  ],
  HoldingById: (holdingId: string) => ['holdingById', holdingId],
}
