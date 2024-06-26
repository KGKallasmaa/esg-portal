import classNames from 'classnames'
import useCashflowStore from '../../state_management/stores/cashflow.store'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
]
const oneYear = 365 * 24 * 60 * 60 * 1000

function PeriodSwitcher({ showCategoryDropdown = false }) {
  const {
    cashflowStart,
    cashflowEnd,
    setCashflowStart,
    setCashflowEnd,
    transactionCategories,
    setTransactionCategories,
  } = useCashflowStore()

  const handleMonthChange = (direction: number) => {
    if (direction === 1) {
      const newDate = new Date(cashflowEnd)
      newDate.setMonth(newDate.getMonth() + 1)
      setCashflowStart(new Date(cashflowEnd))
      setCashflowEnd(newDate)
    } else {
      const newDate = new Date(cashflowStart)
      newDate.setMonth(newDate.getMonth() - 1)
      setCashflowEnd(new Date(cashflowStart))
      setCashflowStart(newDate)
    }
  }

  const handleCategoryChange = (category: string) => {
    if (transactionCategories.includes(category)) {
      setTransactionCategories(
        transactionCategories.filter((item) => item !== category)
      )
    } else {
      setTransactionCategories([...transactionCategories, category])
    }
  }

  const isPrevMonthDisabled =
    new Date().getTime() - cashflowStart.getTime() > 2 * oneYear
  const isNextMonthDisabled = cashflowEnd > new Date()

  return (
    <div className="m-2 flex items-center justify-between md:mx-0 md:mt-0">
      <button
        aria-label="Previous month"
        disabled={isPrevMonthDisabled}
        onClick={() => handleMonthChange(-1)}
        className={classNames('rounded bg-primary px-4 py-2 text-white', {
          'opacity-50': isPrevMonthDisabled,
        })}
      >
        Prev
      </button>
      <span className="text-gray-500 dark:text-white">
        {months[cashflowStart.getMonth()]} {cashflowStart.getFullYear()}
      </span>
      {showCategoryDropdown && (
        <select
          className="rounded bg-blue-700 px-4 py-2 text-white"
          value="All Categories"
        >
          {transactionCategories &&
            transactionCategories.map((category) => (
              <option
                onClick={() => handleCategoryChange(category)}
                selected={transactionCategories.includes(category)}
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
        </select>
      )}
      <button
        aria-label="Next month"
        disabled={isNextMonthDisabled}
        onClick={() => handleMonthChange(1)}
        className={classNames('rounded bg-primary px-4 py-2 text-white', {
          'opacity-50': isNextMonthDisabled,
        })}
      >
        Next
      </button>
    </div>
  )
}

export default PeriodSwitcher
