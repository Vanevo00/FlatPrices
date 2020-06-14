import React, { useEffect, useState } from 'react'
import { Flat } from '../../../Types/Flat'
import { AvgPrice } from '../../../Types/AvgPrice'
import { RentPrices } from '../../../Types/RentPrices'
import axios from 'axios'
import {
  PriceDescriptionBody,
  PriceDescriptionContainer,
  PriceDescriptionHeader,
  PriceDescriptionText, RentDescriptionText
} from './StyledFlatDetail'
import describePriceDifference from '../../utils/describePriceDifference'

interface Props {
  flat: Flat
}

const FlatPriceDescription = ( { flat }: Props ) => {
  const [pricesNeighbourhood, setPricesNeighbourhood] = useState<AvgPrice>()
  const [pricesCity, setPricesCity] = useState<AvgPrice>()
  const [rents, setRents] = useState<RentPrices>()
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

  const renderPriceDescriptionText = () => {
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

  const renderRentDescriptionText = () => {
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
      const estimatedYearlyReturnPercentage = parseFloat((((yearlyReturn - (flat.monthlyExpensesAssociation || 0) - (flat.monthlyExpensesOther || 0)) / flat.priceCZK) * 100).toFixed(1))
      const estimatedReturnInYears = (100 / estimatedYearlyReturnPercentage).toFixed(1)
      const medianApartmentYearlyReturnPercentage = parseFloat(((yearlyReturn - (flat.monthlyExpensesAssociation || 0) - (flat.monthlyExpensesOther || 0)) / (pricesCity.medianPrice * flat.squareMeters) * 100).toFixed(1))
      const returnDifference = estimatedYearlyReturnPercentage - medianApartmentYearlyReturnPercentage
      console.log('medianApartmentYearlyReturnPercentage', medianApartmentYearlyReturnPercentage)
      console.log('returnDifference', returnDifference)
      finalText += `Median rent for a ${flat.rooms} flat in ${flat.city.name} is CZK ${parseInt(medianRent).toLocaleString()},- monthly and CZK ${yearlyReturn.toLocaleString()},- yearly. The flat is estimated to return ${estimatedYearlyReturnPercentage}% per year and its purchase price should return in ${estimatedReturnInYears} years.`
      finalText += ` Compared to a median flat, the yearly return is ${(Math.abs(returnDifference)).toFixed(1)}% ${Math.sign(returnDifference) === 1 ? 'higher' : 'lower'}.`

      if (roomsNotFound || relevantRent.amounts.length < 5) {
        finalText +=  ' Please note that median rent per meter was used to analyze the rents as there\'s not enough data available for this disposition. Thus, the analysis may be highly inaccurate.'
      }

      if (!flat.monthlyExpensesAssociation) {
        if (roomsNotFound || relevantRent.amounts.length < 5) {
          finalText += ' Please also note that '
        } else {
          finalText += ' Please note that '
        }
        finalText += 'there is currently no data about the monthly contribution to the Association of Unit Owners (Sdružení Vlastníků Jednotek) for this flat. Therefore, the overall return will most probably be a litle lower.'
      }
    }

    return finalText
  }

  useEffect(() => {
    if (flat) {
      fetchPriceInfo()
    }
  }, [flat])

  return (
    <PriceDescriptionContainer>
      <PriceDescriptionHeader>
        Price Details
      </PriceDescriptionHeader>
      <PriceDescriptionBody loading={isLoading}>
        {
          isLoading
            ? <p>Loading Price Information...</p>
            : <>
              <PriceDescriptionText>{renderPriceDescriptionText()}</PriceDescriptionText>
              <PriceDescriptionText marginTop={1}>{renderRentDescriptionText()}</PriceDescriptionText>
              </>
        }
      </PriceDescriptionBody>
    </PriceDescriptionContainer>
  )
}

export default FlatPriceDescription
