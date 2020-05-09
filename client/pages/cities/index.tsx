import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { Heading1 } from '../../components/StyledHeadings'
import { CityContainer, CityItemContainer, CityRow, NeighbourhoodRow } from '../../components/CityDetail/StyledCities'
import { City } from '../../../Types/City'
import { Neighbourhood } from '../../../Types/Neighbourhood'
import increasePopularity from '../../utils/icreasePopularity'

const Cities = () => {
  const [cities, setCities] = useState([])
  const [neighbourhoods, setNeighbourhoods] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    const [cityData, neighbourhoodData] = await Promise.all([
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/cities/`),
      axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/neighbourhoods/`)
    ])
    await Promise.all([
      setCities(cityData.data),
      setNeighbourhoods(neighbourhoodData.data)
    ])
    setIsLoading(false)
  }

  const renderCitiesAndNeighbourhoods = (city: City) => {
    const cityNeighbourhoods = neighbourhoods.filter((neighbourhood: Neighbourhood) => {
      return neighbourhood.city._id === city._id
    })

    const neighbourhoodItems = cityNeighbourhoods.map((cityNeighbourhood: Neighbourhood) => {
      return (
        <Link href={`/neighbourhood/${cityNeighbourhood._id}`}>
          <a>
            <NeighbourhoodRow onClick={() => increasePopularity(city._id)}>{cityNeighbourhood.name}</NeighbourhoodRow>
          </a>
        </Link>
      )
    })

    return (
      <CityItemContainer>
        <Link href={`/city/${city._id}`}>
          <a>
            <CityRow onClick={() => increasePopularity(city._id)}>{city.name}</CityRow>
          </a>
        </Link>
        {neighbourhoodItems}
      </CityItemContainer>
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
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
    </>
  )
}

export default Cities
