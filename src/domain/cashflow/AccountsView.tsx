import useCashflowStore from '../../state_management/stores/cashflow.store'
import PeriodicHoldingsList from '../holdings/PeriodicHoldingsList'

function AccountsView() {
  // pie chart about the biggest spenders
  // show the budget
  const { cashflowStart, cashflowEnd, cashflowTimeHorizon } = useCashflowStore()

  return (
    <PeriodicHoldingsList
      type={'ACCOUNTS'}
      showTypeName={true}
      period={{
        start: cashflowStart,
        end: cashflowEnd,
        timeHorizon: cashflowTimeHorizon,
      }}
    />
  )
}

export default AccountsView
