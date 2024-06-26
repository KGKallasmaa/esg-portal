import {
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Assets from '../../models/assets'
import Holdings from '../../models/holdings'
import { formatMoney } from '../money/money'
import { SecurityIcon } from './media/security_icons'
import { useState } from 'react'
import { usePeriodicHoldingsDiff } from './hooks/periodic_holdings_hooks'
import usePortfolioStore from '../../state_management/stores/portfolio.store'
import { calculateAppropriateDates } from '../portfolio/time_horizon'
import { toLocalDateString } from '../../components/utils/date'
import classNames from 'classnames'
import Money from '../../models/money'
import { useDeleteHoldingById } from './hooks/holding_hooks'

export default function PeriodicSecurityCard({
  periodicSecurity,
  asset,
  holding,
}: {
  periodicSecurity: Holdings.PeriodicHolding
  asset: Assets.Security
  holding: Holdings.Holding
}) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  // TODO: add support for chevron right. We'll  how more details about the stock
  // TODO: implement percant change
  const change = 0
  const { marketValuePerUnit, quantity } = periodicSecurity
  const quantityLabel = quantity === 1 ? 'share' : 'shares'
  const { name, symbol, type } = asset.metadata

  const marketValue = {
    amount: marketValuePerUnit?.amount * quantity,
    currency: marketValuePerUnit?.currency,
  }

  return (
    <>
      <div className="flex items-center justify-between rounded-lg px-2">
        <div className="flex min-w-0 gap-x-4">
          <SecurityIcon
            securityType={type}
            ticker={symbol}
            className="h-12 w-12 flex-none rounded-full bg-gray-50"
          />

          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
              {name} ({symbol})
            </p>
            <p className="mt-1 flex text-xs leading-5 text-gray-500 dark:text-gray-200">
              {quantity} {quantityLabel}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-x-4">
          <div className="sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">
              {marketValuePerUnit?.currency && formatMoney(marketValue)}
            </p>
            {change !== 0 && (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                <span className="inline-flex items-center gap-x-1.5">
                  <span
                    className={classNames(
                      'rounded-full p-1',
                      change < 0 && 'bg-red-600',
                      change > 0 && 'bg-emerald-600'
                    )}
                  >
                    <span
                      className={classNames(
                        'h-1.5 w-1.5 rounded-full',
                        change < 0 && 'bg-red-600',
                        change > 0 && 'bg-emerald-600'
                      )}
                    />
                  </span>
                  {change > 0 && <>+{change * 100}%</>}
                  {change < 0 && <>{change * 100}%</>}
                </span>
              </p>
            )}
          </div>

          {expanded ? (
            <ChevronDownIcon
              onClick={toggleExpanded}
              className="h-5 w-5 flex-none text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <ChevronRightIcon
              onClick={toggleExpanded}
              className="h-5 w-5 flex-none transform text-gray-400"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {expanded && <PeriodicSecurityHoldings holding={holding} asset={asset} />}
    </>
  )
}

function PeriodicSecurityHoldings({
  holding,
  asset,
}: {
  holding: Holdings.Holding
  asset: Assets.Security
}) {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('SECURITIES')
  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)
  const period = {
    start: start,
    end: end,
    timeHorizon: holdingTimeHorizon,
  }
  const { data: periodicHoldings, isLoading } = usePeriodicHoldingsDiff(
    holding.id,
    period
  )
  const deleteHoldingMutation = useDeleteHoldingById({
    onSettled: () => {
      window.location.reload()
    },
  })

  const { isin, name, symbol, type } = asset.metadata

  if (isLoading) {
    return (
      <>
        <LoadingSecurity />
        <LoadingSecurity />
        <LoadingSecurity />
      </>
    )
  }

  const handleDelete = () => {
    deleteHoldingMutation.mutate({ id: holding.id })
  }

  return (
    <div>
      <div className="flex justify-end">
        <div className="pr-4">
          <button onClick={handleDelete} className="hover:text-red-500">
            <TrashIcon className=" h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {periodicHoldings?.map((periodicHolding, index) => {
        const { quantity, transactionDate, cost, side } = periodicHolding
        return (
          <PeriodicSecurityHoldingDiff
            key={'periodic-security-holding-diff-' + index}
            costBasis={cost}
            quantity={quantity}
            name={name}
            symbol={symbol}
            transactionDate={transactionDate}
            side={side}
          />
        )
      })}
    </div>
  )
}

function PeriodicSecurityHoldingDiff({
  costBasis,
  quantity,
  name,
  symbol,
  side,
  transactionDate,
}: {
  costBasis: Money.MoneyValue
  quantity: number
  name: string
  symbol: string
  side: 'BUY' | 'SELL'
  transactionDate: Date
}) {
  const quantityLabel = quantity === 1 ? 'share' : 'shares'
  const sideLabel = side === 'BUY' ? 'Bought' : 'Sold'
  const sideIcon = side === 'BUY' ? '🟢' : '🔴'
  return (
    <>
      <div className="flex items-center justify-between rounded-lg p-3">
        <div className="flex min-w-0 gap-x-4">
          <SecurityIcon
            securityType={'equity'}
            ticker={symbol}
            className="h-6 w-6 flex-none rounded-full bg-gray-50"
          />

          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
              {name} ({symbol})
            </p>
            <p className="mt-1 flex items-center text-xs leading-5 text-gray-500 dark:text-gray-200">
              <span className="mr-2">{sideIcon}</span>
              {sideLabel} {quantity} {quantityLabel} on{' '}
              {toLocalDateString(new Date(transactionDate))}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-x-4">
          <div className="sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900 dark:text-gray-100">
              {formatMoney(costBasis)}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

function LoadingSecurity() {
  return (
    <div className="flex items-center justify-between rounded-lg p-2">
      <div className="w-full rounded-md border border-blue-300 p-4 shadow">
        <div className="flex animate-pulse space-x-4">
          <div className="h-10 w-10 rounded-full bg-slate-700"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 rounded bg-slate-700"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 h-2 rounded bg-slate-700"></div>
                <div className="col-span-1 h-2 rounded bg-slate-700"></div>
              </div>
              <div className="h-2 rounded bg-slate-700"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
