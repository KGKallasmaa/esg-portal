import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import Portfolio from '../../models/portfolio'
import { useGetPortfolioValue } from './hooks/portfolio_hooks'
import { formatMoney } from '../money/money'
import Assets from '../../models/assets'
import { maxTicksByHorizon } from './display'

const HoldingsTracker = ({
  holdingTypes,
  period,
  label,
}: {
  holdingTypes: Assets.AssetType[]
  period: Portfolio.Period
  label?: string
}) => {
  const { data: portfolio } = useGetPortfolioValue(period, holdingTypes)
  if (!portfolio) {
    return <div>Loading...</div>
  }
  let data = holdingTableData(portfolio.periodic, holdingTypes)
  const options = {
    scales: {
      y: {
        label: 'USD',
        beginAtZero: false,
      },
      x: {
        ticks: {
          autoSkip: false,
          maxTicksLimit: maxTicksByHorizon[period.timeHorizon],
        },
      },
    },
  }
  const totalPortfolioPerformance = portfolio.total?.changes?.total

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
            {label}
          </h2>
        </div>
        <div className="mt-6">
          {totalPortfolioPerformance?.change?.percent && (
            <p className="text-sm">
              {totalPortfolioPerformance.change?.percent >= 0
                ? 'Increase'
                : 'Decrease'}
              : {formatMoney(totalPortfolioPerformance.change.money)} (
              {totalPortfolioPerformance.change?.percent}%)
            </p>
          )}
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  )
}

function holdingTableData(
  allAssets: Portfolio.ValueComponents[] | undefined,
  selectedAssets: Assets.AssetType[]
) {
  const labels = formattedLabels(allAssets)

  let tableData = {
    labels: labels,
    datasets: [],
  }

  let datasets = []
  for (const assetClass of selectedAssets) {
    console.log('all assets', allAssets)
    let thisHoldingValuesInEachGroup =
      allAssets === undefined
        ? null
        : allAssets
            .filter((p) => p !== undefined)
            .filter((p) => p?.totals !== undefined)
            .map((p) => {
              switch (assetClass) {
                case 'SECURITIES':
                  return p?.totals.securities.amount
                case 'ACCOUNTS':
                  return p?.totals.accounts.amount
                default:
                  return 0
              }
            })
    // @ts-ignore:next-line
    datasets.push({
      label: assetClass,
      data: thisHoldingValuesInEachGroup,
      fill: false,
      backgroundColor: 'rgb(59, 130, 246)',
      borderColor: 'rgba(59, 130, 246, 0.7)',
    })
  }

  tableData.datasets = datasets
  return tableData
}

export function formattedLabels(
  allAssets: Portfolio.ValueComponents[] | undefined
) {
  if (!allAssets) {
    return []
  }
  const locale = navigator.language || 'en-US'
  const formatter = new Intl.DateTimeFormat(locale)

  return allAssets
    .map((p) => p?.period)
    .filter((p) => p !== undefined)
    .map((p) => {
      return formatter.format(new Date(p.start)).toString()
    })
}

export function formattePeriodicAssetLabels(allAssets: Assets.PeriodicAsset[]) {
  if (!allAssets) {
    return []
  }
  const locale = navigator.language || 'en-US'
  const formatter = new Intl.DateTimeFormat(locale)

  return allAssets
    .filter((p) => p !== undefined)
    .map((p) => {
      return formatter.format(new Date(p.start)).toString()
    })
}

export default HoldingsTracker
