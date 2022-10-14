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
  return new Date(timestamp * 1000).toLocaleString(undefined, options)
}


export function when(event) {
  if (event.multidate) {
    return formatDatetime(event.start_datetime) + ' - ' + formatDatetime(event.end_datetime)
  }
  return (
    formatDatetime(event.start_datetime) +
    (event.end_datetime ? '-' + formatDatetime(event.end_datetime, 'short') : '')
  )
}


// export function backgroundPosition(focalPoint) {
//   if (event.media && event.media[0].focalpoint) {
//     const focalpoint = event.media[0].focalpoint
//     return `${(focalpoint[0] + 1) * 50}% ${(focalpoint[1] + 1) * 50}%`
//   }
//   return 'center center'
// }