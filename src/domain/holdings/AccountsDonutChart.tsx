import Money from '../../models/money'
import usePortfolioStore from '../../state_management/stores/portfolio.store'
import { useGetAssetsByIds } from '../assets/hooks/assets_hooks'
import PortfolioDoughnutChart from '../portfolio/PortfolioDoughnutChart'
import { useGetPortfolioValue } from '../portfolio/hooks/portfolio_hooks'
import { calculateAppropriateDates } from '../portfolio/time_horizon'
import { useGetHoldingsByIds } from './hooks/holdings_hooks'

const AccountsDoughnutChart = () => {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('ACCOUNTS')
  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)

  const period = {
    start,
    end,
    timeHorizon: holdingTimeHorizon,
  }
  const holdingTypes = ['ACCOUNTS']

  const { data: portfolio } = useGetPortfolioValue(
    period,
    // @ts-ignore
    holdingTypes
  )
  if (portfolio?.periodic) {
    const accountValues =
      portfolio?.periodic[portfolio.periodic?.length - 1].details.accountValues
    if (accountValues) {
      return <AccountChart accountHoldingIdValueMap={accountValues} />
    }
  }
  return null
}

function AccountChart({
  accountHoldingIdValueMap,
}: {
  accountHoldingIdValueMap: Record<string, Money.MoneyValue>
}) {
  const holdingIds = Object.keys(accountHoldingIdValueMap)
  const { data: holdings } = useGetHoldingsByIds(holdingIds)
  const ids = holdings ? holdings.map((h) => h.assetId) : []
  const { data: accountAssets } = useGetAssetsByIds(ids)

  const portfolioData = []
  if (accountAssets) {
    const assetIdHoldingMap = new Map()
    // @ts-ignore
    for (let i = 0; i < holdings.length; i++) {
      // @ts-ignore
      assetIdHoldingMap.set(holdings[i].assetId, holdings[i].id)
    }

    for (let i = 0; i < accountAssets?.length; i++) {
      const asset = accountAssets[i]
      const holdingId = assetIdHoldingMap.get(asset.id)

      if (holdingId) {
        const holdingValue = accountHoldingIdValueMap[holdingId]
        console.log(asset.metadata)
        // @ts-ignore
        portfolioData.push({
          name: asset.metadata['label'],
          value: holdingValue,
        })
      }
    }
  }
  if (portfolioData.length > 0) {
    return (
      <PortfolioDoughnutChart label="Accounts chart" items={portfolioData} />
    )
  }
  return null
}

export default AccountsDoughnutChart
