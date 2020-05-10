import React, { useState } from 'react'
import { City } from '../../../Types/City'
import { Neighbourhood } from '../../../Types/Neighbourhood'
import Link from 'next/link'
import {
  CityImage,
  CityImageDescription, CityImageLinks,
  CityItemContainer,
  CityRow, CloseButton,
  NeighbourhoodRow, OptionRow
} from './StyledCitiesAndNeighbourhoods'
import increasePopularity from '../../utils/icreasePopularity'

interface Props {
  city: City
  neighbourhoods: Neighbourhood[]
}

const CITY_IMAGE_PLACEHOLDER = 'https://store-images.s-microsoft.com/image/apps.47288.14188059920471079.8845931d-936f-4c5b-848c-e9700ef87a6b.92da2b6e-01a3-4806-8575-6f6278ecd71b?mode=scale&q=90&h=1080&w=1920&format=jpg'

const CitiesAndNeighbourhoods = ({ city, neighbourhoods }: Props) => {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const [descriptionOpaque, setDescriptionOpaque] = useState(true)
  const [optionsDisplay, setOptionsDisplay] = useState(false)
  const [optionsOpaque, setOptionsOpaque] = useState(true)
  const [linksOpaque, setLinksOpaque] = useState(true)
  const [linksDisplay, setLinksDisplay] = useState(false)


  const cityNeighbourhoods = neighbourhoods.filter((neighbourhood: Neighbourhood) => {
    return neighbourhood.city._id === city._id
  })

  const showCityOptions = () => {
    if (!descriptionExpanded) {
      setDescriptionExpanded(true)
      setOptionsDisplay(true)
      setTimeout(() => {
        setDescriptionOpaque(false)
        setOptionsOpaque(false)
      }, 400)
    }
  }

  const hideCityDescription = () => {
    setDescriptionOpaque(true)
    setOptionsOpaque(true)
    setLinksOpaque(true)
    setTimeout(() => {
      setDescriptionExpanded(false)
      setOptionsDisplay(false)
      setLinksDisplay(false)
    }, 400)
  }

  const switchToNeighbourhoods = () => {
    setOptionsOpaque(true)
    setTimeout(() => {
      setOptionsDisplay(false)
      setLinksDisplay(true)
    }, 400)
    setTimeout(() => {
      setLinksOpaque(false)
    }, 500)
  }


  return (
    <CityItemContainer>
      <CityImage backgroundImage={city.mainImageLink ? city.mainImageLink : CITY_IMAGE_PLACEHOLDER} onClick={showCityOptions}>
        <CityImageDescription expanded={descriptionExpanded}>
          <CloseButton show={descriptionExpanded} opaque={descriptionOpaque} onClick={hideCityDescription}>X</CloseButton>
          <p>{city.name}</p>
          <CityImageLinks show={descriptionExpanded} opaque={descriptionOpaque}>
            <Link href={`/city/${city._id}`}>
              <OptionRow show={descriptionExpanded && optionsDisplay} opaque={descriptionOpaque || optionsOpaque} onClick={() => increasePopularity(city._id)}>Entire city</OptionRow>
            </Link>
            <OptionRow show={descriptionExpanded && optionsDisplay} opaque={descriptionOpaque || optionsOpaque} onClick={switchToNeighbourhoods}>Neighbourhoods</OptionRow>
            {
              cityNeighbourhoods.map((cityNeighbourhood: Neighbourhood) => {
                return (
                  <Link href={`/neighbourhood/${cityNeighbourhood._id}`}>
                    <CityRow show={descriptionExpanded && linksDisplay} opaque={descriptionOpaque || linksOpaque} onClick={() => increasePopularity(city._id)}>{cityNeighbourhood.name}</CityRow>
                  </Link>
                )
              })
            }
          </CityImageLinks>
        </CityImageDescription>

      </CityImage>
      {/*<Link href={`/city/${city._id}`}>*/}
      {/*  <CityRow onClick={() => increasePopularity(city._id)}>{city.name}</CityRow>*/}
      {/*</Link>*/}
      {/*{neighbourhoodItems}*/}
    </CityItemContainer>
  )
}

export default CitiesAndNeighbourhoods
