export default (flatPrice, medianPrice) => {
  const priceCoefficient =  parseFloat(((1 - (flatPrice / medianPrice)) * 100).toFixed(2))

  if (priceCoefficient === 0) {
    return 'the exact median price'
  }
  if (Math.abs(priceCoefficient) < 1) {
    return `almost the exact median price (${Math.abs(priceCoefficient)}% ${Math.sign(priceCoefficient) === 1 ? 'below' : 'above'})`
  }
  if (Math.abs(priceCoefficient) < 5) {
    return `slightly ${Math.sign(priceCoefficient) === 1 ? 'below' : 'above'} (${Math.abs(priceCoefficient)}%) the median price (CZK ${parseInt(medianPrice).toLocaleString()},-)`
  }
  if (Math.abs(priceCoefficient) <= 10) {
    return `${Math.abs(priceCoefficient)}% ${Math.sign(priceCoefficient) === 1 ? 'below' : 'above'} the median price (CZK ${parseInt(medianPrice).toLocaleString()},-)`
  }
  return `significantly ${Math.sign(priceCoefficient) === 1 ? 'below' : 'above'} (${Math.abs(priceCoefficient)}%) the median price (CZK ${parseInt(medianPrice).toLocaleString()},-)`
}
