import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import Portfolio from '../../models/portfolio'
import { useGetPortfolioValue } from './hooks/portfolio_hooks'
import { formatMoney } from '../money/money'
import Assets from '../../models/assets'
import { allAssetClasses, assetClassTableDisplay } from './display'

const maxTicksByHorizon = {
  day: 20,
  week: 7,
  month: 4,
  quarter: 3 * 4,
  year: 12,
  ytd: 12,
  '5-years': 20,
  '10-years': 20,
  all: 20,
}

const CurrentWealthTracker = ({
  holdingTypes,
  period,
  label,
}: {
  holdingTypes: Assets.AssetType[]
  period: Portfolio.Period
  label?: string
}) => {
  const { data: portfolio, isLoading } = useGetPortfolioValue(
    period,
    holdingTypes
  )
  if (!portfolio) {
    if (isLoading) {
      return <div>Loading...</div>
    }
    return null
  }

  const data = tableData(portfolio.periodic, holdingTypes)
  const options = {
    scales: {
      y: {
        label: 'USD',
        beginAtZero: false,
      },
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: maxTicksByHorizon[period.timeHorizon],
        },
      },
    },
  }

  /*
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          borderDash: [3, 3],
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        autoSkip: true,
        maxTicksLimit: maxTicksByHorizon[period.timeHorizon],
      },
    },
  }
  */

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

function tableData(
  allAssets: Portfolio.ValueComponents[] | undefined,
  selectedAssets: Assets.AssetType[]
) {
  const labels = formattedLabels(allAssets)

  let tableData = {
    labels: labels,
    datasets: [],
  }

  let datasets = []

  if (selectedAssets.length === allAssetClasses.length) {
    const totalHoldingValues =
      allAssets === undefined
        ? null
        : allAssets.map((p) => {
            if (p) {
              if (p.totals) {
                return p.totals.totalValue.amount
              }
            }
            return 0
          })

    // @ts-ignore:next-line
    datasets.push({
      label: 'Holdings',
      data: totalHoldingValues,
      fill: true,
      backgroundColor: assetClassTableDisplay.ALL.backgroundColor,
      borderColor: assetClassTableDisplay.ALL.borderColor,
    })
  } else {
    for (const assetClass of selectedAssets) {
      let thisHoldingValuesInEachGroup =
        allAssets === undefined
          ? []
          : allAssets
              .filter((p) => p)
              .map((p) => {
                switch (assetClass) {
                  case 'SECURITIES':
                    return p?.totals?.securities?.amount
                  case 'ACCOUNTS':
                    return p?.totals?.accounts?.amount
                  default:
                    return 0
                }
              })
      const nrOfPresent = thisHoldingValuesInEachGroup.filter((p) => p).length
      if (nrOfPresent === 0) {
        continue
      }
      // @ts-ignore:next-line
      datasets.push({
        label: assetClassTableDisplay[assetClass].label,
        data: thisHoldingValuesInEachGroup,
        fill: true,
        backgroundColor: assetClassTableDisplay[assetClass].borderColor,
        borderColor: assetClassTableDisplay[assetClass].borderColor,
      })
    }
  }
  tableData.datasets = datasets
  return tableData
}

function formattedLabels(allAssets: Portfolio.ValueComponents[] | undefined) {
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

export default CurrentWealthTracker
