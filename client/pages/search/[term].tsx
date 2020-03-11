import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { Heading1 } from '../../components/StyledHeadings'
import axios from 'axios'
import {
  GreySmallText,
  Header,
  ResultItem,
  ResultsContainer,
  ResultsTable
} from './StyledSearchResults'
import Spinner from '../../components/Spinner/Spinner'
import { City } from '../../components/Types/City'
import { Neighbourhood } from '../../components/Types/Neighbourhood'
import { Flat } from '../../components/Types/Flat'
import Link from 'next/link'

interface Props {
  term: string
}

const Search = ({ term }: Props) => {
  const [searchResults, setSearchResults] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const fetchSearchData = async () => {
    setIsLoading(true)
    const data = await axios.get(`http://localhost:4000/api/search/all/${term}`)
    setSearchResults(data.data)
    setIsLoading(false)
  }

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
          {searchResults && searchResults.cities.length > 0 && searchResults.cities.map((city: City) =>
            <Link href={`/city/${city._id}`}>
              <ResultItem key={city._id}>{city.name}&nbsp;<GreySmallText>{city.country}</GreySmallText></ResultItem>
            </Link>
          )}
        </ResultsTable>

        <ResultsTable>
          <Header>Neighbourhoods {searchResults && `(${searchResults.neighbourhoods.length} results)`}</Header>
          {isLoading && <Spinner/>}
          {searchResults && searchResults.neighbourhoods.length > 0 && searchResults.neighbourhoods.map((neighbourhood: Neighbourhood) =>
            <Link href={`/neighbourhood/${neighbourhood._id}`}>
              <ResultItem key={neighbourhood._id}>
                {neighbourhood.name}&nbsp;<GreySmallText>{neighbourhood.city.name}</GreySmallText>
              </ResultItem>
            </Link>

          )}
        </ResultsTable>

        <ResultsTable>
          <Header>Flats {searchResults && `(${searchResults.flats.length} results)`}</Header>
          {isLoading && <Spinner/>}
          {searchResults && searchResults.flats.length > 0 && searchResults.flats.map((flat: Flat) =>
            <Link href={`/flat/${flat._id}`}>
              <ResultItem key={flat._id}>
                <div>
                  {flat.address}&nbsp;<GreySmallText>{flat.neighbourhood.name}&nbsp;({flat.city.name})</GreySmallText>
                </div>
                <div>
                  <GreySmallText>{flat.squareMeters}m2 | {flat.priceCZK.toLocaleString()} CZK | {flat.agency}</GreySmallText>
                </div>
              </ResultItem>
            </Link>
          )}
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
