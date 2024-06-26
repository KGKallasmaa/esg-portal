import { isMobile } from 'react-device-detect'
import Portfolio from '../../models/portfolio'
import usePortfolioStore from '../../state_management/stores/portfolio.store'

const PeriodSwitch = ({
  domain,
}: {
  domain: 'SECURITIES' | 'ACCOUNTS' | 'ALL'
}) => {
  const {
    getHoldingTimeHorizon,
    setHoldingTimeHorizon,
    portfolioTimeHorizon,
    setPortfolioTimeHorizon,
  } = usePortfolioStore()
  const holdingTimeHorizon =
    domain === 'ALL' ? portfolioTimeHorizon : getHoldingTimeHorizon(domain)
  const secondaryNavigation = [
    {
      name: isMobile ? 'W' : 'Week',
      value: 'week',
      current: holdingTimeHorizon === 'week',
    },
    {
      name: isMobile ? 'M' : 'Month',
      value: 'month',
      current: holdingTimeHorizon === 'month',
    },
    {
      name: isMobile ? 'Q' : 'Quarter',
      value: 'quarter',
      current: holdingTimeHorizon === 'quarter',
    },
    { name: 'YTD', value: 'ytd', current: holdingTimeHorizon === 'ytd' },
    { name: 'ALL', value: 'all', current: holdingTimeHorizon === 'all' },
  ]
  const handleHorizonChange = (value: Portfolio.TimeHorizon) => {
    if (domain === 'ALL') {
      setPortfolioTimeHorizon(value)
    } else {
      setHoldingTimeHorizon(domain, value)
    }
  }

  return (
    <div className="order-last flex w-full gap-x-8 text-sm font-semibold leading-6 sm:order-none sm:w-auto sm:pl-6 sm:leading-7">
      {secondaryNavigation.map((item) => (
        <button
          key={item.name}
          onClick={() =>
            handleHorizonChange(item.value as Portfolio.TimeHorizon)
          }
          className={
            item.value === holdingTimeHorizon
              ? 'dark:text-primary-300 text-primary'
              : 'text-gray-700 dark:text-gray-300'
          }
        >
          {item.name}
        </button>
      ))}
    </div>
  )
}

export default PeriodSwitch
