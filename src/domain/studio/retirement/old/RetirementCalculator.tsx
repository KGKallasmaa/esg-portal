import { useEffect, useState } from 'react'
import { futureValue } from '../../../money/money'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'

export type RetirementChartType =
  | 'yearlySavings'
  | 'yearlyWithdrawal'
  | 'portfolioValue'
  | 'combined'

type RetirementCalculatorProps = {
  retirementAge: number
  isEditingAllowed?: boolean
  visibleCharts: RetirementChartType[]
}

function RetirementCalculator(props: RetirementCalculatorProps) {
  const { retirementAge } = props
  const [currentAge, setCurrentAge] = useState(27)
  const [annualSavings, setAnnualSavings] = useState(5_500)
  const [currentSavings, setCurrentSavings] = useState(20_000)
  const [returnRate, setReturnRate] = useState(5) // In percentage
  const [annualWithdrawal, setAnnualWithdrawal] = useState(12 * 2000) // Initial withdrawal amount in today's money
  const [inflationRate, setInflationRate] = useState(2) // In percentage

  const [combinedChartData, setCombinedChartData] = useState({})
  const [yearlySavingsChartData, setYearlySavingsChartData] = useState({})
  const [yearlyWithdrawalChartData, setYearlyWithdrawalChartData] = useState({})
  const [portfolioValueChartData, setPortfolioValueChartData] = useState({})

  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge
    let yearsInRetirement = 30 // Assuming 30 years post-retirement
    let totalYears = currentAge + yearsToRetirement + yearsInRetirement

    let dataMap = new Map()
    for (let year = currentAge; year <= totalYears; year++) {
      const datapoint = {
        label: year.toString(),
        yearlySavings: null,
        portfolioValue: currentSavings,
        withdrawal: null,
      }
      dataMap.set(year, datapoint)
    }

    // pre-retirement period
    for (
      let year = currentAge + 1;
      year <= currentAge + yearsToRetirement;
      year++
    ) {
      const lastYearsData = dataMap.get(year - 1)
      //  const lastYearsSavings = lastYearsData.yearlySavings
      const lastAssetValue = lastYearsData.portfolioValue

      const thisYearsSavings = futureValue(
        annualSavings,
        inflationRate / 100,
        year - currentAge
      )
      const thisYearsAssetValue =
        lastAssetValue * (1 + returnRate / 100) + thisYearsSavings

      const thisYearsData = dataMap.get(year)
      thisYearsData.yearlySavings = thisYearsSavings
      thisYearsData.portfolioValue = thisYearsAssetValue
      dataMap.set(year, thisYearsData)
    }
    // in retirement period
    for (
      let year = currentAge + yearsToRetirement;
      year <= totalYears;
      year++
    ) {
      const lastYearsData = dataMap.get(year - 1)
      const lastAssetValue = lastYearsData.portfolioValue
      let thisYearsWithdrawal = futureValue(
        annualWithdrawal,
        inflationRate / 100,
        year - currentAge
      )
      thisYearsWithdrawal = Math.min(thisYearsWithdrawal, lastAssetValue)
      let thisYearsAssetValue =
        lastAssetValue * (1 + returnRate / 100) - thisYearsWithdrawal

      const thisYearsData = dataMap.get(year)
      if (thisYearsWithdrawal == 0) {
        //@ts-ignore
        thisYearsWithdrawal = null
      }
      if (thisYearsAssetValue == 0) {
        //@ts-ignore
        thisYearsAssetValue = null
      }
      thisYearsData.withdrawal = thisYearsWithdrawal
      thisYearsData.portfolioValue = thisYearsAssetValue
      dataMap.set(year, thisYearsData)
    }

    console.log('data', dataMap)

    let labels = []
    let assetValue = []
    let yearlySavingsData = []
    let withdrawalData = []

    for (let [key, value] of dataMap) {
      //@ts-ignore
      labels.push(value.label)
      //@ts-ignore
      assetValue.push(value.portfolioValue)
      //@ts-ignore
      yearlySavingsData.push(value.yearlySavings)
      //@ts-ignore
      withdrawalData.push(value.withdrawal)
    }

    setCombinedChartData({
      labels,
      datasets: [
        {
          label: 'Portfolio Value',
          data: assetValue,
          borderColor: '#3b82f6',
          backgroundColor: '#2563eb',
        },
        {
          label: 'Yearly savings',
          data: yearlySavingsData,
          borderColor: '#10b981',
          backgroundColor: '#059669',
        },
        {
          label: 'Yearly Withdrawals',
          data: withdrawalData,
          borderColor: '#ef4444',
          backgroundColor: '#dc2626',
        },
      ],
    })

    setYearlySavingsChartData({
      labels,
      datasets: [
        {
          label: 'Yearly savings',
          data: yearlySavingsData,
          borderColor: '#10b981',
          backgroundColor: '#059669',
        },
      ],
    })

    setYearlyWithdrawalChartData({
      labels,
      datasets: [
        {
          label: 'Yearly Withdrawals',
          data: withdrawalData,
          borderColor: '#ef4444',
          backgroundColor: '#dc2626',
        },
      ],
    })

    setPortfolioValueChartData({
      labels,
      datasets: [
        {
          label: 'Portfolio Value',
          data: assetValue,
          borderColor: '#3b82f6',
          backgroundColor: '#2563eb',
        },
      ],
    })
  }, [
    currentAge,
    retirementAge,
    annualSavings,
    currentSavings,
    returnRate,
    annualWithdrawal,
    inflationRate,
  ])

  const { isEditingAllowed } = props
  return (
    <div>
      {isEditingAllowed && (
        <>
          <h2>Your Retirement Calculator</h2>
          <div>
            <label>Current Age: </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Annual Savings: </label>
            <input
              type="number"
              value={annualSavings}
              onChange={(e) => setAnnualSavings(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Current Savings: </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
          </div>
          <div>
            <label>Return Rate (%): </label>
            <input
              type="number"
              value={returnRate}
              onChange={(e) => setReturnRate(Number(e.target.value))}
            />
          </div>
        </>
      )}
      <div>
        {props.visibleCharts.includes('yearlySavings') &&
          Object.keys(yearlySavingsChartData).length > 0 && (
            <Line
              //@ts-ignore
              data={yearlySavingsChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          )}
        {props.visibleCharts.includes('yearlyWithdrawal') &&
          Object.keys(yearlyWithdrawalChartData).length > 0 && (
            <Line
              //@ts-ignore
              data={yearlyWithdrawalChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          )}

        {props.visibleCharts.includes('portfolioValue') &&
          Object.keys(portfolioValueChartData).length > 0 && (
            <Line
              //@ts-ignore
              data={portfolioValueChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          )}

        {props.visibleCharts.includes('combined') &&
          Object.keys(combinedChartData).length > 0 && (
            <Line
              //@ts-ignore
              data={combinedChartData}
              options={{ responsive: true, maintainAspectRatio: false }}
            />
          )}
      </div>
    </div>
  )
}
export default RetirementCalculator
