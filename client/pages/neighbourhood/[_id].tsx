import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { StyledAvgPriceTable, PriceDescription, PriceNumber } from '../../components/Table/StyledAveragePriceTable'
import { Heading2 } from '../../components/StyledHeadings'
import NeighbourhoodTable from '../../components/Table/NeighbourhoodTable'
import { GeneralContainer } from '../../components/StyledContainers'
import AuthContext from '../../context/auth/authContext'
import Title from '../../components/Title'
import FlatFilter from '../../components/Forms/FlatFilter'

interface Props {
  _id: string
}

const FLATS_PER_PAGE = 50

const NeighbourhoodDetail = ({ _id }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [neighbourhood, setNeighbourhood] = useState({
    name: ''
  })
  const [neighbourhoodFlats, setNeighbourhoodFlats] = useState([])
  const [flatCount, setFlatCount] = useState(0)
  const [avgPrice, setAvgPrice] = useState({
    avgPrice: 0,
    medianPrice: 0,
    largeFlatPricesMedian: 0,
    smallFlatPricesMedian: 0
  })
  const [isNeighbourhoodTableLoading, setIsNeighbourhoodTableLoading] = useState(false)
  const [filterQuery, setFilterQuery] = useState('')
  const [pageLimit, setPageLimit] = useState(FLATS_PER_PAGE)
  const [flatsLoading, setFlatsLoading] = useState(false)

  const {
    user
  } = useContext(AuthContext)

  const fetchData = async () => {
    setIsLoading(true)
    const [neighbourhood, flats, averagePrice] = await Promise.all([
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/neighbourhoods/${_id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/byNeighbourhood/${_id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/avgPriceNeighbourhood/${_id}`)
    ])
    setNeighbourhood(neighbourhood.data)
    setNeighbourhoodFlats(flats.data.flatsByNeighbourhood)
    setFlatCount(flats.data.count)
    setAvgPrice(averagePrice.data)
    setIsLoading(false)
  }

  const fetchFilteredData = async () => {
    setIsNeighbourhoodTableLoading(true)
    const flats = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/byNeighbourhood/${_id}?${filterQuery}`)
    setNeighbourhoodFlats(flats.data.flatsByNeighbourhood)
    setFlatCount(flats.data.count)
    setIsNeighbourhoodTableLoading(false)
  }

  const fetchNewPage = async (page) => {
    setFlatsLoading(true)
    const fetchedFlatsPage = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/byNeighbourhood/${_id}?${filterQuery}&page=${page}`)
    setNeighbourhoodFlats(fetchedFlatsPage.data.flatsByNeighbourhood)
    setFlatsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchFilteredData()
  }, [filterQuery])

  return (
    <>
      <Title text={neighbourhood.name}/>
      <GeneralContainer>
        {isLoading && <Spinner/>}
        {
          neighbourhood && !isLoading &&
            <Heading2>{neighbourhood.name}</Heading2>
        }
        {
          avgPrice && !isLoading &&
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
          neighbourhood && neighbourhoodFlats && avgPrice && !isLoading &&
            <>
              <FlatFilter
                setPageLimitCallback={(limit) => setPageLimit(limit)}
                callback={(query) => setFilterQuery(query)}
                pageLimit={pageLimit}
                flatCount={flatCount}
                name={neighbourhood.name}
              />
              <NeighbourhoodTable
                isLoading={isNeighbourhoodTableLoading}
                flats={neighbourhoodFlats}
                user={user}
                medianPrice={avgPrice.medianPrice}
                callback={fetchNewPage}
                flatsLoading={flatsLoading}
                count={flatCount}
                pageLimit={pageLimit}
              />
            </>
        }
      </GeneralContainer>
    </>
  )
}

NeighbourhoodDetail.getInitialProps = async (context: any) => {
  return {
    _id: context.query._id
  }
}

export default NeighbourhoodDetail
