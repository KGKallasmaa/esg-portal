import { formatNumber } from '../money/money'

const stats = [
  {
    name: 'Scope1',
    stat: {
      unit: 'kgCo2e',
      value: 501786 * 1000,
    },
  },
  {
    name: 'Scope2',
    stat: {
      unit: 'kgCo2e',
      value: 457547 * 1000,
    },
  },
  {
    name: 'Scope3',
    stat: {
      unit: 'kgCo2e',
      value: 27426878 * 1000,
    },
  },
]

export default function ProducerSummary({ id }: { id: string }) {
  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Emmisions
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {formatNumber(item.stat.value)} {item.stat.unit}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
