import { GoogleTagManager } from '@next/third-parties/google'
import Footer from '../../components/footer'
import HeaderSection from './landingpage/HeaderSection'

export default function StaticLayout({ children }) {
  return (
    <>
      <div className="bg-white dark:bg-gray-900">
        <HeaderSection />
        {children}
        <GoogleTagManager gtmId={'AW-16568870684'} />
        <Footer />
      </div>
    </>
  )
}
