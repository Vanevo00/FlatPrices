import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { Heading2, Heading2Centered } from '../../components/StyledHeadings'
import { GeneralContainer } from '../../components/StyledContainers'
import CityTable from '../../components/Table/CityTable'
import AvgPriceTable from '../../components/Table/AvgPriceTable'
import { AvgContainer } from '../../components/Table/StyledAveragePriceTable'

interface Props {
  _id: string
}

const CityDetail = ({ _id }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [city, setCity] = useState()
  const [cityFlats, setCityFlats] = useState()
  const [avgPrice, setAvgPrice] = useState()
  const [avgRents, setAvgRents] = useState()

  const fetchData = async () => {
    setIsLoading(true)
    const [city, flats, averagePrice, averageRents] = await Promise.all([
      axios.get(`http://localhost:4000/api/cities/${_id}`),
      axios.get(`http://localhost:4000/api/flats/byCity/${_id}`),
      axios.get(`http://localhost:4000/api/flats/avgPriceCity/${_id}`),
      axios.get(`http://localhost:4000/api/rents/avgRentCity/${_id}`)
    ])

    await Promise.all([
      setCity(city.data),
      setCityFlats(flats.data),
      setAvgRents(averageRents.data),
      setAvgPrice(averagePrice.data)
    ])
    setIsLoading(false)
  }

  //debugging
  useEffect(() => {
    console.log(avgRents)
  }, [avgRents])

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
          avgPrice && avgRents &&
            <AvgContainer>
              <AvgPriceTable avgPrice={avgPrice}/>
            </AvgContainer>
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
