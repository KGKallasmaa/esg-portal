import RetirementCalculator from './RetirementCalculator'
import { useState } from 'react'
import retirementStore from '../../../../state_management/stores/tools/retirement.store'
import { currentAgeAtom } from '../../../../state_management/atoms/tools/retirement.atom'

function CustomiseRetirementAge() {
  const { retirementAge, setRetirementAge, currentAge, lifeExpectancy } =
    retirementStore()
  const [customRetirementAge, setCustomRetirementAge] = useState(retirementAge)

  return (
    <div className="py-10 md:px-6">
      <div className="max-w-3xl text-base leading-7">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
          Customise your retirement age
        </h1>
        <p className="mt-6 text-xl leading-8">
          Changing your retirement age can have a big impact on your retirement.
        </p>
        <div className="relative mb-6">
          <label htmlFor="labels-range-input" className="sr-only">
            Retirement Age range
          </label>
          <input
            id="labels-range-input"
            type="range"
            onChange={(e) => setCustomRetirementAge(Number(e.target.value))}
            value={customRetirementAge}
            min={currentAge}
            max={lifeExpectancy}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
          />
          <span className="absolute -bottom-6 start-0 text-sm text-gray-500 dark:text-gray-400">
            Min ({currentAge})
          </span>
          <span className="absolute -bottom-6 end-0 text-sm text-gray-500 dark:text-gray-400">
            Max ({lifeExpectancy})
          </span>
        </div>
        <div className="mt-10 max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-primary">
            Yearly savings
          </h2>
          <p>
            Retirement age influences the number of years you have to save for
            the required amount It will influence the amount of money
            you&apos;ll have to save every year, to afford the desired
            retirement lifestyle.
          </p>
          <p className="mt-6">
            <RetirementCalculator
              retirementAge={customRetirementAge}
              visibleCharts={['yearlySavings']}
            />
          </p>
        </div>
      </div>
    </div>
  )
}
export default CustomiseRetirementAge
