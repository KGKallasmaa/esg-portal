export default function LoadingCard({ count }: { count: number }) {
  return (
    <>
      {Array(count)
        .fill(1)
        .map((nr, i) => {
          return (
            <div
              key={`loading-nr-${i}`}
              className="mx-auto w-full max-w-sm rounded-md"
            >
              <div className="flex animate-pulse space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 rounded bg-gray-200" />
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2 h-2 rounded bg-gray-200" />
                      <div className="col-span-1 h-2 rounded bg-gray-200" />
                    </div>
                    <div className="h-2 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}
