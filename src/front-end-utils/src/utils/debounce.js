export default function debounce(fn, time) {
  let timeout
  return () => {
    const functionCall = () => fn.apply(this, arguments) // eslint-disable-line
    clearTimeout(timeout)
    if (time) {
      timeout = setTimeout(functionCall, time)
    } else {
      functionCall()
    }
  }
}
