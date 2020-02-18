import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import axios from 'axios'
import { Neighbourhood } from '../Types/Neighbourhood'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState<any>([])

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
    setSearchResults([])
    const [
      foundNeighbourhoods,
      foundCities,
      foundFlats] = await Promise.all([
        axios.get(`http://localhost:4000/api/neighbourhoods/byName/${searchInput}`),
        axios.get(`http://localhost:4000/api/cities/byName/${searchInput}`),
        axios.get(`http://localhost:4000/api/flats/byAddress/${searchInput}`)
    ])
    setSearchResults([...foundNeighbourhoods.data, ...foundCities.data, ...foundFlats.data])
  }

  return (
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='search for cities, neighbourhoods or flats..' onChange={onChange} value={searchInput}/>
        <button type='submit'>Search</button>
      </form>
  )
}

export default Search
