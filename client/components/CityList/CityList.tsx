import React, { useEffect, useState } from 'react'
import { Heading1Centered } from '../StyledHeadings'
import axios from 'axios'
import Link from 'next/link'
import Spinner from '../Spinner/Spinner'
import {
  CityListContainer,
  CityListItem,
  CountryText,
  ItemDescription,
  NameText
} from './StyledCityList'
import increasePopularity from '../../utils/icreasePopularity'

const CITY_IMAGE_PLACEHOLDER = 'https://store-images.s-microsoft.com/image/apps.47288.14188059920471079.8845931d-936f-4c5b-848c-e9700ef87a6b.92da2b6e-01a3-4806-8575-6f6278ecd71b?mode=scale&q=90&h=1080&w=1920&format=jpg'

const CityList = () => {
  const [cities, setCities] = useState([])

  const fetchCities = async () => {
    const {
      data
    } = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/cities`)
    setCities(data)
  }

  useEffect(() => {
    fetchCities()
  }, [])

  return (
    <>
      <Heading1Centered>Cities</Heading1Centered>
      {
        cities.length > 0 ?
          <CityListContainer>
            {cities.map((city) =>
              <Link href={`/city/${city._id}`} key={city._id}>
                <a>
                  <CityListItem backgroundImage={city.mainImageLink ? city.mainImageLink : CITY_IMAGE_PLACEHOLDER} onClick={() => increasePopularity(city._id)}>
                    <ItemDescription>
                      <div>
                        <NameText>{city.name}</NameText>
                        <CountryText>{city.country}</CountryText>
                      </div>
                    </ItemDescription>
                  </CityListItem>
                </a>
              </Link>
            )}
          </CityListContainer>
          :
          <Spinner/>
      }
    </>
  )
}

export default CityList
