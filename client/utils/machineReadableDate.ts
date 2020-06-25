export default (date) => {
  return new Date(date).toISOString().substring(0, 16)
}
