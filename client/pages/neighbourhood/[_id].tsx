import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { StyledAvgPriceTable, PriceDescription, PriceNumber } from '../../components/Table/StyledAveragePriceTable'
import { Heading2, Heading2Centered } from '../../components/StyledHeadings'
import NeighbourhoodTable from '../../components/Table/NeighbourhoodTable'
import { GeneralContainer } from '../../components/StyledContainers'

interface Props {
  _id: string
}

const NeighbourhoodDetail = ({ _id }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [neighbourhood, setNeighbourhood] = useState({
    name: ''
  })
  const [neighbourhoodFlats, setNeighbourhoodFlats] = useState([])
  const [avgPrice, setAvgPrice] = useState({
    avgPrice: 0,
    medianPrice: 0,
    largeFlatPricesMedian: 0,
    smallFlatPricesMedian: 0
  })

  const fetchData = async () => {
    setIsLoading(true)
    const [neighbourhood, flats, averagePrice] = await Promise.all([
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/neighbourhoods/${_id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/byNeighbourhood/${_id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/avgPriceNeighbourhood/${_id}`)
    ])
    setNeighbourhood(neighbourhood.data)
    setNeighbourhoodFlats(flats.data)
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
          neighbourhood &&
            <Heading2>{neighbourhood.name}</Heading2>
        }
        {
          avgPrice &&
            <StyledAvgPriceTable>
              <PriceDescription>Average price</PriceDescription>
              <PriceNumber>{avgPrice.avgPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
              <PriceDescription>Median price</PriceDescription>
              <PriceNumber>{avgPrice.medianPrice.toLocaleString()} CZK per m<sup>2</sup></PriceNumber>
              <PriceDescription>Median price above 60 m<sup>2</sup></PriceDescription>
              <PriceNumber>{avgPrice.largeFlatPricesMedian ? avgPrice.largeFlatPricesMedian.toLocaleString() : 'N/A'} CZK per m<sup>2</sup></PriceNumber>
              <PriceDescription last={true}>Median price below 60 m<sup>2</sup></PriceDescription>
              <PriceNumber last={true}>{avgPrice.smallFlatPricesMedian > 0 ? avgPrice.smallFlatPricesMedian.toLocaleString() : 'N/A'} CZK per m<sup>2</sup></PriceNumber>
            </StyledAvgPriceTable>
        }
        {
          neighbourhood && neighbourhoodFlats && avgPrice &&
            <>
              <Heading2Centered>{neighbourhoodFlats.length} Flats in {neighbourhood.name}</Heading2Centered>
              <NeighbourhoodTable flats={neighbourhoodFlats} medianPrice={avgPrice.medianPrice}/>
            </>
        }
      </GeneralContainer>
    </Layout>
  )
}

NeighbourhoodDetail.getInitialProps = async (context: any) => {
  return {
    _id: context.query._id
  }
}

export default NeighbourhoodDetail
