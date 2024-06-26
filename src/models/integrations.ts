import Transactions from './transactions'

namespace Integrations {
  export type GroupedTransactions = {
    transactions: {
      date: string
      transactions: Transactions.Transaction[]
    }[]
  }
}
export default Integrations
