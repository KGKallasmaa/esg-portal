import { isMobile } from 'react-device-detect'
import LoadingCard from '../../components/LoadingCard'
import ProductsTable from '../product/ProductsTable'
import { useGetMyProducers } from './hooks/producer_hooks'
import NewProducerModal from './NewProducerModal'
import ProducerSummary from './ProducerSummary'
import ProducerSummaryLoading from './ProducerSummaryLoading'

export default function DashboardPage() {
  // get my producerts
  let { data: producers, isLoading, refetch } = useGetMyProducers()
  if (isLoading) {
    return (
      <main>
        <div className="md:space-y-4 md:py-4 xl:space-y-20">
          <div className="mx-2 md:mx-8">
            <ProducerSummaryLoading />
          </div>
          <LoadingCard count={isMobile ? 2 : 3} />
        </div>
      </main>
    )
  }
  const nrOfProducers = producers?.length || 0
  if (nrOfProducers === 0) {
    return <NewProducerModal onProducerCreated={() => refetch} />
  }
  switch (nrOfProducers) {
    case 0:
      return <NewProducerModal onProducerCreated={() => refetch} />
    case 1:
      const producerId = producers ? producers[0].id : ''
      return (
        <main>
          <div className="md:space-y-4 md:py-4 xl:space-y-20">
            <div className="mx-2 md:mx-8">
              <ProducerSummary id={producerId} />
            </div>
            <ProductsTable producerId={producerId} />
          </div>
        </main>
      )
    default:
      return 'we only support single producer for now.'
  }
}
