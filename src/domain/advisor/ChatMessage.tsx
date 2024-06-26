import { SiOpenai } from 'react-icons/si'
import Image from 'next/image'
import { TbCursorText } from 'react-icons/tb'
import { useUser } from '@auth0/nextjs-auth0/client'
import { memo } from 'react'
import Message from '../../models/message'

function ChatMessage({
  message,
  isInProgress = false,
}: {
  message: Message.Message
  isInProgress?: boolean
}) {
  const { user } = useUser()
  const { sender, content } = message
  const isUser = sender === 'user'

  return (
    <div
      className={`group w-full border-b border-black/10 text-gray-800 dark:border-gray-900/50 dark:text-gray-100 ${
        isUser ? 'dark:bg-gray-800' : 'bg-gray-50 dark:bg-[#444654]'
      }`}
    >
      <div className="m-auto flex w-full gap-4 text-base md:max-w-2xl md:gap-6 lg:max-w-xl lg:px-0 xl:max-w-3xl">
        <div className="m-auto flex w-full flex-row gap-4 p-4 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-xl lg:px-0 xl:max-w-3xl">
          <div className="relative flex w-8 flex-col items-end">
            <div className="text-opacity-100r relative flex h-10 w-10  items-center justify-center text-white">
              {isUser && user?.picture ? (
                <Image
                  width={40}
                  height={40}
                  className="inline-block  rounded-2xl"
                  alt="Profile Picture"
                  src={user?.picture}
                />
              ) : (
                <SiOpenai className="b-1 h-8 w-8 rounded-2xl bg-red-500 text-white" />
              )}
            </div>
            <div className="!invisible absolute left-0 top-2 -ml-4 flex -translate-x-full items-center justify-center gap-1 text-xs group-hover:visible">
              <button disabled className="text-gray-300 dark:text-gray-400" />
              <span className="flex-shrink-0 flex-grow">1 / 1</span>
              <button disabled className="text-gray-300 dark:text-gray-400" />
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
            <div className="flex flex-grow flex-col gap-3">
              <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                <div className="markdown dark prose w-full break-words dark:prose-invert">
                  {!isUser && content === null ? (
                    <TbCursorText className="h-6 w-6 animate-pulse" />
                  ) : (
                    <>
                      <p>{content}</p>
                      {isInProgress && (
                        <div className="inline-flex items-center pl-2">
                          <span className="animate-bounce">.</span>
                          <span className="animate-bounce delay-150">.</span>
                          <span className="animate-bounce delay-300">.</span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default memo(ChatMessage)
