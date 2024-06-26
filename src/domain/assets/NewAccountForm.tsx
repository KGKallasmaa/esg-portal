import {
  useGetLinkToken,
  useGivePublicAccessToken,
} from '../integrations/hooks/open_banking_hooks'
import { usePlaidLink } from 'react-plaid-link'
import { PlusSmallIcon } from '@heroicons/react/20/solid'

function NewAccountForm({ onAccessGranted }: { onAccessGranted: () => void }) {
  const { data: linkToken, isLoading } = useGetLinkToken()
  const mutation = useGivePublicAccessToken({
    onSuccess: () => {
      onAccessGranted()
    },
  })
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!linkToken) {
    return <div>Something went wrong</div>
  }
  return (
    <AccountConnectForm
      linkToken={linkToken}
      onPublicTokenGranted={(public_token: string) => {
        mutation.mutate(public_token)
      }}
    />
  )
}
function AccountConnectForm({
  linkToken,
  onPublicTokenGranted,
}: {
  linkToken: string
  onPublicTokenGranted: (token: string) => void
}) {
  const config = {
    onSuccess: (public_token: string) => {
      onPublicTokenGranted(public_token)
    },
    onExit: (err) => {
      console.log(err)
    },
    onEvent: (eventName) => {
      console.log(eventName)
    },
    token: linkToken,
  }
  const { open } = usePlaidLink(config)

  const onClick = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    open()
  }

  return (
    <button
      onClick={onClick}
      className="ml-auto flex items-center gap-x-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
      Connect Account
    </button>
  )
}

export default NewAccountForm
