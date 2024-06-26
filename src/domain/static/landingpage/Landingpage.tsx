import Link from 'next/link'

const LandingPage = () => {
  return (
    <div className="dark:bg-gray-900">
      <Link href="/login">
      Login
      </Link>
    </div>
  )
}

export default LandingPage
