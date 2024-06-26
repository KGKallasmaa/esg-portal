import { useGetOpenBankingStatus } from '../integrations/hooks/open_banking_hooks'
import LoadingOverlay from '../../components/modals/LoadingOverLay'
import toast from 'react-hot-toast'

function InitalOpenBankingPopup({ onClose }: { onClose: () => void }) {
  const { data } = useGetOpenBankingStatus()
  if (data) {
    if (data.status === 'active' || data.status === 'first-sync') {
      toast.success('Syncing complete')
      onClose()
      return null
    }
    if (data.status == 'failed') {
      toast.error('Something went wrong')
      return null
    }
    if (data.status == 'sync') {
      return <LoadingOverlay text="Syncing..." />
    }
  }
  return <LoadingOverlay text="Loading..." />
}
export default InitalOpenBankingPopup
