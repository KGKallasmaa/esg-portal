import Assets from '../../../models/assets'
import { StockIcon } from '../../assets/media/stock_icons'
import { stockInfo } from '../../assets/media/stock_info'

const CASH = () => {
  return null
}
const EQUITY = () => {
  return null
}
const MutualFund = () => {
  return null
}

const ETF = () => {
  return null
}

const Derivative = () => {
  return null
}

export const securityTypeToIconMap = {
  cash: CASH,
  equity: EQUITY,
  mutial_fund: MutualFund,
  etf: ETF,
  derivative: Derivative,
}
export const SecurityIcon = ({
  ticker,
  securityType,
  className,
}: {
  ticker: string
  securityType: Assets.SecurityType
  className?: string
}) => {
  if (stockInfo[ticker]) {
    return <StockIcon ticker={ticker} className={className} />
  }
  if (!securityTypeToIconMap[securityType]) {
    console.error(`No icon found for security type ${securityType}`)
  }
  if (className) {
    if (!securityTypeToIconMap[ticker]) {
      return <div className={className}></div>
    }
    return <div className={className}>{securityTypeToIconMap[ticker]()}</div>
  }
  if (!securityTypeToIconMap[ticker]) {
    return <div className={className}></div>
  }
  return <>{securityTypeToIconMap[ticker]()}</>
}
