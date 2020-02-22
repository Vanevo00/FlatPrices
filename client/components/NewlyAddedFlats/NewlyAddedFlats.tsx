import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  StyledLink,
  TableContainer,
  TableItem, TableItemButton,
  TableItemHeader,
  TableRow,
  TableRowHeader
} from '../Table/StyledTable'
import { Heading1 } from '../StyledHeadings'
import Spinner from '../Spinner/Spinner'

interface Flat {
  _id: string
  address: string
  priceCZK: number
  squareMeters: number
  pricePerMeter: number
  link?: string
  city: any
  neighbourhood: any
}

const NewlyAddedFlats = () => {
  const [newFlats, setNewFlats] = useState()

  const fetchFlats = async () => {
    const flats = await axios.get('http://localhost:4000/api/flats/new')
    setNewFlats(flats.data)
  }

  useEffect(() => {
    fetchFlats()
  }, [])

  return (
    <>
      <Heading1>Newest Flats</Heading1>
      <TableContainer>
        <TableRowHeader>
          <TableItemHeader width={22}>
            Address
          </TableItemHeader>
          <TableItemHeader width={12}>
            City
          </TableItemHeader>
          <TableItemHeader width={12}>
            Neighbourhood
          </TableItemHeader>
          <TableItemHeader width={10}>
            m<sup>2</sup>
          </TableItemHeader>
          <TableItemHeader width={16}>
            Price
          </TableItemHeader>
          <TableItemHeader width={16}>
            Price/m<sup>2</sup>
          </TableItemHeader>
          <TableItemHeader width={10}>
            Detail
          </TableItemHeader>
          <TableItemHeader width={3} last={true}>
            <i className="fas fa-globe-europe"/>
          </TableItemHeader>
        </TableRowHeader>

        {
          !newFlats
            ? <Spinner/>
            : newFlats.map((flat: Flat) => {
              return (
                <TableRow key={flat._id}>
                  <TableItem width={22}>
                    {flat.address}
                  </TableItem>
                  <TableItem width={12}>
                    {flat.city.name}
                  </TableItem>
                  <TableItem width={12}>
                    {flat.neighbourhood.name}
                  </TableItem>
                  <TableItem width={10}>
                    {flat.squareMeters}
                  </TableItem>
                  <TableItem width={16}>
                    {flat.priceCZK.toLocaleString()} CZK
                  </TableItem>
                  <TableItem width={16}>
                    {flat.pricePerMeter.toLocaleString()} CZK
                  </TableItem>
                  <TableItemButton width={10}>
                  Detail
                  </TableItemButton>
                  <TableItemButton width={3} last={true}>
                    <StyledLink href={flat.link} target='_blank'>
                      <i className="fas fa-globe-europe"/>
                    </StyledLink>
                  </TableItemButton>
                </TableRow>
              )
            })
        }

      </TableContainer>
    </>
  )
}

export default NewlyAddedFlats
