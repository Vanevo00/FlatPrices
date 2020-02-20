import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Heading1 } from '../../components/StyledHeadings'
import axios from 'axios'
import { Header, ResultItem, ResultsContainer, ResultsTable } from './StyledSearchResults'
import Spinner from '../../components/Spinner/Spinner'

const Search = ({term}: any) => {
  const [searchResults, setSearchResults] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchSearchData = async () => {
    setIsLoading(true)
    const data = await axios.get(`http://localhost:4000/api/search/all/${term}`)
    setSearchResults(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log(searchResults)
  }, [searchResults])

  useEffect(() => {
    fetchSearchData()
  }, [])

  return (
    <Layout>
      <Heading1>Search results for "{term}"</Heading1>
      <ResultsContainer>
        <ResultsTable>
          <Header>Cities {searchResults && `(${searchResults.cities.length} results)`}</Header>
          {isLoading && <Spinner/>}
          <ResultItem>Test</ResultItem>
        </ResultsTable>

        <ResultsTable>
          <Header>Neighbourhoods {searchResults && `(${searchResults.neighbourhoods.length} results)`}</Header>
          {isLoading && <Spinner/>}
        </ResultsTable>

        <ResultsTable>
          <Header>Flats {searchResults && `(${searchResults.flats.length} results)`}</Header>
          {isLoading && <Spinner/>}
        </ResultsTable>
      </ResultsContainer>
    </Layout>
  )
}

Search.getInitialProps = async (context: any) => {
  return {
    term: context.query.term
  }
}
export default Search
