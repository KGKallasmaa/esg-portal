import classNames from 'classnames'
import { formatMoney } from '../money/money'
import Money from '../../models/money'

const changeTypeColor = new Map([
  ['positive', 'text-green-700 dark:text-green-300'],
  ['negative', 'text-rose-600 dark:text-rose-300'],
  ['neutral', 'text-gray-500 dark:text-gray-400'],
])

type MetricProps = {
  index: number
  stat: {
    name: string
    onClick?: () => void
    hide?: boolean
    highlight: boolean
    value: Money.MoneyValue | undefined
    change: number | undefined
    changeType: 'positive' | 'negative' | 'neutral'
  }
}

const Metric = ({ index, stat }: MetricProps) => {
  if (stat.change) {
    return (
      <div
        onClick={stat.onClick}
        key={stat.name}
        className={classNames(
          index % 2 === 1
            ? 'sm:border-l dark:sm:border-gray-700'
            : index === 2
            ? 'lg:border-l dark:lg:border-gray-700'
            : '',
          stat.hide ? 'opacity-30' : '',
          'flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 border-t border-gray-900/5 px-4 py-8 dark:border-gray-700/5 sm:px-6 lg:border-t-0 xl:px-8'
        )}
      >
        <dt
          className={classNames(
            'text-sm font-medium leading-6 text-gray-500 dark:text-gray-400',
            stat.highlight
              ? 'dark:text-primary-300 text-primary'
              : 'dark:hover:text-primary-300 text-gray-500 underline hover:text-primary'
          )}
        >
          {stat.name}
        </dt>
        {stat.change && (
          <StatChange changeType={stat.changeType} change={stat.change} />
        )}

        <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900 dark:text-gray-200">
          {formatMoney(stat.value)}
        </dd>
      </div>
    )
  }
  return (
    <div
      onClick={stat.onClick}
      key={stat.name}
      className={classNames(
        index % 2 === 1
          ? 'sm:border-l dark:sm:border-gray-700'
          : index === 2
          ? 'lg:border-l dark:lg:border-gray-700'
          : '',
        stat.hide ? 'opacity-30' : '',
        'flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 border-t border-gray-900/5 px-4 py-8 dark:border-gray-700/5 sm:px-6 lg:border-t-0 xl:px-8'
      )}
    >
      <dt
        className={classNames(
          'text-sm font-medium leading-6 text-gray-500 dark:text-gray-400',
          stat.highlight
            ? 'dark:text-primary-300 text-primary'
            : 'dark:hover:text-primary-300 text-gray-500 underline hover:text-primary'
        )}
      >
        {stat.name}
      </dt>
      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900 dark:text-gray-200">
        {formatMoney(stat.value)}
      </dd>
    </div>
  )
}

function StatChange(stat: {
  changeType: 'positive' | 'negative' | 'neutral'
  change: number
}) {
  const startNr = 100 * stat.change
  return (
    <dd
      className={classNames(
        'text-xs font-medium',
        changeTypeColor.get(stat.changeType), // Ensure changeTypeColor supports dark mode variants
        'dark:text-gray-300' // Example adjustment, customize based on your needs
      )}
    >
      {startNr.toFixed(2)}%
    </dd>
  )
}

export default Metric
