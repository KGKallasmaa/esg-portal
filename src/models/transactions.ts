import Money from './money'

namespace Transactions {
  export type HoldingType = 'ACCOUNTS' | 'SECURITIES'

  export type Location = {
    address?: string
    city?: string
    region?: string
    postalCode?: string
    country?: string
    lat?: number
    lon?: number
    storeNumber?: string
  }

  export type Transaction = {
    id: string
    thirdPartyId: string
    accountId: string
    date: string
    money: Money.MoneyValue
    categories: string[]
    location: Location
    name: string
    merchantName?: string
    paymentChannel: string
    personalFinanceCategory: {
      primary: string
      detailed: string
    }
    accountOwner: any
    transactionType?: string
    isIncome: boolean

    includeInAnalysis: boolean
    highlight: boolean
  }

  export type ConfidenceLevel =
    | 'VERY_HIGH'
    | 'high'
    | 'medium'
    | 'low'
    | 'unknown'

  export type RecurringTransactionStatus =
    | 'MATURE'
    | 'EARLY_DETECTION'
    | 'TOMBSTONED'
    | 'UNKNOWN'
  export type TransactionFrequency =
    | 'UNKNOWN'
    | 'WEEKLY'
    | 'BIWEEKLY'
    | 'SEMI_MONTHLY'
    | 'MONTHLY'
    | 'QUARTERLY'
    | 'ANNUALLY'

  export type RecurringTransaction = {
    id: string
    thirdPartyId: string
    accountId: string
    isIncome: boolean
    description: string
    merchantName: string
    personalFinanceCategory: {
      primary: string
      detailed: string
      confidenceLevel: ConfidenceLevel
    }
    firstDate: string
    lastDate: string
    frequency: TransactionFrequency
    transactionIds: string[]
    averageAmount: Money.MoneyValue
    lastAmount: Money.MoneyValue
    isActive: boolean
    status: RecurringTransactionStatus
    isUserModified: boolean
    lastUserModifiedDatetime?: string
    isVisible: boolean
  }
}
export default Transactions
