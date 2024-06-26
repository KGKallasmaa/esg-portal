export const CashflowQueries = {
  TransactionCategories: (start, end) => ['transaction-categories', start, end],
  Cashflow: (start, end) => ['cashflow', start, end],
  SingleCategoryCashflow: (category, start, end) => [
    'cashflow',
    category,
    start,
    end,
  ],
}
