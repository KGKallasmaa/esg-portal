import { useState } from 'react'
import Modal from '../../components/Modal'
import NewAssetChoiseForm from '../assets/new_asset/NewAssetChoiceForm'

const AddFirstHolding = ({
  title,
  description,
}: {
  title: string
  description: string
}) => {
  const [showModal, setShowModal] = useState(false)

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
        <NewAssetChoiseForm onClose={() => setShowModal(false)} />
      </Modal>
    )
  }

  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  )
}
export default AddFirstHolding
