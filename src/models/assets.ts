import Money from './money'

namespace Assets {
  export type AssetType = 'ACCOUNTS' | 'SECURITIES'

  export type AccountType =
    | 'investment'
    | 'credit'
    | 'depository'
    | 'loan'
    | 'brokerage'
    | 'other'

  export type AccountSubtype =
    | '401a'
    | '401k'
    | '403B'
    | '457b'
    | '529'
    | 'brokerage'
    | 'cash isa'
    | 'crypto exchange'
    | 'education savings account'
    | 'ebt'
    | 'fixed annuity'
    | 'gic'
    | 'health reimbursement arrangement'
    | 'hsa'
    | 'isa'
    | 'ira'
    | 'lif'
    | 'life insurance'
    | 'lira'
    | 'lrif'
    | 'lrsp'
    | 'non-custodial wallet'
    | 'non-taxable brokerage account'
    | 'other'
    | 'other insurance'
    | 'other annuity'
    | 'prif'
    | 'rdsp'
    | 'resp'
    | 'rlif'
    | 'rrif'
    | 'pension'
    | 'profit sharing plan'
    | 'retirement'
    | 'roth'
    | 'roth 401k'
    | 'rrsp'
    | 'sep ira'
    | 'simple ira'
    | 'sipp'
    | 'stock plan'
    | 'thrift savings plan'
    | 'tfsa'
    | 'trust'
    | 'ugma'
    | 'utma'
    | 'variable annuity'
    | 'credit card'
    | 'paypal'
    | 'cd'
    | 'checking'
    | 'savings'
    | 'money market'
    | 'prepaid'
    | 'auto'
    | 'business'
    | 'commercial'
    | 'construction'
    | 'consumer'
    | 'home equity'
    | 'loan'
    | 'mortgage'
    | 'overdraft'
    | 'line of credit'
    | 'student'
    | 'cash management'
    | 'keogh'
    | 'mutual fund'
    | 'recurring'
    | 'rewards'
    | 'safe deposit'
    | 'sarsep'
    | 'payroll'
    | 'null'

  export type SecurityType =
    | 'cash'
    | 'cryptocurrency'
    | 'derivative'
    | 'equity'
    | 'etf'
    | 'fixed income'
    | 'loan'
    | 'mutual fund'
    | 'other'

  export type Asset = {
    id: string
    type: AssetType
    date: string
    metadata: Map<string, any>
  }
  export type Account = Omit<Asset, 'metadata'> & {
    metadata: {
      label: string
      officialName: string | null
      type: AccountType
      subType: AccountSubtype | null
      institutionId: string
    }
  }

  export type Security = Omit<Asset, 'metadata'> & {
    metadata: {
      isin: string
      name: string
      symbol: string
      type: SecurityType
    }
  }

  export type PeriodicAsset = {
    id: string
    assetId: string
    type: AssetType
    start: string
    end: string
    value: Money.MoneyValue
  }
}
export default Assets
