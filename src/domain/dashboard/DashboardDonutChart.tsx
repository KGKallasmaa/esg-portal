import usePortfolioStore from '../../state_management/stores/portfolio.store'
import PortfolioDoughnutChart from '../portfolio/PortfolioDoughnutChart'
import { useGetPortfolioValue } from '../portfolio/hooks/portfolio_hooks'
import { calculateAppropriateDates } from '../portfolio/time_horizon'

const DashboardDoughnutChart = () => {
  const { portfolioTimeHorizon } = usePortfolioStore()
  const { start, end } = calculateAppropriateDates(portfolioTimeHorizon)

  const period = {
    start,
    end,
    timeHorizon: portfolioTimeHorizon,
  }
  const holdingTypes = ['SECURITIES', 'ACCOUNTS']

  const { data: portfolio } = useGetPortfolioValue(
    period,
    // @ts-ignore
    holdingTypes
  )
  console.log(portfolio?.total?.totals)

  const portfolioData = []
  if (portfolio?.total?.totals.securities) {
    // @ts-ignore
    portfolioData.push({
      name: 'Securities',
      value: portfolio?.total?.totals.securities,
    })
  }
  if (portfolio?.total?.totals.accounts) {
    // @ts-ignore
    portfolioData.push({
      name: 'Accounts',
      value: portfolio?.total?.totals.accounts,
    })
  }

  return (
    <PortfolioDoughnutChart
      label="Portfolio composision"
      items={portfolioData}
    />
  )
}
export default DashboardDoughnutChart
