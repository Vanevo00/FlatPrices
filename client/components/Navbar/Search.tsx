import React, { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
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
import Link from 'next/link'

const SEARCH_LIMIT = 3

const Search = () => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSearchResults, setShowSearchResults] = useState(false)

  const resultsContainer = useRef()
  const searchInputRef = useRef()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    router.push(`/search/${searchInput}`)
  }

  const handleClick = (e) => {
    // @ts-ignore
    if (resultsContainer && resultsContainer.current && resultsContainer.current.contains(e.target)) {
      return
    }
    // @ts-ignore
    if (searchInput && searchInputRef && searchInputRef.current && searchInputRef.current.contains(e.target)) {
      return setShowSearchResults(true)
    }
    setShowSearchResults(false)
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClick)
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  })

  useEffect(() => {
    if (searchInput.length > 1) {
      fetchSearchResults()
    } else {
      setShowSearchResults(false)
    }
  }, [searchInput])

  const fetchSearchResults = async () => {
    setIsLoading(true)
    setSearchResults([])
    const data = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/search/all/${searchInput}/${SEARCH_LIMIT}`)
    setSearchResults(data.data)
    setIsLoading(false)
    setShowSearchResults(true)
  }

  const {
    neighbourhoods,
    cities,
    flats
  } = searchResults

  return (
    <MainContainer>
      <form onSubmit={onSubmit}>
        <SearchContainer>
          <StyledInput ref={searchInputRef} type='text' placeholder='search for cities, neighbourhoods or flats..' onChange={onChange} value={searchInput}/>
          <SearchButton type='submit'><i className='fas fa-search-location fa-2x'/></SearchButton>
        </SearchContainer>
      </form>

      {
        showSearchResults &&
        <ResultsContainer ref={resultsContainer}>
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
                <Link href={`/neighbourhood/${neighbourhood._id}`} key={neighbourhood._id}>
                  <ResultItem>
                    <p><strong>{neighbourhood.name}</strong></p>
                    <p>neighbourhood</p>
                  </ResultItem>
                </Link>
              )
            })
          }
          {
            cities && cities.map((city: any) => {
              return (
                <Link href={`/city/${city._id}`} key={city._id}>
                  <ResultItem>
                    <p><strong>{city.name}</strong></p>
                    <p>city</p>
                  </ResultItem>
                </Link>

              )
            })
          }
          {
            flats && flats.map((flat: any) => {
              return (
                <Link href={`/flat/${flat._id}`} key={flat._id}>
                  <ResultItem>
                    <p><strong>{flat.address}</strong></p>
                    <p>flat</p>
                  </ResultItem>
                </Link>
              )
            })
          }
        </ResultsContainer>
      }
    </MainContainer>
  )
}

export default Search
