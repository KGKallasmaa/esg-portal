import { useAtom } from 'jotai'
import {
  annualSavingsAtom,
  annualWithdrawalAtom,
  currentAgeAtom,
  currentSavingsAtom,
  inflationRateAtom,
  lifeExpectancyAtom,
  retirementAgeAtom,
  returnRateAtom,
} from '../../atoms/tools/retirement.atom'

const useRetirementStore = () => {
  const [retirementAge, setRetirementAge] = useAtom(retirementAgeAtom)
  const [currentAge, setCurrentAge] = useAtom(currentAgeAtom)
  const [lifeExpectancy, setLifeExpectancy] = useAtom(lifeExpectancyAtom)
  const [annualSavings, setAnnualSavings] = useAtom(annualSavingsAtom)
  const [currentSavings, setCurrentSavings] = useAtom(currentSavingsAtom)
  const [returnRate, setReturnRate] = useAtom(returnRateAtom)
  const [annualWithdrawal, setAnnualWithdrawal] = useAtom(annualWithdrawalAtom)
  const [inflationRate, setInflationRate] = useAtom(inflationRateAtom)

  return {
    retirementAge,
    setRetirementAge,
    lifeExpectancy,
    setLifeExpectancy,
    currentAge,
    setCurrentAge,
    annualSavings,
    setAnnualSavings,
    currentSavings,
    setCurrentSavings,
    returnRate,
    setReturnRate,
    annualWithdrawal,
    setAnnualWithdrawal,
    inflationRate,
    setInflationRate,
  }
}
export default useRetirementStore
