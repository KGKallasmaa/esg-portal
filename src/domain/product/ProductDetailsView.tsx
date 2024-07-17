import { memo } from 'react'
import { Card, CardContent } from '../../components/ui/card'
import { useGetProduct } from './hooks/product_hooks'

function ProductDetailsView({ productId }: { productId: string }) {
  const { data: product } = useGetProduct(productId)

  const productDetails = [
    {
      title: 'Product Name',
      value: product?.details?.title,
    },
    {
      title: 'Barcode',
      value: product?.details?.barcode,
    },
  ]

  return (
    <Card>
      <CardContent className="grid gap-4">
        <div>
          {productDetails.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default memo(ProductDetailsView)
