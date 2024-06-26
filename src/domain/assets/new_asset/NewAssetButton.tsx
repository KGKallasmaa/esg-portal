import { PlusSmallIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Modal from '../../../components/Modal'
import dynamic from 'next/dynamic'

const NewAssetChoiseForm = dynamic(() => import('./NewAssetChoiceForm'))

const NewAssetButton = () => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    window.location.reload()
  }

  if (showModal) {
    return (
      <Modal
        backgroundColor="bg-white"
        title={'Complete your portfolio'}
        titleColor="text-primary"
        border="border border-primary"
        closable={true}
        onClose={() => setShowModal(false)}
      >
        <NewAssetChoiseForm onClose={() => handleClose()} />
      </Modal>
    )
  }

  return (
    <button
      onClick={() => setShowModal(!showModal)}
      className="ml-auto flex items-center gap-x-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
      Add assets
    </button>
  )
}

export default NewAssetButton
