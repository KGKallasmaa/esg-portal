import { useEffect, useState } from 'react'
import InputBox from './Input'
import { Welcome } from './Welcome'

function EmptyChatPage() {
  if (5 > 4) {
    return 'do not show me'
  }
  /*
  const [setChatId] = useAdvisorStore()



     */
  const sendNewMessage = (message: string) => {
    console.log('sending new message', message)
    // sendNewMessage({ message });
  }
  return (
    <div className="flex max-w-full flex-1 flex-col">
      <div className="transition-width relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div
            className="h-full dark:bg-gray-800"
            style={{
              height: 'calc(100vh - 151px)',
            }}
          >
            <Welcome />
          </div>
        </div>
        <div className="md:bg-vert-light-gradient  bottom-20 left-0 w-full border-t bg-white pt-2 dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent">
          <InputBox
            sendMessage={(message) => sendNewMessage(message)}
            placeholder={'How can I help you?'}
          />
          <div className="px-3 pb-3 pt-2 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pb-6 md:pt-3">
            <span>For educational purposes only. Not financial advise</span>
          </div>
        </div>
      </div>
    </div>
  )

  /*
  return (
    <div className="flex max-w-full flex-1 flex-col">
      <div className="transition-width relative flex h-full w-full flex-1 flex-col items-stretch overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div
            className="h-full dark:bg-gray-800"
            style={{
              height: 'calc(100vh - 151px)',
            }}
          >
            <Welcome />
          </div>
        </div>
        <div className="md:bg-vert-light-gradient  bottom-20 left-0 w-full border-t bg-white pt-2 dark:border-white/20 dark:bg-gray-800 md:border-t-0 md:border-transparent">
          <InputBox
            sendMessage={(message) => sendNewMessage(message)}
            placeholder={'How can I help you?'}
          />
          <div className="px-3 pb-3 pt-2 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pb-6 md:pt-3">
            <span>For educational purposes only. Not financial advise</span>
          </div>
        </div>
      </div>
    </div>
  )

     */
}
export default EmptyChatPage
