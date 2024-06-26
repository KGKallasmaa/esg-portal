import {
  accountsTimeHorizonAtom,
  portfolioTimeHorizonAtom,
  stocksTimeHorizonAtom,
} from '../atoms/portfolio.atom'
import { useAtom } from 'jotai'
import Portfolio from '../../models/portfolio'
import Assets from '../../models/assets'

const usePortfolioStore = () => {
  const [portfolioTimeHorizon, setPortfolioTimeHorizon] = useAtom(
    portfolioTimeHorizonAtom
  )

  const [stockTimeHorizon, setStocksTimeHorizon] = useAtom(
    stocksTimeHorizonAtom
  )
  const [accountsTimeHorizon, setAccountsTimeHorizon] = useAtom(
    accountsTimeHorizonAtom
  )

  const setHoldingTimeHorizon = (
    holding: Assets.AssetType,
    timeHorizon: Portfolio.TimeHorizon
  ) => {
    switch (holding) {
      case 'SECURITIES':
        setStocksTimeHorizon(timeHorizon)
        break
      case 'ACCOUNTS':
        setAccountsTimeHorizon(timeHorizon)
        break
      default:
        break
    }
  }
  const getHoldingTimeHorizon = (holding: Assets.AssetType) => {
    switch (holding) {
      case 'SECURITIES':
        return stockTimeHorizon
      case 'ACCOUNTS':
        return accountsTimeHorizon
      default:
        return 'all'
    }
  }

  return {
    getHoldingTimeHorizon,
    portfolioTimeHorizon,
    setPortfolioTimeHorizon,
    setHoldingTimeHorizon,
  }
}
export default usePortfolioStore
