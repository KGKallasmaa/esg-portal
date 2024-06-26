import { Dialog, Transition } from '@headlessui/react'
import { ShareIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { SocialIcon } from 'react-social-icons'

export function ShareButton({
  url,
  title,
  text,
}: {
  url: string
  title?: string
  text?: string
}) {
  const navigatorShareIsAvailable = navigator.share !== undefined
  const [showShareModal, setShowShareModal] = useState(false)
  const onShare = () => {
    if (navigatorShareIsAvailable) {
      navigator.share({
        title,
        text,
        url,
      })
    } else {
      setShowShareModal(true)
    }
  }
  if (showShareModal) {
    return <ShareModal url={url} />
  }
  return (
    <button
      type="button"
      onClick={onShare}
      className="h-10 w-10 rounded-full text-gray-400 hover:text-gray-500"
    >
      <ShareIcon className="h-5 w-5" />
    </button>
  )
}
export function Share({
  url,
  title,
  text,
}: {
  url: string
  title?: string
  text?: string
}) {
  if (navigator.share === undefined) {
    return <ShareModal url={url} title={title} text={text} />
  }
  navigator
    .share({
      title,
      text,
      url,
    })
    .catch((error) => {
      console.error(error)
      return <ShareModal url={url} title={title} text={text} />
    })
}
function ShareModal({
  url,
  title,
  text,
}: {
  url: string
  title?: string
  text?: string
}) {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Share it with your friends
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="grid grid-cols-4 gap-4">
                        <SocialShare provider="facebook" url={url} />
                        <SocialShare provider="twitter" url={url} />
                        <SocialShare
                          provider="whatsapp"
                          url={url}
                          title={title}
                          text={text}
                        />
                        <SocialShare provider="linkedin" url={url} />
                      </div>
                    </div>
                    <div className="mt-5">
                      <AddToClipboardButton url={url} />
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function SocialShare({
  provider,
  url,
  title,
  text,
}: {
  provider: string
  url: string
  title?: string
  text?: string
}) {
  switch (provider) {
    case 'twitter':
      return <SocialIcon url={`https://twitter.com/intent/tweet?url=${url}`} />
    case 'whatsapp':
      const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        //@ts-ignore
        title
      )}%0A${encodeURIComponent(
        //@ts-ignore
        text
      )}%0A${encodeURIComponent(url)}`
      return <SocialIcon bgColor="#25D366" url={shareUrl} />
    case 'linkedin':
      return (
        <SocialIcon
          bgColor="#0A66C2"
          url={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        />
      )
    default:
      return null
  }
}

function AddToClipboardButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false)
  const handleClick = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
  }
  if (copied) {
    return <div className="text-yellow-500">Copied to clipboard</div>
  }
  return (
    <div className="text-gray-500" onClick={handleClick}>
      Add to Clipboard
    </div>
  )
}
