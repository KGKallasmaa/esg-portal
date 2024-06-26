import { formatMoney } from '../money/money'
import categoryEmojis from './category_emoji'
import Money from '../../models/money'
import Cashflow from '../../models/cashflow'
import Link from 'next/link'

export const CategoriesList = ({
  showPercentages,
  categories,
}: {
  showPercentages?: boolean
  categories?: Cashflow.CategoryWiseFinancialBreakdown
}) => {
  if (!categories) return null
  return (
    <ul
      role="list"
      className="divide-ydivide-gray-100 overflow-hidden shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {categories.items.map(
        (c: Cashflow.CategoryWiseFinancialBreakdownItem) => (
          <CategoryCard
            key={'cashflow_category_card' + c.category}
            name={c.category}
            spending={c.money}
            percent={showPercentages ? c.percent : undefined}
          />
        )
      )}
    </ul>
  )
}

export function CategoryCard({
  name,
  spending,
  percent,
}: {
  name: string
  spending: Money.MoneyValue
  percent?: number
}) {
  return (
    <Link
      href={`/cashflow/c/${name}`}
      key={'category_' + name}
      className="relative flex justify-between gap-x-6 px-4 py-1 hover:bg-gray-50 dark:hover:bg-gray-900 sm:px-6 md:py-4 lg:py-5"
    >
      <div className="flex min-w-0 gap-x-4">
        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gray-50">
          <span className="text-xl">{categoryEmojis(name)}</span>
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-primary">
            <span className="absolute inset-x-0 -top-px bottom-0 " />
            {name}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <span className="font-semibold">{formatMoney(spending)}</span>
          {percent !== undefined && (
            <p className="ml-3 text-sm text-gray-500">
              {percent < 0.01 ? '<1%' : `${Math.round(percent * 100)}%`}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
