import logo from './assets/logos/merlin_logo.png'
import Image from 'next/image'
import { memo } from 'react'
function Logo({ className }: { className: string }) {
  return (
    <Image
      src={logo}
      className={className}
      alt="Merlin"
      width={50}
      height={50}
    />
  )
}
export default memo(Logo)
