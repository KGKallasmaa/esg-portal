import Assets from '../../models/assets'
/*
export function AssetCard({ asset }: { asset: Assets.Asset }) {
  console.log('AssetCard', asset)
  // TODO: fix this
  const { data: holding } = useGetHoldingByID('FAKE_HOLDING_ID')
  if (!holding) {
    return null
  }
  const { type } = holding
  switch (type) {
    case 'SECURITIES':
      return 'SHOW ME THE SECURITY'
    //   return <StockCard holding={holding} asset={asset} />
    default:
      console.error('unknown asset type', type)
      return null
  }
}
export function AssetCards({ assets }: { assets: Assets.Asset[] }) {
  return (
    <>
      {assets.map((asset) => {
        return <AssetCard key={'asset-card-' + asset.id} asset={asset} />
      })}
    </>
  )
}
/*
function StockCard({
  holding,
  asset,
}: {
  holding: Holdings.Holding
  asset: Assets.Security
}) {
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const { metadata:{} } = asset

  const { metadata } = holding
  const symbol = metadata.symbol || ''

  const dateDiff = new Date(purchaseDate).getTime() - new Date().getTime()

  const locale = navigator.language || 'en-US'
  const formatter = new Intl.RelativeTimeFormat(locale)
  const nrOfDaysSincePurchase = formatter.format(
    Math.round(dateDiff / 100_000_000),
    'days'
  )

  return (
    <>
      <li
        onClick={toggleExpanded}
        key={'stock_' + symbol}
        className="relative flex justify-between gap-x-6 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 sm:px-6 md:py-4 lg:py-5"
      >
        <div className="flex min-w-0 gap-x-4">
          <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gray-50">
            <StockIcon ticker={symbol} />
          </div>
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-primary">
              <span className="absolute inset-x-0 -top-px bottom-0 " />
              {STOCK_INFO[symbol].name}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-x-4">
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm font-bold leading-6 text-gray-900 dark:text-gray-300">
              {quantity.toLocaleString()} x {formatMoney(price, 2)}
            </p>
          </div>
        </div>
        <p className="mt-1 text-xs leading-5 text-gray-500">
          <time dateTime={purchaseDate}>{nrOfDaysSincePurchase}</time>
        </p>
      </li>
    </>
  )
}
*/
