import usePortfolioStore from '../../state_management/stores/portfolio.store'
import { calculateAppropriateDates } from '../portfolio/time_horizon'
import PeriodicHoldingsList from './PeriodicHoldingsList'
import { isDesktop } from 'react-device-detect'
import AccountsDoughnutChart from './AccountsDonutChart'
import { AccountsWorthGraph } from '../portfolio/HoldingsWorth'
import AddFirstHolding from '../dashboard/AddFirstHolding'
import { useGetAllHoldings } from './hooks/holding_hooks'

export default function AccountsPage() {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('ACCOUNTS')
  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)

  const { data: securityHoldings, isLoading } = useGetAllHoldings(['ACCOUNTS'])

  if (!isLoading && securityHoldings?.length === 0) {
    return (
      <AddFirstHolding
        title="No accounts"
        description="Get started by adding some current account to your portfolio"
      />
    )
  }

  return (
    <main>
      <div className="space-y-4 py-4 xl:space-y-20">
        <div className="mx-2 md:mx-8">
          <AccountsWorthGraph />
        </div>

        <div className="mx-2 md:mx-8">
          {isDesktop ? (
            <div className="flex flex-col md:flex-row">
              <>
                <div className="p-4 md:w-3/4">
                  <PeriodicHoldingsList
                    period={{
                      start: start,
                      end: end,
                      timeHorizon: holdingTimeHorizon,
                    }}
                    type={'ACCOUNTS'}
                  />
                </div>
                <div className="p-4 md:w-1/4">
                  <AccountsDoughnutChart />
                </div>
              </>
            </div>
          ) : (
            <PeriodicHoldingsList
              period={{
                start: start,
                end: end,
                timeHorizon: holdingTimeHorizon,
              }}
              type={'ACCOUNTS'}
            />
          )}
        </div>
      </div>
    </main>
  )
}
