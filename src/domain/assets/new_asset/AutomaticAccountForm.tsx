import { usePlaidLink } from 'react-plaid-link'
import {
  useGetLinkToken,
  useGivePublicAccessToken,
} from '../../integrations/hooks/open_banking_hooks'
import { useEffect, useState } from 'react'
import InitalOpenBankingPopup from '../InitalOpenBankingPopup'

function AutomaticAccountForm({
  onAccessGranted,
}: {
  onAccessGranted: () => void
}) {
  const [showNewAccountPopup, setShowNewAccountPopUp] = useState(false)
  const { data: linkToken, isLoading } = useGetLinkToken()
  const mutation = useGivePublicAccessToken({
    onSuccess: () => {
      setShowNewAccountPopUp(true)
    },
  })
  if (showNewAccountPopup) {
    // make sure you set it to false
    return <InitalOpenBankingPopup onClose={() => onAccessGranted()} />
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (linkToken) {
    const config = {
      onSuccess: (public_token: string) => {
        mutation.mutate(public_token)
      },
      onExit: (err) => {
        console.log(err)
      },
      onEvent: (eventName) => {
        console.log(eventName)
      },
      token: linkToken,
    }
    return <PlaidLink config={config} />
  }
  return <div>Something went wrong</div>
}
function PlaidLink({
  config,
}: {
  config: {
    onSuccess: (public_token: string) => void
    onExit: (err: any) => void
    onEvent: (eventName: string) => void
    token: string
  }
}) {
  const { open, ready, error } = usePlaidLink(config)
  useEffect(() => {
    if (ready) {
      open()
    }
  }, [ready, open])

  if (error) {
    return <div>Something went wrong</div>
  }
  return <></>
}

export default AutomaticAccountForm
