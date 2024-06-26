import LoadingGraph from '../../components/charts/LoadingGraph'
import usePortfolioStore from '../../state_management/stores/portfolio.store'
import { useGetAssetById } from '../assets/hooks/assets_hooks'
import { usePostPeriodicAssetsValues } from '../assets/hooks/periodic_assets_hooks'
import PeriodSwitch from '../holdings/PeriodSwitch'
import Metric from '../metrics/Metric'
import { useGetMySettings } from '../settings/hooks/settings_hooks'
import AllHoldingTypeLineChart from './AllHoldingTypesChart'
import PeriodicAssetValueLineChart from './PeriodicAssetValueChart'
import SingleHoldingTypeLineChart from './SingleHoldingTypeChart'
import { useGetPortfolioValue } from './hooks/portfolio_hooks'
import { calculateAppropriateDates } from './time_horizon'

export function HoldingsWorthGraph() {
  const { portfolioTimeHorizon } = usePortfolioStore()

  const { start, end } = calculateAppropriateDates(portfolioTimeHorizon)
  const period = {
    start,
    end,
    timeHorizon: portfolioTimeHorizon,
  }
  const {
    data: portfolio,
    isLoading: isLoadingPortfolio,
    isError: isPortfolioErr,
  } = useGetPortfolioValue(period, ['SECURITIES', 'ACCOUNTS'])
  const {
    data: mySettings,
    isLoading: isLoadingSettings,
    isError: isSettingsErr,
  } = useGetMySettings()
  const lastotalValue = portfolio?.total?.totals?.totalValue
  const totalChange = portfolio?.total?.changes?.total.change

  if (isLoadingPortfolio || isLoadingSettings) {
    return <LoadingGraph />
  }
  if (isPortfolioErr || isSettingsErr) {
    return null
  }

  return (
    <div className="pb-3">
      <Metric
        index={0}
        stat={{
          name: 'Net worth',
          highlight: true,
          value: lastotalValue,
          change: totalChange?.percent,
          changeType: changeType(totalChange?.percent || 0, false),
        }}
      />

      <div className="mx-2 mt-2">
        {portfolio && (
          <div className="h-1/5">
            <AllHoldingTypeLineChart
              currency={mySettings.general.currency}
              portfolio={portfolio}
            />
          </div>
        )}
      </div>
      <div className="ml-3 mt-10">
        <PeriodSwitch domain={'ALL'} />
      </div>
    </div>
  )
}

export function SecuritiesWorthGraph() {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('SECURITIES')

  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)
  const period = {
    start,
    end,
    timeHorizon: holdingTimeHorizon,
  }
  const {
    data: portfolio,
    isLoading: isLoadingPortfolio,
    isError: isPortfolioErr,
  } = useGetPortfolioValue(period, ['SECURITIES'])
  const {
    data: mySettings,
    isLoading: isLoadingSettings,
    isError: isSettingsErr,
  } = useGetMySettings()
  const lastSecurityValue = portfolio?.total?.totals?.securities
  const securityChange = portfolio?.total?.changes?.securities.change

  if (isLoadingPortfolio || isLoadingSettings) {
    return <LoadingGraph />
  }
  if (isPortfolioErr || isSettingsErr) {
    return null
  }

  return (
    <div className="pb-3">
      <Metric
        index={0}
        stat={{
          name: 'Security portfolio worth',
          highlight: true,
          value: lastSecurityValue,
          change: securityChange?.percent,
          changeType: changeType(securityChange?.percent || 0, false),
        }}
      />

      <div className="mx-2 mt-2">
        {portfolio && (
          <div className="h-1/5">
            <SingleHoldingTypeLineChart
              holdingType={'SECURITIES'}
              currency={mySettings.general.currency}
              portfolio={portfolio}
            />
          </div>
        )}
      </div>
      <div className="ml-3 mt-10">
        <PeriodSwitch domain={'SECURITIES'} />
      </div>
    </div>
  )
}

