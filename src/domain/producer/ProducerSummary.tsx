import { PlusIcon } from '@heroicons/react/24/outline'
import LoadingCard from '../../components/LoadingCard'
import { formatNumber } from '../money/money'
import { useGetProducer } from './hooks/producer_hooks'
import UpdateProducerEmmisionsButton from './UpdateProducerEmissionsButton'

export default function ProducerSummary({ id }: { id: string }) {
  const { data: producer, isLoading, refetch } = useGetProducer(id)
  const noEmissions =
    producer?.emissions === null || producer?.emissions === undefined
  console.log('producer', producer)
  console.log('noEmissions', noEmissions)

  const stats = [
    {
      name: 'Scope1',
      stat: {
        unit: 'kgCo2e',
        value: producer?.emissions?.scope1.co2e.value || 0,
      },
    },
    {
      name: 'Scope2',
      stat: {
        unit: 'kgCo2e',
        value: producer?.emissions?.scope2.co2e.value || 0,
      },
    },
    {
      name: 'Scope3',
      stat: {
        unit: 'kgCo2e',
        value: producer?.emissions?.scope3.co2e.value || 0,
      },
    },
  ]

  if (isLoading) {
    return (
      <>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Emmisions
            </h1>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <LoadingCard count={3} />
        </dl>
      </>
    )
  }
  if (noEmissions) {
    return (
      <>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Emmisions
            </h1>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="text-center">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="mx-auto h-12 w-12 text-gray-400"
            >
              <path
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              No emmisions
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding emmisions data
            </p>
            <div className="mt-6">
              <UpdateProducerEmmisionsButton
                onUpdated={() => refetch}
                producerId={id}
              />
            </div>
          </div>
        </dl>
      </>
    )
  }

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Emmisions
          </h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <UpdateProducerEmmisionsButton
            onUpdated={() => refetch}
            producerId={id}
          />
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {isLoading && <LoadingCard count={3} />}
        {noEmissions ? (
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5  sm:p-6">
            <dt className="truncate text-sm font-medium text-gray-500">
              No emissions data
            </dt>
          </div>
        ) : (
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
        )}
      </dl>
    </>
  )
}
