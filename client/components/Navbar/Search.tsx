import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import {
  MainContainer,
  NoResult,
  ResultItem,
  ResultsContainer,
  SearchButton,
  SearchContainer,
  StyledInput
} from './StyledSearch'

const searchLimit = 3

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(searchResults)
  }

  useEffect(() => {
    if (searchInput) {
      fetchSearchResults()
    }
  }, [searchInput])

  const fetchSearchResults = async () => {
    setIsLoading(true)
    setSearchResults([])
    const data = await axios.get(`http://localhost:4000/api/search/all/${searchInput}/${searchLimit}`)
    setSearchResults(data.data)
    setIsLoading(false)
  }

  const {
    neighbourhoods,
    cities,
    flats
  } = searchResults

  console.log(neighbourhoods)

  return (
    <MainContainer>
      <form onSubmit={onSubmit}>
        <SearchContainer>
          <StyledInput type='text' placeholder='search for cities, neighbourhoods or flats..' onChange={onChange} value={searchInput}/>
          <SearchButton type='submit'><i className='fas fa-search-location fa-2x'/></SearchButton>
        </SearchContainer>
      </form>

      {
        searchInput &&
        <ResultsContainer>
          {isLoading && <Spinner/>}
          {
            neighbourhoods && neighbourhoods.length === 0 && cities.length === 0 && flats.length === 0 &&
            <NoResult>
              No results
            </NoResult>
          }
          {
            neighbourhoods && neighbourhoods.map((neighbourhood: any) => {
              return (
                <ResultItem>
                  <p><strong>{neighbourhood.name}</strong></p>
                  <p>neighbourhood</p>
                </ResultItem>

              )
            })
          }
          {
            cities && cities.map((city: any) => {
              return (
                <ResultItem>
                  <p><strong>{city.name}</strong></p>
                  <p>city</p>
                </ResultItem>

              )
            })
          }
          {
            flats && flats.map((flat: any) => {
              return (
                <ResultItem>
                  <p><strong>{flat.address}</strong></p>
                  <p>flat</p>
                </ResultItem>

              )
            })
          }
        </ResultsContainer>
      }
    </MainContainer>
  )
}

export default Search