export function AccountsWorthGraph() {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('ACCOUNTS')

  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)
  const period = {
    start,
    end,
    timeHorizon: holdingTimeHorizon,
  }
  const {
    data: portfolio,
    isLoading: isLoadingPortfolio,
    isError: isPortfolioErr,
  } = useGetPortfolioValue(period, ['ACCOUNTS'])
  const {
    data: mySettings,
    isLoading: isLoadingSettings,
    isError: isSettingsErr,
  } = useGetMySettings()
  const lastAccountValue = portfolio?.total?.totals?.accounts
  const accountChange = portfolio?.total?.changes?.accounts.change

  if (isLoadingPortfolio || isLoadingSettings) {
    return <LoadingGraph />
  }
  if (isPortfolioErr || isSettingsErr) {
    return null
  }

  return (
    <div className="pb-3">
      <Metric
        index={0}
        stat={{
          name: 'Accounts portfolio worth',
          highlight: true,
          value: lastAccountValue,
          change: accountChange?.percent,
          changeType: changeType(accountChange?.percent || 0, false),
        }}
      />

      <div className="mx-2 mt-2">
        {portfolio && (
          <SingleHoldingTypeLineChart
            holdingType={'ACCOUNTS'}
            currency={mySettings.general.currency}
            portfolio={portfolio}
          />
        )}
      </div>
      <div className="ml-3 mt-10">
        <PeriodSwitch domain={'ACCOUNTS'} />
      </div>
    </div>
  )
}

export function SingleAccountWorthGraph({ assetId }: { assetId: string }) {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('ACCOUNTS')

  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)
  const period = {
    start,
    end,
    timeHorizon: holdingTimeHorizon,
  }
  const {
    data: periodicAssets,
    isLoading: isLoadingPortfolio,
    isError: isPortfolioErr,
  } = usePostPeriodicAssetsValues({
    assetId: assetId,
    period: period,
  })
  const {
    data: mySettings,
    isLoading: isLoadingSettings,
    isError: isSettingsErr,
  } = useGetMySettings()

  const currency = mySettings ? mySettings.general.currency : 'USD'

  const { data: myAccount } = useGetAssetById(assetId)

  const firstAccountValue = periodicAssets
    ? periodicAssets[0]?.value
    : { amount: 0, currency: currency }
  const lastAccountValue = periodicAssets
    ? periodicAssets[periodicAssets.length - 1]?.value
    : { amount: 0, currency: currency }
  const accountChange = periodicAssets
    ? {
        percent:
          (lastAccountValue.amount - firstAccountValue.amount) /
          Math.abs(firstAccountValue.amount),
        amount: lastAccountValue.amount - firstAccountValue.amount,
      }
    : { percent: 0, amount: 0 }

  if (isLoadingPortfolio || isLoadingSettings) {
    return <LoadingGraph />
  }
  if (isPortfolioErr || isSettingsErr) {
    return null
  }
  console.log(myAccount?.metadata)

  return (
    <div className="pb-3">
      <Metric
        index={0}
        stat={{
          name:
            // @ts-ignore
            myAccount && myAccount.metadata.label
              ? // @ts-ignore
                myAccount.metadata.label + ' worth'
              : 'Account worth',
          highlight: true,
          value: lastAccountValue,
          change: accountChange?.percent,
          changeType: changeType(accountChange?.percent || 0, false),
        }}
      />

      <div className="mx-2 mt-2">
        {periodicAssets && (
          <PeriodicAssetValueLineChart
            currency={currency}
            values={periodicAssets}
          />
        )}
      </div>
      <div className="ml-3 mt-10">
        <PeriodSwitch domain={'ACCOUNTS'} />
      </div>
    </div>
  )
}

function changeType(percent: number, reverse: boolean) {
  if (percent == 0) {
    return 'neutral'
  }
  if (percent > 0) {
    if (reverse) {
      return 'negative'
    }
    return 'positive'
  }
  if (reverse) {
    return 'positive'
  }
  return 'negative'
}
