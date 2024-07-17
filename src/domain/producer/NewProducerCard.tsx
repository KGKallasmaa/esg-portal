import { useForm } from 'react-hook-form'
import { useNewProducer } from './hooks/producer_hooks'
import toast from 'react-hot-toast'

export default function NewProducerCard({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const newProducerMutation = useNewProducer()

  const onSubmit = async (data: { name: string }) => {
    const newProducerRequest = {
      name: data.name,
    }
    newProducerMutation.mutate(newProducerRequest, {
      onSuccess: () => {
        toast.success('New producer created successfully.')
        onClose()
        reset()
      },
      onError: () => {
        toast.error('Failed to create new producer. Please try again.')
      },
    })
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-lg font-bold">New producer</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mt-4 block text-gray-700">Name</label>
          <input
            type="text"
            placeholder="e.g. Coca-Cola"
            className="block w-full rounded-md border-gray-300 text-black shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
            {...register('name', {
              required: 'Name is required.',
              minLength: { value: 3, message: 'Name is too short.' },
              maxLength: { value: 50, message: 'Name is too long.' },
            })}
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message?.toString()}</p>
          )}

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
