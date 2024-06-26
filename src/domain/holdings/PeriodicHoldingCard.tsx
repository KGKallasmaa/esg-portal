import Holdings from '../../models/holdings'
import { useGetHoldingById } from './hooks/holdings_hooks'
import { useGetAssetById } from '../assets/hooks/assets_hooks'
import PeriodicSecurityCard from './PeriodicSecurityCard'
import { PeriodicAccountCard } from './PeriodicAccountCard'

function PeriodicHoldingCard({
  periodicHolding,
}: {
  periodicHolding: Holdings.PeriodicHolding
}) {
  const { data: holding } = useGetHoldingById(periodicHolding.holdingId)
  const { data: asset } = useGetAssetById(holding?.assetId || '')
  if (holding == null) {
    return null
  }

  if (asset == null) {
    return null
  }

  switch (periodicHolding.type) {
    case 'ACCOUNTS':
      // TODO: add support for accounts in list
      return (
        <PeriodicAccountCard
          periodicAccount={periodicHolding}
          // @ts-ignore
          asset={asset}
          holding={holding}
        />
      )
    case 'SECURITIES':
      // TODO: add support for securities in grid

      return (
        <PeriodicSecurityCard
          periodicSecurity={periodicHolding}
          // @ts-ignore
          asset={asset}
          holding={holding}
        />
      )
    default:
      console.error('Unknown periodic holding type: ' + periodicHolding.type)
      return null
  }
}

export default PeriodicHoldingCard
