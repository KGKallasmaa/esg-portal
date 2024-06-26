import Money from './money'
import Assets from './assets'

namespace Holdings {
  export type Holding = {
    id: string
    accountId: string
    assetId: string
    type: Assets.AssetType
    value: Money.MoneyValue
  }

  export type PeriodicHolding = {
    id: string
    holdingId: string
    type: Assets.AssetType
    start: Date
    end: Date
    quantity: number
    costBasisPerUnit: Money.MoneyValue
    marketValuePerUnit: Money.MoneyValue
  }
  export type PeriodicHoldingDiff = {
    resultPeriodicHoldingId: string
    transactionDate: Date
    quantity: number
    side: 'BUY' | 'SELL'
    cost: Money.MoneyValue
  }
}
export default Holdings
