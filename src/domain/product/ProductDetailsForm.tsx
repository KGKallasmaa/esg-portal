import { zodResolver } from '@hookform/resolvers/zod'
import { memo, useEffect } from 'react'
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
import { useGetProduct, useUpdateProductDetails } from './hooks/product_hooks'

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'Title must be at least 3 characters.' })
    .max(50, { message: 'Title must be at most 100 characters.' }),
  barcode: z
    .string()
    .min(3, { message: 'Barcode must be at least 3 characters.' })
    .max(50, { message: 'Barcode must be at most 50 characters.' }),
  sales_quantity: z.coerce
    .number()
    .min(0, { message: 'Value can not be negative' })
    .max(10_000_000_000, { message: 'Your sales are too big' }),
  sales_value: z.coerce
    .number()
    .min(0, { message: 'Value can not be negative' })
    .max(1_000_000_000_000, { message: 'Your sales are too big' }),
})

function ProductDetailsForm({
  productId,
  onClose,
}: {
  productId: string
  onClose: () => void
}) {
  const updateProductDetailsMutation = useUpdateProductDetails()
  const { data: product, isLoading } = useGetProduct(productId)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: product?.details?.title || '',
      barcode: product?.details?.barcode || '',
      sales_quantity: product?.details?.sales?.quantity || 0,
      sales_value: product?.details?.sales?.value.amount || 0,
    },
  })

  useEffect(() => {
    form.reset({
      title: product?.details?.title || '',
      barcode: product?.details?.barcode || '',
      sales_quantity: product?.details?.sales?.quantity || 0,
      sales_value: product?.details?.sales?.value.amount || 0,
    })
  }, [product])

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updateProductDetailsRequest = {
      title: values.title,
      barcode: values.barcode,
      sales: {
        quantity: values.sales_quantity,
        value: {
          currency: 'USD',
          amount: values.sales_value,
        },
      },
    }
    updateProductDetailsMutation.mutate(
      {
        id: productId,
        // @ts-ignore
        req: updateProductDetailsRequest,
      },
      {
        onSuccess: () => {
          toast.success('Product updated')
          onClose()
        },
        onError: () => {
          toast.error('Product update failed.')
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="barcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Barcode</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 5449000000996" {...field} />
              </FormControl>
              <FormDescription>
                What&apos;s your product barcode?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Coca-Cola Zero" {...field} />
              </FormControl>
              <FormDescription>What&apos;s your product title?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sales_quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. 1000" {...field} />
              </FormControl>
              <FormDescription>
                How many unites of this products you have sold?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sales_value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales value (USD)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g. $10,000" {...field} />
              </FormControl>
              <FormDescription>
                Whats the total value of the sales of this product?
              </FormDescription>
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

export default memo(ProductDetailsForm)
