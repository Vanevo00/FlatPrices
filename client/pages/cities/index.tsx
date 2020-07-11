import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'
import { Heading1Centered } from '../../components/StyledHeadings'
import { CityContainer } from '../../components/CityDetail/StyledCitiesAndNeighbourhoods'
import { City } from '../../../Types/City'
import CitiesAndNeighbourhoods from '../../components/CityDetail/CitiesAndNeighbourhoods'
import Title from '../../components/Title'

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

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Title text={'Cities'}/>
      <Heading1Centered>Cities & Neighbourhoods</Heading1Centered>
      {isLoading && <Spinner/>}
      {
        cities && neighbourhoods &&
          <CityContainer>
            {cities.map((city: City) =>
                <CitiesAndNeighbourhoods city={city} neighbourhoods={neighbourhoods}/>
            )}
          </CityContainer>
      }
    </>
  )
}

export default Cities
