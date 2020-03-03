import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { AvgPriceTable, PriceDescription, PriceNumber } from '../../components/Table/StyledAveragePriceTable'
import { Heading2, Heading2Centered } from '../../components/StyledHeadings'
import { GeneralContainer } from '../../components/StyledContainers'
import CityTable from '../../components/Table/CityTable'

interface Props {
  _id: string
}

const CityDetail = ({ _id }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState()
  const [cityFlats, setCityFlats] = useState()
  const [avgPrice, setAvgPrice] = useState()

  const fetchData = async () => {
    setIsLoading(true)
    const [city, flats, averagePrice] = await Promise.all([
      axios.get(`http://localhost:4000/api/cities/${_id}`),
      axios.get(`http://localhost:4000/api/flats/byCity/${_id}`),
      axios.get(`http://localhost:4000/api/flats/avgPriceCity/${_id}`)
    ])
    setCity(city.data)
    setCityFlats(flats.data)
    setAvgPrice(averagePrice.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <GeneralContainer>
        {isLoading && <Spinner/>}
        {
          city &&
          <Heading2>{city.name}</Heading2>
        }
        {
          avgPrice &&
          <AvgPriceTable>
            <PriceDescription>Average price</PriceDescription>
            <PriceNumber>{avgPrice.avgPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
            <PriceDescription>Median price</PriceDescription>
            <PriceNumber>{avgPrice.medianPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
            <PriceDescription>Median price above 60 m<sup>2</sup></PriceDescription>
            <PriceNumber>{avgPrice.largeFlatPricesMedian ? avgPrice.largeFlatPricesMedian.toLocaleString() : 'N/A'} CZK per m<sup>2</sup></PriceNumber>
            <PriceDescription last={true}>Median price below 60 m<sup>2</sup></PriceDescription>
            <PriceNumber last={true}>{avgPrice.smallFlatPricesMedian > 0 ? avgPrice.smallFlatPricesMedian.toLocaleString() : 'N/A'} CZK per m<sup>2</sup></PriceNumber>
          </AvgPriceTable>
        }
        {
          city && cityFlats && avgPrice &&
          <>
            <Heading2Centered>{cityFlats.length} Flats in {city.name}</Heading2Centered>
            <CityTable flats={cityFlats} medianPrice={avgPrice.medianPrice}/>
          </>
        }
      </GeneralContainer>
    </Layout>
  )
}

CityDetail.getInitialProps = async (context: any) => {
  return {
    _id: context.query._id
  }
}

export default CityDetail
