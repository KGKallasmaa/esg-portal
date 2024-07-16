import Modal from '../../components/Modal'
import NewProducerCard from './NewProducerCard'

export default function NewProducerModal({
  onProducerCreated,
}: {
  onProducerCreated: () => void
}) {
  return (
    <Modal
      title={`New producer`}
      backgroundColor="bg-white"
      border="border border-primary"
      closable={true}
      onClose={() => onProducerCreated()}
    >
      <NewProducerCard
        onClose={() => {
          onProducerCreated()
        }}
      />
    </Modal>
  )
}
