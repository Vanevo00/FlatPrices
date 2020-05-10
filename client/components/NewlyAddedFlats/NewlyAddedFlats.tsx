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
import { Heading1Centered } from '../StyledHeadings'
import Spinner from '../Spinner/Spinner'
import { Flat } from '../../../Types/Flat'
import Link from 'next/link'
import Paginator from '../Table/Paginator'
import increasePopularity from '../../utils/icreasePopularity'

const PAGE_LIMIT = 30

const NewlyAddedFlats = () => {
  const [newFlats, setNewFlats] = useState([])
  const [newFlatsLoading, setNewFlatsLoading] = useState(false)
  const [count, setCount] = useState(0)

  const fetchFlats = async () => {
    const flats = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/new/${PAGE_LIMIT}`)
    setNewFlats(flats.data.newFlats)
    setCount(flats.data.flatCount)
  }

  const fetchNewPage = async (page) => {
    setNewFlatsLoading(true)
    const newFlats = await axios.get(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/new/${PAGE_LIMIT}?page=${page}`)
    setNewFlats(newFlats.data.newFlats)
    setNewFlatsLoading(false)
  }

  useEffect(() => {
    fetchFlats()
  }, [])

  return (
    <>
      <Heading1Centered>Newest Flats</Heading1Centered>
      <TableContainer>
        <TableRowHeader>
          <TableItemHeader width={16}>
            Address
          </TableItemHeader>
          <TableItemHeader width={12}>
            City
          </TableItemHeader>
          <TableItemHeader width={12}>
            Neighbourhood
          </TableItemHeader>
          <TableItemHeader width={6}>
            m<sup>2</sup>
          </TableItemHeader>
          <TableItemHeader width={16}>
            Price
          </TableItemHeader>
          <TableItemHeader width={16}>
            Price/m<sup>2</sup>
          </TableItemHeader>
          <TableItemHeader width={10}>
            Added on
          </TableItemHeader>
          <TableItemHeader width={10}>
            Detail
          </TableItemHeader>
          <TableItemHeader width={3} last={true}>
            <i className="fas fa-globe-europe"/>
          </TableItemHeader>
        </TableRowHeader>

        {
          newFlats.length < 1 || newFlatsLoading
            ? <Spinner/>
            : newFlats.map((flat: Flat) => {
              const createdAt = new Date(flat.createdAt)
              const date = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`

              return (
                <TableRow key={flat._id}>
                  <TableItem width={16}>
                    {flat.address}
                  </TableItem>
                  <TableItemButton width={12}>
                    <Link href={`/city/${flat.city._id}`}>
                      <a>
                        {flat.city.name}
                      </a>
                    </Link>
                  </TableItemButton>
                  <TableItemButton width={12}>
                    <Link href={`/neighbourhood/${flat.neighbourhood._id}`}>
                      <a>
                        {flat.neighbourhood.name}
                      </a>
                    </Link>
                  </TableItemButton>
                  <TableItem width={6}>
                    {flat.squareMeters}
                  </TableItem>
                  <TableItem width={16}>
                    {flat.priceCZK.toLocaleString()} CZK
                  </TableItem>
                  <TableItem width={16}>
                    {flat.pricePerMeter.toLocaleString()} CZK
                  </TableItem>
                  <TableItem width={10}>
                    {date}
                  </TableItem>
                  <TableItemButton width={10}>
                  Detail
                  </TableItemButton>
                  <TableItemButton width={3} last={true}>
                      <StyledLink href={flat.link} target='_blank' onClick={() => increasePopularity(flat.city._id)}>
                        <i className="fas fa-globe-europe"/>
                      </StyledLink>
                  </TableItemButton>
                </TableRow>
              )
            })
        }

        <Paginator pageLimit={PAGE_LIMIT} count={count} maxPages={12} loading={newFlatsLoading} callback={fetchNewPage}/>

      </TableContainer>
    </>
  )
}

export default NewlyAddedFlats
