import React from 'react'
import NewlyAddedFlats from '../components/NewlyAddedFlats/NewlyAddedFlats'
import MostPopularCitiesList from '../components/MostPopularCities/MostPopularCitiesList'
import Title from '../components/Title'

const Index = () => {
  return (
    <>
      <Title text={'home'}/>
      <MostPopularCitiesList/>
      <NewlyAddedFlats/>
    </>
  )
}

export default Index
