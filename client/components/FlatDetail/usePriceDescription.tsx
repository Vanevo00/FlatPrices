import React, { useEffect, useState } from 'react'
import { Flat } from '../../../Types/Flat'
import { AvgPrice } from '../../../Types/AvgPrice'
import { RentPrices } from '../../../Types/RentPrices'
import axios from 'axios'
import describePriceDifference from '../../utils/describePriceDifference'

interface Props {
  flat: Flat
}

const COSTS_ESTIMATE = 30

const usePriceDescription = ({ flat }: Props) => {
  const [pricesNeighbourhood, setPricesNeighbourhood] = useState<AvgPrice>()
  const [pricesCity, setPricesCity] = useState<AvgPrice>()
  const [rents, setRents] = useState<RentPrices>()
  const [priceDescriptionText, setPriceDescriptionText] = useState<string>('loading price description...')
  const [rentDescriptionText, setRentDescriptionText] = useState<string>('loading rent description...')
  const [isLoading, setIsLoading] = useState(true)

  const fetchPriceInfo = async () => {
    const [priceDataNeighbourhood, priceDataCity, rentData] = await Promise.all([
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/avgPriceNeighbourhood/${flat.neighbourhood._id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/avgPriceCity/${flat.city._id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/rents/avgRentCity/${flat.city._id}`),
    ])

    setPricesNeighbourhood(priceDataNeighbourhood.data)
    setPricesCity(priceDataCity.data)
    setRents(rentData.data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (pricesNeighbourhood && pricesCity) {
      setPriceDescriptionText(generatePriceDescriptionText())
    }
  }, [pricesNeighbourhood, pricesCity])

  useEffect(() => {
    if (rents) {
      setRentDescriptionText(generateRentDescriptionText())
    }
  }, [rents])

  const generatePriceDescriptionText = () => {
    let finalText = `The price per square meter of the flat located at ${flat.address} (CZK ${parseInt(flat.pricePerMeter.toFixed(0)).toLocaleString()},-) is `
    let neighbourhoodDescribed = false

    if (pricesNeighbourhood.flatPrices.length <= 10 && pricesCity.flatPrices.length <= 10) {
      return 'Not enough data to analyze the price.'
    }
    if (pricesNeighbourhood.flatPrices.length >= 10) {
      finalText += `${describePriceDifference(flat.pricePerMeter, pricesNeighbourhood.medianPrice)} in the ${flat.neighbourhood.name} neighbourhood.`
      neighbourhoodDescribed = true
    }
    if (neighbourhoodDescribed) {
      finalText += ` Compared to all prices in ${flat.city.name}, the price is ${describePriceDifference(flat.pricePerMeter, pricesCity.medianPrice)}.`
    } else {
      finalText += `${describePriceDifference(flat.pricePerMeter, pricesCity.medianPrice)} in ${flat.city.name}.`
    }

    return finalText
  }

  const generateRentDescriptionText = () => {
    let relevantRent
    let roomsNotFound = false
    let finalText = ''

    switch(flat.rooms) {
      case '1+kk':
        relevantRent = rents.rents1kk
        break
      case '1+1':
        relevantRent = rents.rents1plus1
        break
      case '2+kk':
        relevantRent = rents.rents2kk
        break
      case '2+1':
        relevantRent = rents.rents2plus1
        break
      case '3+kk':
        relevantRent = rents.rents3kk
        break
      case '3+1':
        relevantRent = rents.rents3plus1
        break
      default:
        roomsNotFound = true
    }

    if (!rents.medianRentPerMeter) {
      finalText += 'There\'s not enough data to analyze rents.'
      return finalText
    } else {
      const medianRent = roomsNotFound || relevantRent.amounts.length < 5 ? rents.medianRentPerMeter * flat.squareMeters : relevantRent.median
      const yearlyReturn = medianRent * 12
      const monthlyExpensesAssociation = flat.monthlyExpensesAssociation || (COSTS_ESTIMATE * flat.squareMeters)
      const estimatedYearlyReturnPercentage = parseFloat((((yearlyReturn - monthlyExpensesAssociation - (flat.monthlyExpensesOther || 0)) / flat.priceCZK) * 100).toFixed(1))
      const estimatedReturnInYears = (100 / estimatedYearlyReturnPercentage).toFixed(1)
      const medianApartmentYearlyReturnPercentage = parseFloat(((yearlyReturn - monthlyExpensesAssociation - (flat.monthlyExpensesOther || 0)) / (pricesCity.medianPrice * flat.squareMeters) * 100).toFixed(1))
      const returnDifference = estimatedYearlyReturnPercentage - medianApartmentYearlyReturnPercentage
      finalText += `Median rent for a ${flat.rooms} flat in ${flat.city.name} is CZK ${parseInt(medianRent).toLocaleString()},- monthly and CZK ${yearlyReturn.toLocaleString()},- yearly.`
      finalText += ` The estimated costs amount to CZK ${(monthlyExpensesAssociation + (flat.monthlyExpensesOther || 0)).toLocaleString()} per month${!flat.monthlyExpensesAssociation ? ` (an estimate of CZK ${COSTS_ESTIMATE}/m2 was used as there are no data available)` : ''}.`
      finalText += ` The flat is estimated to return ${estimatedYearlyReturnPercentage}% per year and its purchase price should return in ${estimatedReturnInYears} years.`
      finalText += ` Compared to a median flat, the yearly return is ${(Math.abs(returnDifference)).toFixed(1)}% ${Math.sign(returnDifference) === 1 ? 'higher' : 'lower'}.`

      if (roomsNotFound || relevantRent.amounts.length < 5) {
        finalText +=  ' Please note that median rent per meter was used to analyze the rents as there\'s not enough data available for this disposition. Thus, the analysis may be highly inaccurate.'
      }
    }

    return finalText
  }

  useEffect(() => {
    if (flat) {
      fetchPriceInfo()
    }
  }, [flat])

  return {
    isLoading,
    priceDescriptionText,
    rentDescriptionText
  }
}

export default usePriceDescription
