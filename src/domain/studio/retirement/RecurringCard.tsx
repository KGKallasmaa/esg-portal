import { categoryEmoji } from './OneTimeCard'

export function RecurringIncomeCard({
  id,
  title,
  description,
  category,
}: {
  id: string
  title: string
  description?: string
  category: string
}) {
  return (
    <li
      key={'recurring-income-' + id}
      className="flex justify-between gap-x-6 py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{categoryEmoji(category)}</span>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"></div>
    </li>
  )
}

export function RecurringExcpenseCard({
  title,
  description,
  category,
}: {
  title: string
  description?: string
  category: string
}) {
  return (
    <li
      key={'recurring-exp-' + title}
      className="flex justify-between gap-x-6 py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{categoryEmoji(category)}</span>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"></div>
    </li>
  )
}

export function RecurringInvestmetsCard({
  title,
  description,
  category,
}: {
  title: string
  description?: string
  category: string
}) {
  return (
    <li
      key={'recurring-exp-' + title}
      className="flex justify-between gap-x-6 py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{categoryEmoji(category)}</span>
        </div>

        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-white">{title}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-400">
            {description}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end"></div>
    </li>
  )
}
