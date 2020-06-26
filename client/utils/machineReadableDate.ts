export default (date) => {
  if (date) {
    return new Date(date).toISOString().substring(0, 16)
  }
  return null
}
