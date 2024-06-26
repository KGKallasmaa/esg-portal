import { useState } from 'react'
import Assets from '../../models/assets'
import { usePostLatestPeriodicHoldings } from './hooks/periodic_holdings_hooks'
import PeriodicHoldingCard from './PeriodicHoldingCard'
import Holdings from '../../models/holdings'
import Portfolio from '../../models/portfolio'
import { assetClassTableDisplay } from '../portfolio/display'

function PeriodicHoldingsList({
  period,
  type,
  showTypeName = false,
}: {
  period: Portfolio.Period
  type: Assets.AssetType
  showTypeName?: boolean
}) {
  let { data: periodicHoldings } = usePostLatestPeriodicHoldings({
    type: type,
    period: period,
  })
  const name = assetClassTableDisplay[type].label
  const [viewAll, setViewAll] = useState(false)

  // sort periodic holdings
  if (periodicHoldings) {
    periodicHoldings = periodicHoldings.sort((a, b) => {
      return (
        Math.abs(b.marketValuePerUnit.amount * b.quantity) -
        Math.abs(a.marketValuePerUnit.amount * a.quantity)
      )
    })
  }

  return (
    <div className="max-w-7xl">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="flex items-center justify-between">
          {showTypeName && (
            <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
              {name}
            </h2>
          )}
          {periodicHoldings && periodicHoldings?.length > 3 && (
            <button
              onClick={() => setViewAll(!viewAll)}
              className="dark:text-primary-300 text-sm font-semibold leading-6 text-primary hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              {viewAll ? 'Show less' : 'View all'}
              <span className="sr-only">,{name}</span>
            </button>
          )}
        </div>
        {type === 'ACCOUNTS' && (
          <AccountList periodicHoldings={periodicHoldings} viewAll={viewAll} />
        )}
        {type === 'SECURITIES' && (
          <SecurityList periodicHoldings={periodicHoldings} viewAll={viewAll} />
        )}
      </div>
    </div>
  )
}
function AccountList({
  periodicHoldings,
  viewAll,
}: {
  periodicHoldings: Holdings.PeriodicHolding[] | undefined
  viewAll: boolean
}) {
  if (!periodicHoldings) return null
  return (
    <ul role="list" className="mt-2">
      {periodicHoldings?.map((account, index) => {
        if (!viewAll && index > 2) {
          return null
        }
        return (
          <li
            key={'account-list-card-' + account.id}
            className="overflow-hidden"
          >
            <PeriodicHoldingCard periodicHolding={account} />
          </li>
        )
      })}
    </ul>
  )
}

function SecurityList({
  periodicHoldings,
  viewAll,
}: {
  periodicHoldings: Holdings.PeriodicHolding[] | undefined
  viewAll: boolean
}) {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {periodicHoldings?.map((security, index) => {
        if (!viewAll && index > 2) {
          return null
        }
        return (
          <li
            key={'security-card-' + security.id}
            className="relative justify-between gap-x-6 py-5"
          >
            <PeriodicHoldingCard periodicHolding={security} />
          </li>
        )
      })}
    </ul>
  )
}

export default PeriodicHoldingsList
