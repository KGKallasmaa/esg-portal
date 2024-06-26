import { TransactionsFilter } from './transaction_requests'

export const TransactionQueries = {
  Transactions: (filter: TransactionsFilter) => ['transactions', filter],
  Transaction: (id) => ['transactions', id],
}
