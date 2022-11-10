function formatDatetime(timestamp, type = 'long') {
  const options =
    type === 'long'
      ? {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
      : { hour: '2-digit', minute: '2-digit' }
  return new Date(timestamp).toLocaleString(undefined, options)
}


export function when(event) {
  const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
  return new Date(event.date).toLocaleString(undefined, options)
}


// export function backgroundPosition(focalPoint) {
//   if (event.media && event.media[0].focalpoint) {
//     const focalpoint = event.media[0].focalpoint
//     return `${(focalpoint[0] + 1) * 50}% ${(focalpoint[1] + 1) * 50}%`
//   }
//   return 'center center'
// }