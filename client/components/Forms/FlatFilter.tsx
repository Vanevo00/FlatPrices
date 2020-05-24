import React, { ChangeEvent, useState } from 'react'
import {
  FilterButton,
  FilterContainer,
  FilterDescription, FilterInteraction, FilterRow,
  IndividualFilters, MinMaxInputs,
  SearchPeriod,
  SearchPeriodItem
} from './StyledFlatFilter'
import { Heading2CenteredColor } from '../StyledHeadings'

interface Props {
  callback: Function
}

const FlatFilter = ({callback}: Props) => {
  const [activeLimitPeriod, setActiveLimitPeriod] = useState('week')
  const [inputValues, setInputValues]= useState({
    minPrice: undefined,
    maxPrice: undefined,
    minMeters: undefined,
    maxMeters: undefined,
    minPricePerMeter: undefined,
    maxPricePerMeter: undefined
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const handleFilterClick = () => {
    let finalQuery = ''

    if (activeLimitPeriod) {
      finalQuery += `&timeLimit=${activeLimitPeriod}`
    }

    if (inputValues.minPrice) {
      finalQuery += `&minPrice=${inputValues.minPrice}`
    }

    if (inputValues.maxPrice) {
      finalQuery += `&maxPrice=${inputValues.maxPrice}`
    }

    if (inputValues.minMeters) {
      finalQuery += `&minMeters=${inputValues.minMeters}`
    }

    if (inputValues.maxMeters) {
      finalQuery += `&maxMeters=${inputValues.maxMeters}`
    }

    if (inputValues.minPricePerMeter) {
      finalQuery += `&minPricePerMeter=${inputValues.minPricePerMeter}`
    }

    if (inputValues.maxPricePerMeter) {
      finalQuery += `&maxPricePerMeter=${inputValues.maxPricePerMeter}`
    }

    callback(finalQuery)
  }

  return (
    <FilterContainer>
      <Heading2CenteredColor>Filter results</Heading2CenteredColor>
      <IndividualFilters>
        <FilterRow>
          <FilterDescription>added</FilterDescription>
          <FilterInteraction>
            <SearchPeriod>
              <SearchPeriodItem active={activeLimitPeriod === 'week'} onClick={() => setActiveLimitPeriod('week')}>last week</SearchPeriodItem>
              <SearchPeriodItem active={activeLimitPeriod === 'month'} onClick={() => setActiveLimitPeriod('month')}>last month</SearchPeriodItem>
              <SearchPeriodItem active={activeLimitPeriod === 'year'} onClick={() => setActiveLimitPeriod('year')}>last year</SearchPeriodItem>
              <SearchPeriodItem active={activeLimitPeriod === 'all'} onClick={() => setActiveLimitPeriod('all')} last={true}>all time</SearchPeriodItem>
            </SearchPeriod>
          </FilterInteraction>
        </FilterRow>
        <FilterRow>
          <FilterDescription>Price (CZK)</FilterDescription>
          <FilterInteraction>
            <MinMaxInputs>
              min
              <input type='number' name='minPrice' value={inputValues.minPrice} onChange={onChange}/>
              max
              <input type='number' name='maxPrice' value={inputValues.maxPrice} onChange={onChange}/>
            </MinMaxInputs>
          </FilterInteraction>
        </FilterRow>
        <FilterRow>
          <FilterDescription>Price per m2</FilterDescription>
          <FilterInteraction>
            <MinMaxInputs>
              min
              <input type='number' name='minPricePerMeter' value={inputValues.minPricePerMeter} onChange={onChange}/>
              max
              <input type='number' name='maxPricePerMeter' value={inputValues.maxPricePerMeter} onChange={onChange}/>
            </MinMaxInputs>
          </FilterInteraction>
        </FilterRow>
        <FilterRow>
          <FilterDescription>m2</FilterDescription>
          <FilterInteraction>
            <MinMaxInputs>
              min
              <input type='number' name='minMeters' value={inputValues.minMeters} onChange={onChange}/>
              max
              <input type='number' name='maxMeters' value={inputValues.maxMeters} onChange={onChange}/>
            </MinMaxInputs>
          </FilterInteraction>
        </FilterRow>
      </IndividualFilters>
      <FilterButton onClick={handleFilterClick}>Filter</FilterButton>
    </FilterContainer>
  )
}

export default FlatFilter
