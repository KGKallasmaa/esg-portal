import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { AlertDialogFooter } from '../../components/ui/alert-dialog'
import { Button } from '../../components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form'
import { Input } from '../../components/ui/input'
import {
  useGetProducer,
  useUpdateProducerDetails,
} from './hooks/producer_hooks'

const formSchema = z.object({
  scope1: z.coerce
    .number()
    .min(0, { message: 'Value can not be negative' })
    .max(36_800_000_000_000, { message: 'Your emmisions are too big' }),
  scope2: z.coerce
    .number()
    .min(0, { message: 'Value can not be negative' })
    .max(36_800_000_000_000, { message: 'Your emmisions are too big' }),
  scope3: z.coerce
    .number()
    .min(0, { message: 'Value can not be negative' })
    .max(36_800_000_000_000, { message: 'Your emmisions are too big' }),
})

export default function UpdateProducerDetailsForm({
  producerId,
  onClose,
}: {
  producerId: string
  onClose: () => void
}) {
  const { data: producer } = useGetProducer(producerId)
  const updateDetailsMutation = useUpdateProducerDetails()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scope1: producer?.details?.emissions?.scope1.co2e.value || 0,
      scope2: producer?.details?.emissions?.scope2.co2e.value || 0,
      scope3: producer?.details?.emissions?.scope3.co2e.value || 0,
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    const updateEmmisionsReq = {
      id: producerId,
      scope1_value: values.scope1,
      scope2_value: values.scope2,
      scope3_value: values.scope3,
    }
    updateDetailsMutation.mutate(updateEmmisionsReq, {
      onSuccess: (producerValue) => {
        console.log('producerValue', producerValue)
        toast.success('Emmisions updated')
        onClose()
      },
      onError: () => {
        toast.error('Failed to update emmisions. Please try again.')
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="scope1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scope1</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Scope 1 emmisions in kgCo2E"
                  {...field}
                />
              </FormControl>
              <FormDescription>What are your scope1 emissions?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scope2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scope2</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Scope 2 emmisions in kgCo2E"
                  {...field}
                />
              </FormControl>
              <FormDescription>What are your scope2 emissions?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scope3"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scope3</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Scope 3 emmisions in kgCo2E"
                  {...field}
                />
              </FormControl>
              <FormDescription>What are your scope3 emissions?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}
