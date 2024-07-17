import { useForm } from 'react-hook-form'
import {
  useGetProducer,
  useUpdateProducerEmmisions,
} from './hooks/producer_hooks'
import toast from 'react-hot-toast'
import Modal from '../../components/Modal'
import { useState } from 'react'
import { PlusSmallIcon } from '@heroicons/react/24/outline'

export default function UpdateProducerEmmisionsButton({
  producerId,
  onUpdated,
}: {
  producerId: string
  onUpdated: () => void
}) {
  const [showModal, setShowModal] = useState(false)

  if (showModal) {
    return (
      <Modal
        title={`Update producer emissions`}
        backgroundColor="bg-white"
        border="border border-primary"
        closable={true}
        onClose={() => onUpdated()}
      >
        <UpdateProducerEmmisionsCard
          producerId={producerId}
          onClose={() => {
            onUpdated()
          }}
        />
      </Modal>
    )
  }

  return (
    <button
      onClick={() => setShowModal(!showModal)}
      className="ml-auto flex items-center gap-x-1 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-darker focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <PlusSmallIcon className="-ml-1.5 h-5 w-5" aria-hidden="true" />
      Update emissions
    </button>
  )
}

function UpdateProducerEmmisionsCard({
  producerId,
  onClose,
}: {
  producerId: string
  onClose: () => void
}) {
  const { data: producer } = useGetProducer(producerId)
  const updateEmmisionsMutation = useUpdateProducerEmmisions()

  const noEmissions =
    producer?.emissions === null || producer?.emissions === undefined

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      scope1: noEmissions
        ? 0
        : producer?.emissions
        ? producer?.emissions.scope1.co2e.value
        : 0 || 0,
      scope2: noEmissions
        ? 0
        : producer?.emissions
        ? producer?.emissions.scope2.co2e.value
        : 0 || 0,
      scope3: noEmissions
        ? 0
        : producer?.emissions
        ? producer?.emissions.scope3.co2e.value
        : 0 || 0,
    },
  })

  const onSubmit = async (data) => {
    const updateEmmisionsReq = {
      id: producerId,
      scope1_value: parseFloat(data.scope1),
      scope2_value: parseFloat(data.scope2),
      scope3_value: parseFloat(data.scope3),
    }
    updateEmmisionsMutation.mutate(updateEmmisionsReq, {
      onSuccess: (producerValue) => {
        console.log('producerValue', producerValue)
        toast.success('Emmisions updated')
        onClose()
        reset()
      },
      onError: () => {
        toast.error('Failed to update emmisions. Please try again.')
      },
    })
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-lg font-bold">Producer emmisions</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mt-4 block text-gray-700">Scope1</label>
            <input
              type="number"
              placeholder="Scope1 emmisions in kgCo2e"
              className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              {...register('scope1', {
                min: { value: 0, message: 'Value can not be negative' },
              })}
            />
            {errors.scope1 && (
              <p className="text-red-500">
                {errors.scope1.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label className="mt-4 block text-gray-700">Scope2</label>
            <input
              type="number"
              placeholder="Scope2 emmisions in kgCo2e"
              className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              {...register('scope2', {
                min: { value: 0, message: 'Value can not be negative' },
              })}
            />
            {errors.scope2 && (
              <p className="text-red-500">
                {errors.scope2.message?.toString()}
              </p>
            )}
          </div>
          <div>
            <label className="mt-4 block text-gray-700">Scope3</label>
            <input
              type="number"
              placeholder="Scope3 emmisions in kgCo2e"
              className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              {...register('scope3', {
                min: { value: 0, message: 'Value can not be negative' },
              })}
            />
            {errors.scope3 && (
              <p className="text-red-500">
                {errors.scope3.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex p-2">
            <div className="flex w-1/2 justify-end">
              <button
                onClick={() => {
                  onClose()
                  reset()
                }}
                type="button"
                className="w-auto rounded bg-gray-500 p-2 text-sm text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-6 w-auto rounded bg-primary p-2 text-lg text-white"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
