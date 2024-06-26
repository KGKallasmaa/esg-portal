'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../assets/logos/merlin_logo.png'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className="top-0 z-[100] flex w-full items-center justify-between border-b px-6  py-6 md:px-12">
      <div className="order-first flex flex-1 items-center">
        <Link href="/">
          <Image src={logo} width={50} height={50} alt="Logo" />
        </Link>
      </div>

      <div className="z-[1000] hidden flex-1 items-center justify-center gap-x-5 font-semibold uppercase md:flex lg:order-2 lg:text-lg xl:gap-x-10">
        <Link
          href="#features"
          className="text-lg text-gray-800 no-underline hover:text-black  dark:text-primary dark:hover:text-white"
        >
          <span>Features</span>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-end gap-x-3 md:flex lg:order-2 lg:text-lg ">
        <Link
          href="/login"
          className="hover:text-colorP flex items-center justify-center gap-x-1 font-semibold"
        >
          <span>Login</span>
          <AiOutlineArrowRight />
        </Link>
      </div>
      <div className="md:order-non order-4 flex md:hidden">
        <button className="z-20 2xl:hidden" onClick={handleMenuToggle}>
          {menuOpen ? (
            <AiOutlineClose size="30px" />
          ) : (
            <RxHamburgerMenu size="30px" />
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="absolute inset-0 flex h-screen w-full flex-col space-y-1 bg-primary px-6 py-6 text-right text-black md:hidden">
          <div>
            <Link href="/">
              <Image
                className="w-[60px] 2xl:w-[70px]"
                src={logo}
                width={50}
                height={50}
                alt="Logo"
              />
            </Link>
          </div>
          <div className="divide-y divide-black">
            <div className="flex flex-col justify-center gap-y-5 py-5">
              <Link
                href="#features"
                onClick={handleMenuToggle}
                className="font-bold uppercase text-gray-300 no-underline hover:text-black"
              >
                <span>Features</span>
              </Link>
            </div>
            <div className="flex flex-col items-end justify-center gap-y-5 py-4 font-bold uppercase text-gray-300">
              <Link href="/login" className="flex items-center gap-x-1">
                <span>Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
