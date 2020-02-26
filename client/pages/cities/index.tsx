import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { Heading1 } from '../../components/StyledHeadings'
import { CityContainer, CityItemContainer, CityRow, NeighbourhoodRow } from './StyledCities'
import { City } from '../../components/Types/City'
import { Neighbourhood } from '../../components/Types/Neighbourhood'

const Cities = () => {
  const [cities, setCities] = useState()
  const [neighbourhoods, setNeighbourhoods] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    const [cityData, neighbourhoodData] = await Promise.all([
      axios.get('http://localhost:4000/api/cities/'),
      axios.get('http://localhost:4000/api/neighbourhoods/')
    ])
    await Promise.all([
      setCities(cityData.data),
      setNeighbourhoods(neighbourhoodData.data)
    ])
    setIsLoading(false)
  }

  const renderCitiesAndNeighbourhoods = (city: City) => {
    const cityNeighbourhoods = neighbourhoods.filter((neighbourhood: Neighbourhood) => {
      // @ts-ignore
      return neighbourhood.city === city._id
    })

    const neighbourhoodItems = cityNeighbourhoods.map((cityNeighbourhood: Neighbourhood) => {
      return (
        <Link href={`/neighbourhood/${cityNeighbourhood._id}`}>
          <NeighbourhoodRow>{cityNeighbourhood.name}</NeighbourhoodRow>
        </Link>
      )
    })

    console.log('cityNeighbourhoods', cityNeighbourhoods)

    return (
      <CityItemContainer>
        <Link href={`/city/${city._id}`}>
          <CityRow>{city.name}</CityRow>
        </Link>
        {neighbourhoodItems}
      </CityItemContainer>
    )
  }

  useEffect(() => {
    console.log('cities', cities)
    console.log('neighbourhoods', neighbourhoods)
  }, [neighbourhoods])

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <Heading1>Cities & Neighbourhoods</Heading1>
      {isLoading && <Spinner/>}
      {
        cities && neighbourhoods &&
          <CityContainer>
            {cities.map((city: City) => {
              return (
                renderCitiesAndNeighbourhoods(city)
              )
            })}

          </CityContainer>
      }
    </Layout>
  )
}

export default Cities
