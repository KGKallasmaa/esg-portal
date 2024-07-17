import { useFormspark } from '@formspark/use-formspark'
import { useState } from 'react'
import toast from 'react-hot-toast'

const formTypeMap = {
  beta: {
    formId: '123-replaceme',
    ctaText: 'Join the Waitlist',
  },
  newsletter: {
    formId: '456-replaceme',
    ctaText: 'Subscribe',
  },
}

function EmailSignup({ formType }: { formType: 'beta' | 'newsletter' }) {
  const { formId, ctaText } = formTypeMap[formType]

  const [submit, submitting] = useFormspark({
    formId: formId,
  })

  const [email, setEmail] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    await submit({ email: email })
    toast.success('Thanks for signing up!')
    setEmail('')
  }

  return (
    <div className=" xl:mt-0">
      <p className="invisible text-sm leading-6 text-gray-300">
        The latest news, articles, and resources, sent to your inbox weekly.
      </p>
      <form onSubmit={onSubmit} className="mt-2 md:flex md:max-w-md">
        <label htmlFor="email-address" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          name="email-address"
          id="email-address"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
          placeholder="Enter your email"
        />
        <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
          <button
            type="submit"
            className="hover:bg-primary-darker flex w-full items-center justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {ctaText}
          </button>
        </div>
      </form>
    </div>
  )
}
export default EmailSignup
