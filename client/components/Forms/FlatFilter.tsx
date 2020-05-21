import React from 'react'
import { SearchPeriod, SearchPeriodItem } from '../CityDetail/StyledCitiesAndNeighbourhoods'

interface Props {
  activeLimitPeriod: string
  setActiveLimitPeriod: Function
}

const FlatFilter = ({activeLimitPeriod, setActiveLimitPeriod}: Props) => {
  return (
    <SearchPeriod>
      <SearchPeriodItem active={activeLimitPeriod === 'week'} onClick={() => setActiveLimitPeriod('week')}>week</SearchPeriodItem>
      <SearchPeriodItem active={activeLimitPeriod === 'month'} onClick={() => setActiveLimitPeriod('month')}>month</SearchPeriodItem>
      <SearchPeriodItem active={activeLimitPeriod === 'year'} onClick={() => setActiveLimitPeriod('year')}>year</SearchPeriodItem>
      <SearchPeriodItem active={activeLimitPeriod === 'all'} onClick={() => setActiveLimitPeriod('all')} last={true}>all time</SearchPeriodItem>
    </SearchPeriod>
  )
}

export default FlatFilter
