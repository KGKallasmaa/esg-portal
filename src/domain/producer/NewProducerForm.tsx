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
import { useNewProducer } from './hooks/producer_hooks'

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(50, { message: 'Name must be at most 50 characters.' }),
})

export default function NewProducerForm({ onClose }: { onClose: () => void }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const newProducerMutation = useNewProducer()

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newProducerRequest = {
      name: values.name,
    }
    newProducerMutation.mutate(newProducerRequest, {
      onSuccess: () => {
        toast.success('New producer created successfully.')
        onClose()
      },
      onError: () => {
        toast.error('Failed to create new producer. Please try again.')
      },
    })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Coca-Cola" {...field} />
              </FormControl>
              <FormDescription>What&apos;s your producer name?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <AlertDialogFooter>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </AlertDialogFooter>
      </form>
    </Form>
  )
}
