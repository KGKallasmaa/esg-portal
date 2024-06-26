type ErrorProps = {
  err: any | undefined
}
export const ErrorMessage = (props: ErrorProps) => {
  if (props.err) {
    return <p className="text-xs italic text-red-500">{props.err?.message}</p>
  }
  return null
}
