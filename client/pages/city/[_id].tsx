import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { Heading2, Heading2Centered } from '../../components/StyledHeadings'
import { GeneralContainer } from '../../components/StyledContainers'
import CityTable from '../../components/Table/CityTable'
import AvgPriceTable from '../../components/Table/AvgPriceTable'
import { AvgContainer } from '../../components/Table/StyledAveragePriceTable'
import RentPricesTable from '../../components/Table/RentPricesTable'
import AuthContext from '../../context/auth/authContext'
import { CityTableHeader } from '../../components/CityDetail/StyledCitiesAndNeighbourhoods'
import FlatFilter from '../../components/Forms/FlatFilter'
import EditButton from '../../components/EditButton/EditButton'

interface Props {
  _id: string
}

const CityDetail = ({ _id }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState({name: '', mainImageLink: ''})
  const [cityFlats, setCityFlats] = useState([])
  const [avgPrice, setAvgPrice] = useState({
    medianPrice: null
  })
  const [avgRents, setAvgRents] = useState({
    rentPrices: []
  })
  const [isCityTableLoading, setIsCityTableLoading] = useState(false)
  const [flatCount, setFlatCount] = useState(0)
  const [flatsLoading, setFlatsLoading] = useState(false)
  const [filterQuery, setFilterQuery] = useState('')
  const [pageLimit, setPageLimit] = useState(50)

  const {
    isAuthenticated,
    user
  } = useContext(AuthContext)

  const fetchData = async () => {
    setIsLoading(true)
    const [city, flats, averagePrice, averageRents] = await Promise.all([
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/${_id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/byCity/${_id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/avgPriceCity/${_id}`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/rents/avgRentCity/${_id}`)
    ])

    await Promise.all([
      setCity(city.data),
      setCityFlats(flats.data.flatsByCity),
      setFlatCount(flats.data.count),
      setAvgRents(averageRents.data),
      setAvgPrice(averagePrice.data)
    ])
    setIsLoading(false)
  }

  const fetchNewPage = async (page) => {
    setFlatsLoading(true)
    const fetchedFlatsPage = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/byCity/${_id}?${filterQuery}&page=${page}`)
    setCityFlats(fetchedFlatsPage.data.flatsByCity)
    setFlatsLoading(false)
  }

  const fetchFilteredData = async () => {
    setIsCityTableLoading(true)
    const flats = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/byCity/${_id}?${filterQuery}`)
    setCityFlats(flats.data.flatsByCity)
    setFlatCount(flats.data.count)
    setIsCityTableLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchFilteredData()
  }, [filterQuery])

  return (
    <>
      {
        isLoading
          ?
          <Spinner/>
          :
          <GeneralContainer>
            {
              city &&
              <Heading2>{city.name}</Heading2>
            }
            <AvgContainer>
              {
                avgPrice &&
                <AvgPriceTable avgPrice={avgPrice} rentPrices={avgRents}/>
              }
              {
                avgPrice && avgRents && avgRents.rentPrices.length > 0 &&
                <RentPricesTable rentPrices={avgRents}/>
              }
            </AvgContainer>
            <FlatFilter
              setPageLimitCallback={(limit) => setPageLimit(limit)}
              callback={(query) => setFilterQuery(query)}
              pageLimit={pageLimit}
            />
            <CityTableHeader>
              <Heading2Centered>{flatCount} Flat{flatCount !== 1 && 's'} in {city.name}</Heading2Centered>
            </CityTableHeader>
            <CityTable isLoading={isCityTableLoading} flats={cityFlats} medianPrice={avgPrice.medianPrice} callback={fetchNewPage} count={flatCount} pageLimit={pageLimit} flatsLoading={flatsLoading}/>
            { isAuthenticated && user.isAdmin && <EditButton href={`/edit/city/${_id}`}/>}
          </GeneralContainer>
      }
    </>
  )
}

CityDetail.getInitialProps = async (context: any) => {
  return {
    _id: context.query._id
  }
}

export default CityDetail
