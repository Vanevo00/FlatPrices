module.exports = (numArr: number[]) => {
  const sortNumber = (a: number, b: number) => {
    return b - a
  }
  return numArr.sort(sortNumber)
}
