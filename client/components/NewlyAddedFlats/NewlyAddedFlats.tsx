import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  TableContainer,
  TableItem, TableItemButton,
  TableItemHeader,
  TableRow,
  TableRowHeader
} from '../Table/StyledTable'
import { Header1 } from '../StyledHeaders'
import Spinner from '../Spinner/Spinner'

interface Flat {
  address: string
  priceCZK: number
  squareMeters: number
  pricePerMeter: number
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
      <Header1>Newest Flats</Header1>
      <TableContainer>
        <TableRowHeader>
          <TableItemHeader width={25}>
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
          <TableItemHeader width={10} last={true}>
            Detail
          </TableItemHeader>
        </TableRowHeader>

        {
          !newFlats
            ? <Spinner/>
            : newFlats.map((flat: Flat) => {
              return (
                <TableRow>
                  <TableItem width={25}>
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
                  <TableItemButton width={10} last={true}>
                  Detail
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
