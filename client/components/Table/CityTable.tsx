import React, { useState } from 'react'
import axios from 'axios'
import { Flat } from '../../../Types/Flat'
import {
  ArrowDown,
  ArrowUp,
  StyledLink,
  TableContainerFull,
  TableItem,
  TableItemButton, TableItemDeleteButton,
  TableItemHeader,
  TableRow,
  TableRowHeader
} from './StyledTable'
import ConfirmDelete from './ConfirmDelete'
import Spinner from '../Spinner/Spinner'
import Paginator from './Paginator'
import { User } from '../../../Types/User'
import formatDate from '../../utils/formatDate'

interface Props {
  flats: Flat[]
  user: User
  medianPrice: number
  isLoading: boolean
  pageLimit: number
  count: number
  callback: Function
  flatsLoading: boolean
}

const CityTable = ({ flats, user, medianPrice, isLoading, pageLimit, count, callback, flatsLoading }: Props) => {
  const [selectedForDelete, setSelectedForDelete] = useState('')

  const handleDeleteClick = (_id: string) => {
    if (_id === selectedForDelete) {
      setSelectedForDelete(null)
    } else {
      setSelectedForDelete(_id)
    }
  }

  const confirmDelete = async (_id: string) => {
    await axios.delete(`${window.location.protocol}//${window.location.hostname}:4000/api/flats/${_id}`)
    location.reload()
  }

  return (
    <TableContainerFull>
      <TableRowHeader>
        <TableItemHeader width={14}>
          Name
        </TableItemHeader>
        <TableItemHeader width={8}>
          Dispositions
        </TableItemHeader>
        <TableItemHeader width={10}>
          Agency
        </TableItemHeader>
        <TableItemHeader width={9}>
          Neighbourhood
        </TableItemHeader>
        <TableItemHeader width={5}>
          m<sup>2</sup>
        </TableItemHeader>
        <TableItemHeader width={12}>
          Price
        </TableItemHeader>
        <TableItemHeader width={10}>
          Price/m<sup>2</sup>
        </TableItemHeader>
        <TableItemHeader width={10}>
          <i className="fas fa-long-arrow-alt-up"/>
          <i className="fas fa-long-arrow-alt-down"/>
        </TableItemHeader>
        <TableItemHeader width={12}>
          Date Added
        </TableItemHeader>
        <TableItemHeader width={5}>
          Detail
        </TableItemHeader>
        <TableItemHeader width={3}>
          <i className="fas fa-globe-europe"/>
        </TableItemHeader>
        {
          user && user.isAdmin &&
          <TableItemHeader width={3} last={true}>
            <i className="fas fa-trash"/>
          </TableItemHeader>
        }
      </TableRowHeader>

      {
        isLoading || flatsLoading ? <Spinner/> : flats.map((flat) => {
          const priceComparison = Math.ceil(flat.pricePerMeter - medianPrice)

          return (
            <TableRow key={flat._id}>
              <TableItem width={14}>
                {flat.address}
              </TableItem>
              <TableItem width={8}>
                {flat.rooms}
              </TableItem>
              <TableItem width={10}>
                {flat.agency}
              </TableItem>
              <TableItemButton width={9}>
                <StyledLink href={flat.neighbourhood ? `/neighbourhood/${flat.neighbourhood._id}` : '#'}>
                  {flat.neighbourhood ? flat.neighbourhood.name : 'Unknown'}
                </StyledLink>
              </TableItemButton>
              <TableItem width={5}>
                {flat.squareMeters}
              </TableItem>
              <TableItem width={12}>
                {flat.priceCZK.toLocaleString()} CZK
              </TableItem>
              <TableItem width={10}>
                {Math.ceil(flat.pricePerMeter).toLocaleString()} CZK
              </TableItem>
              <TableItem width={10}>
                {priceComparison > 0
                  ? <ArrowUp className="fas fa-long-arrow-alt-up"/>
                  : <ArrowDown className="fas fa-long-arrow-alt-down"/>}
                {priceComparison.toLocaleString()} CZK
              </TableItem>
              <TableItem width={12}>
                {formatDate(flat.createdAt, true)}
              </TableItem>
              <TableItemButton width={5}>
                <StyledLink href={`/flat/${flat._id}`} target='_blank'>
                  Detail
                </StyledLink>
              </TableItemButton>
              <TableItemButton width={3}>
                <StyledLink href={flat.link} target='_blank'>
                  <i className="fas fa-globe-europe"/>
                </StyledLink>
              </TableItemButton>
              {
                user && user.isAdmin &&
                <TableItemDeleteButton width={3} last={true} onClick={() => handleDeleteClick(flat._id)}>
                  <i className="fas fa-trash"/>
                  <ConfirmDelete address={flat.address} flatId={flat._id} selected={flat._id === selectedForDelete} confirmDelete={confirmDelete}/>
                </TableItemDeleteButton>
              }
            </TableRow>
          )
        })
      }
      <Paginator
        pageLimit={pageLimit}
        count={count}
        maxPages={12}
        loading={flatsLoading}
        callback={callback}
      />
    </TableContainerFull>
  )
}

export default CityTable
