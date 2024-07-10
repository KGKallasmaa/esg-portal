import ProductsTable from '../product/ProductsTable'
import ProducerSummary from './ProducerSummary'

export default function DashboardPage() {
  const [myProducers, setMyProducers] = useState([])
  return (
    <main>
      <div className="md:space-y-4 md:py-4 xl:space-y-20">
        <div className="mx-2 md:mx-8">
          <ProducerSummary id={'123-replace-me'} />
        </div>
        <ProductsTable producerId={'123-replace-me'} />
      </div>
    </main>
  )
}
