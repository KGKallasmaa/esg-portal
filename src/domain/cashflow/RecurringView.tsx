import { useEffect, useState } from 'react'
import Tabs from '../../components/Tabs'
import useCashflowStore from '../../state_management/stores/cashflow.store'
import { HeadingAndDescription } from './Headings'
import { RecurringTransactionsTable } from './TransactionsTableWithSearch'
import { useGetCashflowInsights } from './hooks/cashflow_hooks'
import Transactions from '../../models/transactions'

function RecurringView() {
  // pie chart about the biggest spenders
  // show the budget
  const [currentTab, setCurrentTab] = useState('income')
  const {
    cashflowStart,
    cashflowEnd,
    refreshRecurringTransactions,
    setRefreshRecurringTransactions,
    transactionCategories,
  } = useCashflowStore()
  let { data: insights, refetch } = useGetCashflowInsights(
    cashflowStart,
    cashflowEnd,
    transactionCategories
  )

  useEffect(() => {
    if (refreshRecurringTransactions) {
      refetch
      setRefreshRecurringTransactions(false)
    }
  }, [refreshRecurringTransactions])

  if (!insights) return null

  const incomeRecurringTransacttions =
    insights?.breakdown?.income.recurringTransactions || []
  const expensesRecurringTransacttions =
    insights?.breakdown?.expenses.recurringTransactions || []

  console.log(incomeRecurringTransacttions)

  return (
    <>
      <HeadingAndDescription heading={'Recuring payments'} description={''} />
      <>
        <Tabs
          setCurrentTab={setCurrentTab}
          tabs={[
            {
              label: 'Incoming',
              value: 'income',
              isCurrent: currentTab === 'income',
            },
            {
              label: 'Outgoing',
              value: 'outgoing',
              isCurrent: currentTab === 'outgoing',
            },
          ]}
        />
        <div className="flex flex-col">
          {currentTab === 'income' && (
            <div className="">
              <IncomingRecurringTransactions
                transactions={incomeRecurringTransacttions}
              />
            </div>
          )}
          {currentTab === 'expenses' && (
            <div className="">
              <ExcpensesRecurringTransactions
                transactions={expensesRecurringTransacttions}
              />
            </div>
          )}
        </div>
      </>
    </>
  )
}

function IncomingRecurringTransactions({
  transactions,
}: {
  transactions: Transactions.RecurringTransaction[]
}) {
  return (
    <RecurringTransactionsTable
      useAbsTransactionValue={true}
      transactions={transactions}
    />
  )
}

function ExcpensesRecurringTransactions({
  transactions,
}: {
  transactions: Transactions.RecurringTransaction[]
}) {
  return (
    <RecurringTransactionsTable
      useAbsTransactionValue={false}
      transactions={transactions}
    />
  )
}

export default RecurringView
