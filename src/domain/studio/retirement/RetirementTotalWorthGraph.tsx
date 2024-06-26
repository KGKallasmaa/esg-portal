import { isMobile } from 'react-device-detect'
import Money from '../../../models/money'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { currencySymbolMap, green, red } from '../../portfolio/display'

import { useGetRetirementPlanById } from '../hooks/studio_hooks'

export default function RetirementTotalWorthGraph({ id }: { id: string }) {
  const { data: myRetirementPlan } = useGetRetirementPlanById(id)
  return (
    <div className="pb-3 dark:bg-zinc-900">
      <div className="mx-2 mt-2">
        {myRetirementPlan && (
          <div className="h-2/6">
            <RetirmentGraph
              currency={myRetirementPlan.currency}
              totalWorth={myRetirementPlan.totalWorth}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function RetirmentGraph({
  currency,
  totalWorth,
}: {
  currency: Money.Currency
  totalWorth: Money.DatedMoneyValue[]
}) {
  const { labels, datasets } = buildData(totalWorth)
  const minVal = Math.min(...datasets[0].data)
  const maxVal = Math.max(...datasets[0].data)
  const options = buildOptions(minVal, maxVal, currency)

  const data = {
    labels: labels,
    datasets: datasets,
  }

  // @ts-ignore
  return <Line data={data} options={options} />
}

function buildData(valueComponents: Money.DatedMoneyValue[]) {
  let data: number[] = []

  for (let index = 0; index < valueComponents?.length; index++) {
    const element = valueComponents[index]

    if (element) {
      data.push(element.value.amount)
    }
  }
  console.log(data)

  let firstValue = data[0]
  let lastValue = data[data.length - 1]

  let color = green
  if (firstValue > lastValue || (firstValue < 0 && lastValue < 0)) {
    color = red
  }

  const labels = formattedLabels(valueComponents)
  const datasets = [
    {
      data: data,
      //  fill: true,
      backgroundColor: color.backgroundColor,
      borderColor: color.borderColor,
      borderWidth: 2,
    },
  ]
  return { labels, datasets }
}

function buildOptions(
  minVal: number,
  maxVal: number,
  currency: Money.Currency
) {
  return {
    maintainAspectRatio: false,
    // responsive: true,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || ''

            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency,
              }).format(context.parsed.y)
            }
            return label
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          display: isMobile ? false : true,
          text: currencySymbolMap.get(currency),
        },
        beginAtZero: false,
        grid: {
          display: false, // This will hide the y-axis grid lines
          drawBorder: false, // This will hide the y-axis border line
        },
        min: minVal > 0 ? Math.round(minVal * 0.9) : Math.round(minVal * 1.1),
        max: maxVal > 0 ? Math.round(maxVal * 1.1) : Math.round(maxVal * 0.9),
      },
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
      },
    },
  }
}

export function formattedLabels(allMoneys: Money.DatedMoneyValue[]) {
  if (!allMoneys) {
    return []
  }
  const locale = navigator.language || 'en-US'
  const formatter = new Intl.DateTimeFormat(locale)
  return allMoneys.map((p) => {
    if (p) {
      return formatter.format(new Date(p.date)).toString()
    }
  })
}
