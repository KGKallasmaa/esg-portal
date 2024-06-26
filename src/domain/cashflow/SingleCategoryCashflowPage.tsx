// TODO: the ability to set buckets (total, category)

import PeriodSwitcher from './PeriodSwitcher'
import { isMobile } from 'react-device-detect'
import { SingleCategoryCashflowNumbers } from './CashflowNumbers'
import { SingleCategorySnakeGraphOverview } from './SnakeGraphOverview'
import { TransactionsTableWithSearch } from './TransactionsTableWithSearch'
import useCashflowStore from '../../state_management/stores/cashflow.store'
import { CashflowDetailsView } from './CashflowDetailsView'
import { useEffect } from 'react'
import Link from 'next/link'

function SingleCategoryCashflowPage({ category }: { category: string }) {
  const { setDetailedView } = useCashflowStore()
  useEffect(() => {
    const key = 'single_category_distribution_' + category
    setDetailedView(key)
  }, [])
  if (isMobile) {
    return <MobileSingleCategoryCashflowPage category={category} />
  }
  return <DesktopSingleCategoryCashflowPage category={category} />
}

function DesktopSingleCategoryCashflowPage({ category }: { category: string }) {
  const { cashflowStart, cashflowEnd } = useCashflowStore()
  return (
    <div className="flex w-full flex-col">
      <div className="flex-grow overflow-auto">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 dark:bg-gray-800">
            <PeriodSwitcher />
            <div className="border-b-[1px] border-t-[1px] border-white">
              <SingleCategorySnakeGraphOverview category={category} />
              <div className="border-t-[1px] border-white">
                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3">
                    <SingleCategoryCashflowNumbers category={category} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid justify-items-end">
              <div className="mt-4 pb-4 pr-2">
                <Link
                  href={'/cashflow/transactions'}
                  className="rounded-lg bg-gray-700 p-2 text-white"
                >
                  View all transactions
                </Link>
              </div>
            </div>

            <div className="mx-4 mt-5 md:mx-1">
              <TransactionsTableWithSearch
                startDate={cashflowStart}
                endDate={cashflowEnd}
                category={category}
              />
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

function MobileSingleCategoryCashflowPage({ category }: { category: string }) {
  const { cashflowStart, cashflowEnd } = useCashflowStore()
  return (
    <div className="flex w-full flex-col">
      <PeriodSwitcher showCategoryDropdown={false} />
      <div className="px-2">
        <CashflowDetailsView />
      </div>

      <div className="border-t-[1px]  border-white">
        <SingleCategoryCashflowNumbers category={category} />
      </div>

      <div className="grid justify-items-end">
        <div className="mt-4 pb-4 pr-2">
          <Link
            href={'/cashflow/transactions'}
            className="rounded-lg bg-gray-700 p-2 text-white"
          >
            View all transactions
          </Link>
        </div>
      </div>

      <div className="mt-4">
        <TransactionsTableWithSearch
          startDate={cashflowStart}
          endDate={cashflowEnd}
          category={category}
        />
      </div>
    </div>
  )
}

export default SingleCategoryCashflowPage
