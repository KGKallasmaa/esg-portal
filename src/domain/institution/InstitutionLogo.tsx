import { useGetAssetById } from '../assets/hooks/assets_hooks'
import { useGetInstitution } from './hooks/institutions_hooks'

export default function InstitutionLogo({ accountId }: { accountId: string }) {
  const { data: account } = useGetAssetById(accountId)
  if (!account) return null
  const institutionId = account.metadata['institutionId']
  if (institutionId) {
    return <Logo institutionId={institutionId} />
  }
  return null
}
function Logo({ institutionId }: { institutionId: string | undefined }) {
  const { data } = useGetInstitution(institutionId)
  if (!data) return null
  if (!data.logo) return null
  return (
    <img className="h-6 w-6" src={'data:image/jpeg;base64,' + data.logo}></img>
  )
}
