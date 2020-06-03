import React from 'react'
import NewlyAddedFlats from '../components/NewlyAddedFlats/NewlyAddedFlats'
import MostPopularCitiesList from '../components/CityList/MostPopularCitiesList'

const Index = () => {
  return (
    <>
      <MostPopularCitiesList/>
      <NewlyAddedFlats/>
    </>
  )
}

export default Index
