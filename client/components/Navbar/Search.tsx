import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState()

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(searchInput)
  }

  useEffect(() => {
    console.log(searchInput)
  }, [searchInput])

  return (
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='search for cities, neighbourhoods or flats..' onChange={onChange} value={searchInput}/>
        <button type='submit'>Search</button>
      </form>
  )
}

export default Search
