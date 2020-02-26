import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { AvgPriceTable, NeighbourhoodContainer, PriceDescription, PriceNumber } from './StyledNeighbourhood'
import { Heading2 } from '../../components/StyledHeadings'

interface Props {
  _id: string
}

const NeighbourhoodDetail = ({ _id }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [neighbourhood, setNeighbourhood] = useState()
  const [neighbourhoodFlats, setNeighbourhoodFlats] = useState()
  const [avgPrice, setAvgPrice] = useState()

  const fetchData = async () => {
    setIsLoading(true)
    const [neighbourhood, flats, averagePrice] = await Promise.all([
      axios.get(`http://localhost:4000/api/neighbourhoods/${_id}`),
      axios.get(`http://localhost:4000/api/flats/byNeighbourhood/${_id}`),
      axios.get(`http://localhost:4000/api/flats/avgPriceNeighbourhood/${_id}`)
    ])
    setNeighbourhood(neighbourhood.data)
    setNeighbourhoodFlats(flats.data)
    setAvgPrice(averagePrice.data)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('neighbourhood', neighbourhood)
    console.log('neighbourhoodFlats', neighbourhoodFlats)
    console.log('avgPrice', avgPrice)
  }, [neighbourhood, neighbourhoodFlats, avgPrice])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <NeighbourhoodContainer>
        {isLoading && <Spinner/>}
        {
          neighbourhood &&
            <Heading2>{neighbourhood.name}</Heading2>
        }
        {
          avgPrice &&
            <AvgPriceTable>
              <PriceDescription>Average price</PriceDescription>
              <PriceNumber>{avgPrice.avgPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
              <PriceDescription>Median price</PriceDescription>
              <PriceNumber>{avgPrice.medianPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
              <PriceDescription>Median price above 60 m<sup>2</sup></PriceDescription>
              <PriceNumber>{avgPrice.largeFlatPricesMedian.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
              <PriceDescription>Median price below 60 m<sup>2</sup></PriceDescription>
              <PriceNumber>{avgPrice.smallFlatPricesMedian.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
            </AvgPriceTable>
        }
      </NeighbourhoodContainer>
    </Layout>
  )
}

NeighbourhoodDetail.getInitialProps = async (context: any) => {
  return {
    _id: context.query._id
  }
}

export default NeighbourhoodDetail
