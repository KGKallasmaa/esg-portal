import useCashflowStore from '../../state_management/stores/cashflow.store'
import { CategoriesList } from './CategoryCard'
import { useGetCashflowInsights } from './hooks/cashflow_hooks'

function CategorySummaryView() {
  // pie chart about the biggest spenders
  // show the budget
  const { cashflowStart, cashflowEnd, detailedView, transactionCategories } =
    useCashflowStore()
  let { data: insights } = useGetCashflowInsights(
    cashflowStart,
    cashflowEnd,
    transactionCategories
  )
  if (!insights) return null

  switch (detailedView) {
    case 'expenses':
      const totalExpenses = insights.summary.total.expenses
      const showExpenses = totalExpenses.amount !== 0
      if (!showExpenses) return null
      return (
        <>
          <div className="ml-2 text-gray-500 dark:text-white">
            {insights.breakdown.expenses.detailedCategoryBreakdown.items.length}{' '}
            expense categories
          </div>
          <CategoriesList
            showPercentages={true}
            categories={insights.breakdown.expenses.detailedCategoryBreakdown}
          />
        </>
      )
    case 'income':
      const toatlIncome = insights.summary.total.income
      const showIncome = toatlIncome.amount !== 0
      if (!showIncome) return null
      return (
        <>
          <div className="ml-2 text-gray-500 dark:text-white">
            {insights.breakdown.income.detailedCategoryBreakdown.items.length}{' '}
            income categories
          </div>
          <CategoriesList
            showPercentages={true}
            categories={insights.breakdown.income.detailedCategoryBreakdown}
          />
        </>
      )
    default:
      return null
  }
}

export default CategorySummaryView
