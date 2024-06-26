import { MerlinPieChart } from '../../components/charts/MerlinPieChart'
import useCashflowStore from '../../state_management/stores/cashflow.store'
import {
  useGetCashflowInsights,
  useGetSingleCategoryCashflowInsights,
} from './hooks/cashflow_hooks'

import { Chart, ArcElement } from 'chart.js'
import { formatMoney } from '../money/money'
import { TransactionDetailsCard } from '../transactions/TransactionDetailsCard'
import Money from '../../models/money'
import { useGetMySettings } from '../settings/hooks/settings_hooks'
Chart.register(ArcElement)

export function CashflowDetailsView() {
  // pie chart about the biggest spenders
  // show the budget
  const { cashflowStart, cashflowEnd, transactionCategories, detailedView } =
    useCashflowStore()
  if (detailedView.includes('transaction_details_')) {
    const transactionId = detailedView.split('transaction_details_')[1]
    return <TransactionDetailsCard transactionId={transactionId} />
  }
  if (detailedView.includes('single_category_distribution_')) {
    const category = detailedView.split('single_category_distribution_')[1]
    return (
      <SingleCategoryCashflowDistribution
        start={cashflowStart}
        end={cashflowEnd}
        category={category}
      />
    )
  }
  return (
    <MultiCategoryCashflowDistribution
      start={cashflowStart}
      end={cashflowEnd}
      categories={transactionCategories}
      isIncome={false}
    />
  )
}

function SingleCategoryCashflowDistribution({
  start,
  end,
  category,
}: {
  start: Date
  end: Date
  category: string
}) {
  let { data: insights } = useGetSingleCategoryCashflowInsights(
    category,
    start,
    end
  )
  const {
    data: mySettings,
    isLoading: isLoadingSettings,
    isError: isSettingsErr,
  } = useGetMySettings()
  if (!insights) return null

  let chartItems = insights.moneyMovement.snakeGraph.map((item) => {
    return {
      name: item[1],
      value: item[2],
    }
  })
  // first el is header
  chartItems.shift()

  const totalMoney = chartItems.reduce((acc, item) => acc + item.value, 0)
  const total = {
    amount: totalMoney,
    currency: mySettings?.general.currency || 'USD',
  }

  if (chartItems.length === 0) {
    return <div className="h-[400px]"></div>
  }
  return <CashflowDistributionChart total={total} chartItems={chartItems} />
}

function MultiCategoryCashflowDistribution({
  start,
  end,
  categories,
  isIncome,
}: {
  start: Date
  end: Date
  categories: string[]
  isIncome: boolean
}) {
  let { data: insights } = useGetCashflowInsights(start, end, categories)
  if (!insights) return null

  const items = isIncome
    ? insights.breakdown.income.detailedCategoryBreakdown.items
    : insights.breakdown.expenses.detailedCategoryBreakdown.items
  const chartItems = items.map((item) => {
    return {
      name: item.category,
      value: item.money.amount,
    }
  })
  const total = isIncome
    ? insights.summary.total.income
    : insights.summary.total.expenses
  if (chartItems.length === 0) {
    return <div className="h-[400px]"></div>
  }
  return <CashflowDistributionChart total={total} chartItems={chartItems} />
}

function CashflowDistributionChart({
  total,
  chartItems,
}: {
  total: Money.MoneyValue
  chartItems: { name: string; value: number }[]
}) {
  return (
    <>
      <h3 className="invisible text-lg font-semibold md:visible">
        Distribution
      </h3>
      <MerlinPieChart label={formatMoney(total)} data={chartItems} />
    </>
  )
}
