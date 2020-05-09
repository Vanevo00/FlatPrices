import React, { useEffect, useState } from 'react'
import { Heading1 } from '../../components/StyledHeadings'
import axios from 'axios'
import {
  GreySmallText,
  Header,
  ResultItem,
  ResultsContainer,
  ResultsTable
} from '../../components/SearchResults/StyledSearchResults'
import Spinner from '../../components/Spinner/Spinner'
import { City } from '../../../Types/City'
import { Neighbourhood } from '../../../Types/Neighbourhood'
import { Flat } from '../../../Types/Flat'
import Link from 'next/link'

interface Props {
  term: string
}

const Search = ({ term }: Props) => {
  const [searchResults, setSearchResults] = useState({
    cities: [],
    neighbourhoods: [],
    flats: []
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchSearchData = async () => {
    setIsLoading(true)
    const data = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/search/all/${term}`)
    setSearchResults(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSearchData()
  }, [])

  return (
    <>
      <Heading1>Search results for "{term}"</Heading1>
      <ResultsContainer>
        <ResultsTable>
          <Header>Cities {searchResults && `(${searchResults.cities.length} results)`}</Header>
          {isLoading && <Spinner/>}
          {searchResults && searchResults.cities.length > 0 && searchResults.cities.map((city: City) =>
            <Link href={`/city/${city._id}`}>
              <a>
                <ResultItem key={city._id}>{city.name}&nbsp;<GreySmallText>{city.country}</GreySmallText></ResultItem>
              </a>
            </Link>
          )}
        </ResultsTable>

        <ResultsTable>
          <Header>Neighbourhoods {searchResults && `(${searchResults.neighbourhoods.length} results)`}</Header>
          {isLoading && <Spinner/>}
          {searchResults && searchResults.neighbourhoods.length > 0 && searchResults.neighbourhoods.map((neighbourhood: Neighbourhood) =>
            <Link href={`/neighbourhood/${neighbourhood._id}`}>
              <a>
                <ResultItem key={neighbourhood._id}>
                  {neighbourhood.name}&nbsp;<GreySmallText>{neighbourhood.city.name}</GreySmallText>
                </ResultItem>
              </a>
            </Link>

          )}
        </ResultsTable>

        <ResultsTable>
          <Header>Flats {searchResults && `(${searchResults.flats.length} results)`}</Header>
          {isLoading && <Spinner/>}
          {searchResults && searchResults.flats.length > 0 && searchResults.flats.map((flat: Flat) =>
            <Link href={`/flat/${flat._id}`}>
              <a>
                <ResultItem key={flat._id}>
                  <div>
                    {flat.address}&nbsp;<GreySmallText>{flat.neighbourhood.name}&nbsp;({flat.city.name})</GreySmallText>
                  </div>
                  <div>
                    <GreySmallText>{flat.squareMeters}m2 | {flat.priceCZK.toLocaleString()} CZK | {flat.agency}</GreySmallText>
                  </div>
                </ResultItem>
              </a>
            </Link>
          )}
        </ResultsTable>
      </ResultsContainer>
    </>
  )
}

Search.getInitialProps = async (context: any) => {
  return {
    term: context.query.term
  }
}
export default Search
