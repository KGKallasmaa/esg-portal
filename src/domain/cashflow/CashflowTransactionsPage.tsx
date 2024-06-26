// TODO: the ability to set buckets (total, category)

import { useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import useCashflowStore from '../../state_management/stores/cashflow.store'
import { CashflowDetailsView } from './CashflowDetailsView'
import PeriodSwitcher from './PeriodSwitcher'
import { TransactionsTableWithSearch } from './TransactionsTableWithSearch'

function CashflowTransactionsPage() {
  const { detailedView, setDetailedView } = useCashflowStore()
  useEffect(() => {
    if (detailedView !== '') {
      setDetailedView('')
    }
  }, [])
  if (isMobile) {
    return <MobileCashflowTransactionsPage />
  }
  return <DesktopCashflowTransactionsPage />
}

function DesktopCashflowTransactionsPage() {
  const { cashflowStart, cashflowEnd } = useCashflowStore()
  return (
    <div className="flex w-full flex-col">
      <div className="flex-grow overflow-auto">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 dark:bg-gray-800">
            <PeriodSwitcher />
            <div className="border-b-[1px] border-t-[1px] border-gray-300 dark:border-white">
              <div className="mx-4 mt-5 md:mx-1">
                <TransactionsTableWithSearch
                  startDate={cashflowStart}
                  endDate={cashflowEnd}
                  category={''}
                />
              </div>
            </div>
          </div>
          <div>
            <CashflowDetailsView />
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileCashflowTransactionsPage() {
  const { cashflowStart, cashflowEnd, detailedView } = useCashflowStore()
  const isTransactionDetailsView = detailedView.includes('transaction_details_')
  return (
    <>
      <PeriodSwitcher />
      <div className="mt-4 border-b-[1px] border-t-[1px] border-gray-300 dark:border-white">
        <div className={isTransactionDetailsView ? 'mx-2' : ''}>
          <CashflowDetailsView />
        </div>
        <div className="">
          <TransactionsTableWithSearch
            startDate={cashflowStart}
            endDate={cashflowEnd}
            category={''}
          />
        </div>
      </div>
    </>
  )
}

export default CashflowTransactionsPage
