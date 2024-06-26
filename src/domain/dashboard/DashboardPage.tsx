import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Fragment, useState } from 'react'
import { isDesktop } from 'react-device-detect'
import Tabs from '../../components/Tabs'
import usePortfolioStore from '../../state_management/stores/portfolio.store'
import { TopArticleList } from '../articles/SpesificArticleList'
import PeriodicHoldingsList from '../holdings/PeriodicHoldingsList'
import { HoldingsWorthGraph } from '../portfolio/HoldingsWorth'
import { calculateAppropriateDates } from '../portfolio/time_horizon'
import AddFirstHolding from './AddFirstHolding'
import { useGetAllHoldings } from '../holdings/hooks/holding_hooks'

export default function DashboardPage() {
  const { portfolioTimeHorizon } = usePortfolioStore()
  const { start, end } = calculateAppropriateDates(portfolioTimeHorizon)
  const [currentTab, setCurrentTab] = useState('accounts')
  const { data: allHoldings, isLoading } = useGetAllHoldings([
    'ACCOUNTS',
    'SECURITIES',
  ])

  if (!isLoading && allHoldings?.length === 0) {
    return (
      <AddFirstHolding
        title="No assets"
        description="Get started by adding an asset to your portfolio"
      />
    )
  }

  return (
    <main>
      <div className="md:space-y-4 md:py-4 xl:space-y-20">
        <div className="mx-2 md:mx-8">
          {isDesktop ? (
            <div className="flex flex-col md:flex-row">
              <>
                <div className="p-4 md:w-3/4">
                  <HoldingsWorthGraph />
                </div>
                <div className="p-4 md:w-1/4"></div>
              </>
            </div>
          ) : (
            <HoldingsWorthGraph />
          )}
        </div>

        <div className="mx-2 mb-2 md:mx-8">
          <Tabs
            setCurrentTab={setCurrentTab}
            tabs={[
              {
                label: 'Accounts',
                value: 'accounts',
                isCurrent: currentTab === 'accounts',
              },
              {
                label: 'Securities',
                value: 'securities',
                isCurrent: currentTab === 'securities',
              },
            ]}
          />
          {currentTab === 'accounts' && (
            <PeriodicHoldingsList
              period={{
                start: start,
                end: end,
                timeHorizon: 'all',
              }}
              type={'ACCOUNTS'}
            />
          )}
          {currentTab === 'securities' && (
            <PeriodicHoldingsList
              period={{
                start: start,
                end: end,
                timeHorizon: 'all',
              }}
              type={'SECURITIES'}
            />
          )}
        </div>

        <div>
          <TopArticleList />
        </div>
      </div>
    </main>
  )
}

function RecentActivityTable() {
  const statuses = {
    Paid: 'text-green-700 bg-green-50 ring-green-600/20',
    Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
    Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
  }
  const days = [
    {
      date: 'Today',
      dateTime: '2023-03-22',
      transactions: [
        {
          id: 1,
          invoiceNumber: '00012',
          href: '#',
          amount: '$7,600.00 USD',
          tax: '$500.00',
          status: 'Paid',
          client: 'Reform',
          description: 'Website redesign',
          icon: ArrowUpCircleIcon,
        },
        {
          id: 2,
          invoiceNumber: '00011',
          href: '#',
          amount: '$10,000.00 USD',
          status: 'Withdraw',
          client: 'Tom Cook',
          description: 'Salary',
          icon: ArrowDownCircleIcon,
        },
        {
          id: 3,
          invoiceNumber: '00009',
          href: '#',
          amount: '$2,000.00 USD',
          tax: '$130.00',
          status: 'Overdue',
          client: 'Tuple',
          description: 'Logo design',
          icon: ArrowPathIcon,
        },
      ],
    },
    {
      date: 'Yesterday',
      dateTime: '2023-03-21',
      transactions: [
        {
          id: 4,
          invoiceNumber: '00010',
          href: '#',
          amount: '$14,000.00 USD',
          tax: '$900.00',
          status: 'Paid',
          client: 'SavvyCal',
          description: 'Website redesign',
          icon: ArrowUpCircleIcon,
        },
      ],
    },
  ]
  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
          Recent activity
        </h2>
      </div>
      <div className="mt-6 overflow-hidden border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <table className="w-full text-left">
              <thead className="sr-only">
                <tr>
                  <th>Amount</th>
                  <th className="hidden sm:table-cell">Client</th>
                  <th>More details</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <Fragment key={day.dateTime}>
                    <tr className="text-sm leading-6 text-gray-900">
                      <th
                        scope="colgroup"
                        colSpan={3}
                        className="relative isolate py-2 font-semibold"
                      >
                        <time dateTime={day.dateTime}>{day.date}</time>
                        <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                        <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                      </th>
                    </tr>
                    {day.transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="relative py-5 pr-6">
                          <div className="flex gap-x-6">
                            <transaction.icon
                              className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                              aria-hidden="true"
                            />
                            <div className="flex-auto">
                              <div className="flex items-start gap-x-3">
                                <div className="text-sm font-medium leading-6 text-gray-900">
                                  {transaction.amount}
                                </div>
                                <div
                                  className={classNames(
                                    statuses[transaction.status],
                                    'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                                  )}
                                >
                                  {transaction.status}
                                </div>
                              </div>
                              {transaction.tax ? (
                                <div className="mt-1 text-xs leading-5 text-gray-500">
                                  {transaction.tax} tax
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                          <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                        </td>
                        <td className="hidden py-5 pr-6 sm:table-cell">
                          <div className="text-sm leading-6 text-gray-900">
                            {transaction.client}
                          </div>
                          <div className="mt-1 text-xs leading-5 text-gray-500">
                            {transaction.description}
                          </div>
                        </td>
                        <td className="py-5 text-right">
                          <div className="flex justify-end">
                            <a
                              href={transaction.href}
                              className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                              View
                              <span className="hidden sm:inline">
                                {' '}
                                transaction
                              </span>
                              <span className="sr-only">
                                , invoice #{transaction.invoiceNumber},{' '}
                                {transaction.client}
                              </span>
                            </a>
                          </div>
                          <div className="mt-1 text-xs leading-5 text-gray-500">
                            Invoice{' '}
                            <span className="text-gray-900">
                              #{transaction.invoiceNumber}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
