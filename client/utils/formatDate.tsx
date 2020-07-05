export default (date, withTime) => {
  const dateToBeFormatted = new Date(date)
  const dateDayInfo = `${dateToBeFormatted.getDate()}/${dateToBeFormatted.getMonth() + 1}/${dateToBeFormatted.getFullYear()}`
  const dateHoursInfo = ` ${dateToBeFormatted.getHours()}:${('0' + dateToBeFormatted.getMinutes()).slice(-2)}:${('0' + dateToBeFormatted.getSeconds()).slice(-2)}`
  if (withTime) {
    return dateDayInfo + dateHoursInfo
  } else {
    return dateDayInfo
  }
}
