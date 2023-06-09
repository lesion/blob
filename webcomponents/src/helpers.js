export function when(date) {
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }
  return new Date(date).toLocaleDateString(undefined, options)
}