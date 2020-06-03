import React, { ChangeEvent, useState } from 'react'
import {
  ButtonList, ButtonListItem, CloseFiltersButton,
  FilterButton, FilterButtons,
  FilterContainer,
  FilterDescription, FilterInteraction, FilterRow,
  IndividualFilters, MinMaxInputs, ShowFiltersButton,
} from './StyledFlatFilter'
import { Heading2CenteredColor } from '../StyledHeadings'

interface Props {
  setPageLimitCallback: Function
  callback: Function
  pageLimit: number
}

const FlatFilter = ({ setPageLimitCallback, callback, pageLimit }: Props) => {
  const [filterExpanded, setFilterExpanded] = useState(false)
  const [activeLimitPeriod, setActiveLimitPeriod] = useState('week')
  const [selectedPageLimit, setSelectedPageLimit] = useState(pageLimit)
  const [sortBy, setSortBy] = useState('-createdAt')
  const [inputValues, setInputValues]= useState({
    minPrice: undefined,
    maxPrice: undefined,
    minMeters: undefined,
    maxMeters: undefined,
    minPricePerMeter: undefined,
    maxPricePerMeter: undefined,
    agency: undefined,
    address: undefined
  })

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const defaultFilterClick = () => {
    setActiveLimitPeriod('week')
    setSelectedPageLimit(50)
    setSortBy('-createdAt')
    setInputValues({
      minPrice: '',
      maxPrice: '',
      minMeters: '',
      maxMeters: '',
      minPricePerMeter: '',
      maxPricePerMeter: '',
      agency: '',
      address: ''
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

    if (inputValues.agency) {
      finalQuery += `&agency=${inputValues.agency}`
    }

    if (inputValues.address) {
      finalQuery += `&address=${inputValues.address}`
    }

    finalQuery += `&pageLimit=${selectedPageLimit}`

    finalQuery += `&sort=${sortBy}`

    setPageLimitCallback(selectedPageLimit)
    callback(finalQuery.substr(1))
  }

  return (
    <FilterContainer expanded={filterExpanded}>
      <ShowFiltersButton onClick={() => setFilterExpanded(true)} visible={!filterExpanded}>Show Filters</ShowFiltersButton>
      <CloseFiltersButton onClick={() => setFilterExpanded(false)} visible={filterExpanded}>X</CloseFiltersButton>
      <Heading2CenteredColor>Filters</Heading2CenteredColor>
      <IndividualFilters>
        <FilterRow>
          <FilterDescription>added</FilterDescription>
          <FilterInteraction>
            <ButtonList>
              <ButtonListItem active={activeLimitPeriod === 'week'} onClick={() => setActiveLimitPeriod('week')}>last week</ButtonListItem>
              <ButtonListItem active={activeLimitPeriod === 'month'} onClick={() => setActiveLimitPeriod('month')}>last month</ButtonListItem>
              <ButtonListItem active={activeLimitPeriod === 'year'} onClick={() => setActiveLimitPeriod('year')}>last year</ButtonListItem>
              <ButtonListItem active={activeLimitPeriod === 'all'} onClick={() => setActiveLimitPeriod('all')} last={true}>all time</ButtonListItem>
            </ButtonList>
          </FilterInteraction>
        </FilterRow>
        <FilterRow>
          <FilterDescription>flats per page</FilterDescription>
          <FilterInteraction>
            <ButtonList>
              <ButtonListItem active={selectedPageLimit === 20} onClick={() => setSelectedPageLimit(20)}>20</ButtonListItem>
              <ButtonListItem active={selectedPageLimit === 50} onClick={() => setSelectedPageLimit(50)}>50</ButtonListItem>
              <ButtonListItem active={selectedPageLimit === 100} onClick={() => setSelectedPageLimit(100)}>100</ButtonListItem>
              <ButtonListItem active={selectedPageLimit === 1000} onClick={() => setSelectedPageLimit(1000)} last={true}>1000</ButtonListItem>
            </ButtonList>
          </FilterInteraction>
        </FilterRow>
        <FilterRow>
          <FilterDescription>sort by</FilterDescription>
          <FilterInteraction>
            <ButtonList>
              <ButtonListItem active={sortBy === '-createdAt'} onClick={() => setSortBy('-createdAt')}>newest</ButtonListItem>
              <ButtonListItem active={sortBy === 'createdAt'} onClick={() => setSortBy('createdAt')}>oldest</ButtonListItem>
              <ButtonListItem active={sortBy === 'priceCZK'} onClick={() => setSortBy('priceCZK')}>cheapest</ButtonListItem>
              <ButtonListItem active={sortBy === '-priceCZK'} onClick={() => setSortBy('-priceCZK')} >most expensive</ButtonListItem>
              <ButtonListItem active={sortBy === 'pricePerMeter'} onClick={() => setSortBy('pricePerMeter')}>cheapest per m2</ButtonListItem>
              <ButtonListItem active={sortBy === '-pricePerMeter'} onClick={() => setSortBy('-pricePerMeter')} >most expensive per m2</ButtonListItem>
              <ButtonListItem active={sortBy === 'squareMeters'} onClick={() => setSortBy('squareMeters')}>least m2</ButtonListItem>
              <ButtonListItem active={sortBy === '-squareMeters'} onClick={() => setSortBy('-squareMeters')} last={true}>most m2</ButtonListItem>
            </ButtonList>
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
        <FilterRow>
          <FilterDescription>Agency name</FilterDescription>
          <input type='text' name='agency' value={inputValues.agency} onChange={onChange}/>
        </FilterRow>
        <FilterRow>
          <FilterDescription>Address</FilterDescription>
          <input type='text' name='address' value={inputValues.address} onChange={onChange}/>
        </FilterRow>
      </IndividualFilters>
      <FilterButtons>
        <FilterButton onClick={handleFilterClick}>Filter</FilterButton>
        <FilterButton onClick={defaultFilterClick}>Default Filters</FilterButton>
      </FilterButtons>
    </FilterContainer>
  )
}

export default FlatFilter
