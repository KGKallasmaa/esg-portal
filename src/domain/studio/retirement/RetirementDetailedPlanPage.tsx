import RetirementTotalWorthGraph from './RetirementTotalWorthGraph'
import ExcpensesColumn from './ExcpensesColumn'
import IncomeColumn from './IncomeColumn'
import { RetirementStartAndEnd } from './RetirementStartAndEnd'
import RetirementDetails from './RetirementDetails'
import InitalAssetsColumn from './InitalAssetsColumn'
import InvestmentsColumn from './InvestmentsColumn'

export default function RetirementDetailedPlanPage({ id }: { id: string }) {
  return (
    <>
      <div className="rounded-lg bg-gray-800 text-white shadow-lg">
        <RetirementDetails id={id} />
        <RetirementStartAndEnd id={id} />
        <RetirementTotalWorthGraph id={id} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <InitalAssetsColumn id={id} />
          </div>
          <div>
            <InvestmentsColumn id={id} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <IncomeColumn id={id} />
          </div>
          <div>
            <ExcpensesColumn id={id} />
          </div>
        </div>
      </div>
    </>
  )
}
