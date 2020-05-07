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
import { EditButton } from '../../components/StyledButtons'
import { CityTableHeader, SearchPeriod, SearchPeriodItem } from '../../components/CityDetail/StyledCities'

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
  const [activeLimitPeriod, setActiveLimitPeriod] = useState('week')

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
      setCityFlats(flats.data),
      setAvgRents(averageRents.data),
      setAvgPrice(averagePrice.data)
    ])
    setIsLoading(false)
  }

  const fetchDataLimitedByPeriod = async () => {
    const flats = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/byCity/${_id}?limit=${activeLimitPeriod}`)
    setCityFlats(flats.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchDataLimitedByPeriod()
  }, [activeLimitPeriod])

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
            {
              city && cityFlats.length > 0 && avgPrice &&
              <>
                <CityTableHeader>
                  <SearchPeriod>
                    <SearchPeriodItem active={activeLimitPeriod === 'week'} onClick={() => setActiveLimitPeriod('week')}>week</SearchPeriodItem>
                    <SearchPeriodItem active={activeLimitPeriod === 'month'} onClick={() => setActiveLimitPeriod('month')}>month</SearchPeriodItem>
                    <SearchPeriodItem active={activeLimitPeriod === 'year'} onClick={() => setActiveLimitPeriod('year')}>year</SearchPeriodItem>
                    <SearchPeriodItem active={activeLimitPeriod === 'all'} onClick={() => setActiveLimitPeriod('all')} last={true}>all time</SearchPeriodItem>
                  </SearchPeriod>
                  <Heading2Centered>{cityFlats.length} Flats in {city.name}</Heading2Centered>
                  <div></div>
                </CityTableHeader>
                <CityTable flats={cityFlats} medianPrice={avgPrice.medianPrice}/>
              </>
            }
            {
              isAuthenticated && user.isAdmin &&
              <Link href={`/edit/city/${_id}`}>
                <EditButton>
                  <i className='far fa-edit fa-2x'/>
                </EditButton>
              </Link>
            }
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
