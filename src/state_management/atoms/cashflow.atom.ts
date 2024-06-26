import { atom } from 'jotai'
import Portfolio from '../../models/portfolio'

function getFirstAndLastDayOfMonth(): {
  startOfThisMonth: Date
  endOfThisMonth: Date
} {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const startOfThisMonth = new Date(year, month, 1)
  const endOfThisMonth = new Date(year, month + 1, 0)

  return { startOfThisMonth, endOfThisMonth }
}

const { startOfThisMonth, endOfThisMonth } = getFirstAndLastDayOfMonth()
export const cashflowStartAtom = atom<Date>(startOfThisMonth)
export const cashflowEndAtom = atom<Date>(endOfThisMonth)
export const cashflowTimeHorizonAtom = atom<Portfolio.TimeHorizon>('month')
export const detailedViewAtom = atom('income')
export const selectedCategoryViewAtom = atom('')
export const refreshRecurringTransactionsAtom = atom<boolean>(false)
export const initalTransactionCategoriesAtom = atom<string[]>([])
export const refreshTransactionsAtom = atom<boolean>(false)
