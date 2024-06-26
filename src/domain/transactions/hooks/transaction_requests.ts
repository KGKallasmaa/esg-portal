export type TransactionUpdateRequest = {
  name?: string | null
  date?: Date | null
  category?: string | null
  highlight?: boolean | null
  includeInAnalysis?: boolean | null
}

export type TransactionsFilter = {
  start: Date
  end: Date
  category?: string
  accountIds?: string[]
}
