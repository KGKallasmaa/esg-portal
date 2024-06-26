import { Doughnut } from 'react-chartjs-2'
import 'chartjs-plugin-datalabels'

type PortfolioDoughnutChartData = {
  label: string
  items: {
    name: string
    value: {
      amount: number
      currency: number
    }
  }[]
}

const PortfolioDoughnutChart = (data: PortfolioDoughnutChartData) => {
  const { items } = data
  const totalAmount = items.reduce((acc, item) => acc + item.value.amount, 0)
  const labelPercent = {}
  for (let index = 0; index < items.length; index++) {
    const item = items[index]
    labelPercent[item.name] = item.value.amount / totalAmount
  }

  const chartData = {
    labels: items.map((item) => item.name),
    datasets: [
      {
        label: 'Portfolio Composition',
        data: items.map((item) => item.value.amount),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed !== undefined) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed)
            }
            const percent = 100 * labelPercent[context.label]

            label += ' (' + Math.round(percent * 100) / 100 + '%)'
            return label
          },
        },
      },
    },
    cutout: '50%',
  }

  return <Doughnut data={chartData} options={options} />
}
export default PortfolioDoughnutChart
