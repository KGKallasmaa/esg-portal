import { useEffect, useRef, useState } from 'react'
import { FiSend } from 'react-icons/fi'
import useAdvisorStore from '../../state_management/stores/advisor.store'

const InputBox = ({
  placeholder = 'Type a message...',
  sendMessage,
}: {
  placeholder?: string
  sendMessage: (message: string) => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const textAreaRef = useAutoResizeTextArea()

  const [message, setMessage] = useState('')

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '24px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [message, textAreaRef])

  const onSendMessage = async (e: any) => {
    e.preventDefault()
    if (message.length < 1) {
      setErrorMessage('Please enter a message.')
      return
    }
    sendMessage(message)
    setMessage('')
  }

  const handleKeypress = (e: any) => {
    // It's triggers by pressing the enter key
    if (e.keyCode == 13 && !e.shiftKey) {
      onSendMessage(e)
      e.preventDefault()
    }
  }
  const messageIsEmpty = message?.length === 0

  return (
    <form className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
      <div className="relative flex h-full flex-1 flex-col items-stretch md:flex-col">
        {errorMessage ? (
          <div className="mb-2 md:mb-0">
            <div className="ml-1 flex h-full justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2">
              <span className="text-sm text-red-500">{errorMessage}</span>
            </div>
          </div>
        ) : null}
        <div className="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] md:py-3 md:pl-4">
          <textarea
            ref={textAreaRef}
            value={message}
            tabIndex={0}
            data-id="root"
            style={{
              height: '24px',
              maxHeight: '200px',
              overflowY: 'hidden',
            }}
            placeholder={placeholder}
            className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeypress}
          />
          <button
            disabled={isLoading || messageIsEmpty}
            onClick={onSendMessage}
            className="absolute bottom-1.5 right-1 rounded-md bg-primary p-1 disabled:bg-gray-500 disabled:opacity-40 md:bottom-2.5 md:right-2"
          >
            <FiSend className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
    </form>
  )
}

function useAutoResizeTextArea() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = '24px'
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }, [textAreaRef])

  return textAreaRef
}

export default InputBox
