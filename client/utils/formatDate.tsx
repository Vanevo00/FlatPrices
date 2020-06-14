export default (date) => {
  const dateToBeFormatted = new Date(date)
  return `${dateToBeFormatted.getDate()}/${dateToBeFormatted.getMonth() + 1}/${dateToBeFormatted.getFullYear()} ${dateToBeFormatted.getHours()}:${('0' + dateToBeFormatted.getMinutes()).slice(-2)}:${('0' + dateToBeFormatted.getSeconds()).slice(-2)}`
}
