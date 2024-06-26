import Money from '../../models/money'
import usePortfolioStore from '../../state_management/stores/portfolio.store'
import { useGetAssetsByIds } from '../assets/hooks/assets_hooks'
import PortfolioDoughnutChart from '../portfolio/PortfolioDoughnutChart'
import { useGetPortfolioValue } from '../portfolio/hooks/portfolio_hooks'
import { calculateAppropriateDates } from '../portfolio/time_horizon'
import { useGetHoldingsByIds } from './hooks/holdings_hooks'

const SecuritesDoughnutChart = () => {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('SECURITIES')
  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)

  const period = {
    start,
    end,
    timeHorizon: holdingTimeHorizon,
  }
  const holdingTypes = ['SECURITIES']

  const { data: portfolio } = useGetPortfolioValue(
    period,
    // @ts-ignore
    holdingTypes
  )
  if (portfolio?.periodic) {
    const latestSecurity = portfolio?.periodic[portfolio.periodic?.length - 1]
    if (latestSecurity) {
      const securityValues = latestSecurity.details.securityValues
      if (securityValues) {
        return <SecurityChart securityHoldingIdValueMap={securityValues} />
      }
    }
  }
  return null
}

function SecurityChart({
  securityHoldingIdValueMap,
}: {
  securityHoldingIdValueMap: Record<string, Money.MoneyValue>
}) {
  const holdingIds = Object.keys(securityHoldingIdValueMap)
  const { data: holdings } = useGetHoldingsByIds(holdingIds)
  const ids = holdings ? holdings.map((h) => h.assetId) : []
  const { data: securityAssets } = useGetAssetsByIds(ids)

  const portfolioData = []
  if (securityAssets) {
    const assetIdHoldingMap = new Map()
    // @ts-ignore
    for (let i = 0; i < holdings.length; i++) {
      // @ts-ignore
      assetIdHoldingMap.set(holdings[i].assetId, holdings[i].id)
    }

    for (let i = 0; i < securityAssets?.length; i++) {
      const asset = securityAssets[i]
      const holdingId = assetIdHoldingMap.get(asset.id)

      if (holdingId) {
        const holdingValue = securityHoldingIdValueMap[holdingId]
        // @ts-ignore
        portfolioData.push({
          name: asset.metadata['symbol'] + ' (' + asset.metadata['name'] + ')',
          value: holdingValue,
        })
      }
    }
    if (portfolioData.length > 0) {
      return (
        <PortfolioDoughnutChart label="Securites chart" items={portfolioData} />
      )
    }
  }
  return null
}

export default SecuritesDoughnutChart
