import Logo from './Logo'

export default function FullLoadingScreen() {
  return (
    <div className="flex h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Logo className="mx-auto h-12 w-auto animate-pulse" />
        <p className="mt-2 text-center text-sm text-gray-600">Loading ...</p>
      </div>
    </div>
  )
}
