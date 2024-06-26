// TODO: the ability to set buckets (total, category)

import PeriodSwitcher from './PeriodSwitcher'
import { isMobile } from 'react-device-detect'
import CategorySummaryView from './CategorySummaryView'
import Link from 'next/link'
import { MultiCateogySnakeGraphOverview } from './SnakeGraphOverview'
import { CashflowDetailsView } from './CashflowDetailsView'
import AccountsView from './AccountsView'
import RecurringViewV2 from './RecurringView'
import { MultiCategoryCashflowNumbers } from './CashflowNumbers'
import { useState } from 'react'
import Tabs from '../../components/Tabs'

function CashflowPage() {
  if (isMobile) {
    return <MobileCashflowPage />
  }
  return <DesktopCashflowPage />
}

function DesktopCashflowPage() {
  return (
    <div className="flex w-full flex-col">
      <div className="flex-grow overflow-auto">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-3 dark:bg-gray-800">
            <PeriodSwitcher showCategoryDropdown={true} />
            <div className="border-b-[1px] border-t-[1px] border-white">
              <MultiCateogySnakeGraphOverview />
              <div className="border-t-[1px]  border-white">
                <MultiCategoryCashflowNumbers />
              </div>
            </div>
            <div className="mx-4 mt-5 md:mx-1">
              <div className="grid justify-items-end">
                <div className="pb-4 pr-4">
                  <Link
                    href={'/cashflow/transactions'}
                    className="rounded-lg bg-gray-700 p-2 text-white"
                  >
                    View all transactions
                  </Link>
                </div>
              </div>
              <CategorySummaryView />
            </div>
          </div>
          <div className="col-span-2 w-full">
            <CashflowDetailsView />
            <AccountsView />
            <div className="mt-4">
              <RecurringViewV2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MobileCashflowPage() {
  const [activeTab, setActiveTab] = useState('transactions')
  return (
    <div className="flex w-full flex-col">
      <PeriodSwitcher showCategoryDropdown={false} />
      <div className="px-2">
        <CashflowDetailsView />
      </div>
      <div className="border-t-[1px]  border-white">
        <MultiCategoryCashflowNumbers />

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
      </div>
      <div className="border-t-[1px] border-white">
        <Tabs
          tabs={[
            {
              label: 'Transactions',
              value: 'transactions',
              isCurrent: activeTab === 'transactions',
            },
            {
              label: 'Recurring',
              value: 'recurring',
              isCurrent: activeTab === 'recurring',
            },
          ]}
          setCurrentTab={(t) => setActiveTab(t)}
        />
      </div>

      <div className="mt-4">
        {activeTab === 'transactions' && <CategorySummaryView />}
        {activeTab === 'recurring' && <RecurringViewV2 />}
      </div>
    </div>
  )
}

export default CashflowPage
