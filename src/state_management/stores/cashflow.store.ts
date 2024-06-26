import { useAtom } from 'jotai'
import {
  cashflowEndAtom,
  cashflowStartAtom,
  cashflowTimeHorizonAtom,
  detailedViewAtom,
  initalTransactionCategoriesAtom,
  refreshRecurringTransactionsAtom,
  refreshTransactionsAtom,
  selectedCategoryViewAtom,
} from '../atoms/cashflow.atom'
import { useGetTransactionCategories } from '../../domain/cashflow/hooks/cashflow_hooks'
import { useEffect } from 'react'

const useCashflowStore = () => {
  const [cashflowTimeHorizon] = useAtom(cashflowTimeHorizonAtom)
  const [cashflowStart, setCashflowStart] = useAtom(cashflowStartAtom)
  const [cashflowEnd, setCashflowEnd] = useAtom(cashflowEndAtom)
  const [detailedView, setDetailedView] = useAtom(detailedViewAtom)
  const [selectedCategoryView, setSelectedCategoryView] = useAtom(
    selectedCategoryViewAtom
  )
  const { data: transactioncategoryData } = useGetTransactionCategories(
    cashflowStart,
    cashflowEnd
  )
  const [transactionCategories, setTransactionCategories] = useAtom(
    initalTransactionCategoriesAtom
  )
  useEffect(() => {
    if (transactioncategoryData) {
      setTransactionCategories(transactioncategoryData)
    }
  }, [transactioncategoryData])

  const [refreshRecurringTransactions, setRefreshRecurringTransactions] =
    useAtom(refreshRecurringTransactionsAtom)
  const [refreshTransactions, setRefreshTransactions] = useAtom(
    refreshTransactionsAtom
  )

  return {
    transactionCategories,
    setTransactionCategories,
    cashflowTimeHorizon,
    cashflowStart,
    setCashflowStart,
    cashflowEnd,
    setCashflowEnd,
    detailedView,
    setDetailedView,
    selectedCategoryView,
    setSelectedCategoryView,
    refreshRecurringTransactions,
    setRefreshRecurringTransactions,
    refreshTransactions,
    setRefreshTransactions,
  }
}
export default useCashflowStore
