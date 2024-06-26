import React from 'react'

export function Heading({ text }: { text: string }) {
  return (
    <h1 className="text-base font-semibold leading-6 text-gray-600 dark:text-white">
      {text}
    </h1>
  )
}
export function HeadingAndDescription({
  heading,
  description,
}: {
  heading: string
  description?: string
}) {
  return (
    <div className="mb-2 sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <Heading text={heading} />
        {description && (
          <p className="mt-2 text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  )
}
