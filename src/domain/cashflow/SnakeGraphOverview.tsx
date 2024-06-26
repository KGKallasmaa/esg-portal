import SnakeChart from '../../components/charts/SnakeChart'
import useCashflowStore from '../../state_management/stores/cashflow.store'
import {
  useGetCashflowInsights,
  useGetSingleCategoryCashflowInsights,
} from './hooks/cashflow_hooks'

export function MultiCateogySnakeGraphOverview() {
  const { cashflowStart, cashflowEnd, transactionCategories } =
    useCashflowStore()
  const { data: insights } = useGetCashflowInsights(
    cashflowStart,
    cashflowEnd,
    transactionCategories
  )
  return snakeGraphOverview(insights)
}

export function SingleCategorySnakeGraphOverview({
  category,
}: {
  category: string
}) {
  const { cashflowStart, cashflowEnd } = useCashflowStore()
  const { data: insights } = useGetSingleCategoryCashflowInsights(
    category,
    cashflowStart,
    cashflowEnd
  )
  return snakeGraphOverview(insights)
}

function snakeGraphOverview(insights) {
  if (!insights) return null
  if (!insights.moneyMovement) return null
  if (insights.moneyMovement.snakeGraph.length < 2) return null
  return <SnakeChart data={insights.moneyMovement.snakeGraph} />
}
