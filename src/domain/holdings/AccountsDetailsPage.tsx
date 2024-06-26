import usePortfolioStore from '../../state_management/stores/portfolio.store'
import { TransactionsTableWithSearch } from '../cashflow/TransactionsTableWithSearch'
import { SingleAccountWorthGraph } from '../portfolio/HoldingsWorth'
import { calculateAppropriateDates } from '../portfolio/time_horizon'

export default function AccountsDetailsPage({ assetId }: { assetId: string }) {
  const { getHoldingTimeHorizon } = usePortfolioStore()
  const holdingTimeHorizon = getHoldingTimeHorizon('ACCOUNTS')
  const { start, end } = calculateAppropriateDates(holdingTimeHorizon)

  return (
    <main>
      <div className="space-y-4 py-4 xl:space-y-20">
        <div className="mx-2 md:mx-8">
          <SingleAccountWorthGraph assetId={assetId} />
        </div>
        <div className="mx-2 md:mx-8">
          <TransactionsTableWithSearch
            startDate={start}
            endDate={end}
            accountIds={[assetId]}
          />
        </div>
      </div>
    </main>
  )
}
