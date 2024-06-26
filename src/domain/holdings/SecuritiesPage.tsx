import { useState } from 'react'
import { isDesktop } from 'react-device-detect'
import Tabs from '../../components/Tabs'
import usePortfolioStore from '../../state_management/stores/portfolio.store'
import { StockArticleList } from '../articles/SpesificArticleList'
import { SecuritiesWorthGraph } from '../portfolio/HoldingsWorth'
import { calculateAppropriateDates } from '../portfolio/time_horizon'
import PeriodicHoldingsList from './PeriodicHoldingsList'
import SecuritesDoughnutChart from './SecuritiesDonutChart'
import { useGetAllHoldings } from './hooks/holding_hooks'
import AddFirstHolding from '../dashboard/AddFirstHolding'

export default function SecuritiesPage() {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('SECURITIES')
  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)
  const [currentTab, setCurrentTab] = useState('sector_breakdown')

  const { data: securityHoldings, isLoading } = useGetAllHoldings([
    'SECURITIES',
  ])

  if (!isLoading && securityHoldings?.length === 0) {
    return (
      <AddFirstHolding
        title="No stocks"
        description="Get started by adding some stocks to your portfolio"
      />
    )
  }

  return (
    <main>
      <div className="space-y-4 py-4 xl:space-y-20">
        <div className="mx-2 md:mx-8">
          <SecuritiesWorthGraph />
        </div>

        <div className="mx-2 md:mx-8">
          {isDesktop ? (
            <div className="flex flex-col md:flex-row">
              <div className="p-4 md:w-3/4">
                <PeriodicHoldingsList
                  period={{
                    start: start,
                    end: end,
                    timeHorizon: 'all',
                  }}
                  type={'SECURITIES'}
                />
              </div>
              <div className="p-4 md:w-1/4">
                <SecuritesDoughnutChart />
              </div>
            </div>
          ) : (
            <>
              <PeriodicHoldingsList
                period={{
                  start: start,
                  end: end,
                  timeHorizon: 'all',
                }}
                type={'SECURITIES'}
              />
            </>
          )}
        </div>

        <div className="mx-2 mb-2 md:mx-8">
          <Tabs
            setCurrentTab={setCurrentTab}
            tabs={[
              {
                label: 'Latest News',
                value: 'latest_news',
                isCurrent: currentTab === 'latest_news',
              },
            ]}
          />
          {currentTab === 'latest_news' && <StockArticleList />}
        </div>
      </div>
    </main>
  )
}
