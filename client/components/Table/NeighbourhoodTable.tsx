import React from 'react'
import { Flat } from '../Types/Flat'
import {
  ArrowDown,
  ArrowUp,
  StyledLink,
  TableContainerFull,
  TableItem,
  TableItemButton,
  TableItemHeader,
  TableRow,
  TableRowHeader
} from './StyledTable'

interface Props {
  flats: Flat[]
  medianPrice: number
}

const NeighbourhoodTable = ({ flats, medianPrice }: Props) => {
  return (
    <TableContainerFull>
      <TableRowHeader>
        <TableItemHeader width={14}>
          Name
        </TableItemHeader>
        <TableItemHeader width={8}>
          Dispositions
        </TableItemHeader>
        <TableItemHeader width={19}>
          Agency
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
          <i className="fas fa-long-arrow-alt-down"></i>
        </TableItemHeader>
        <TableItemHeader width={10}>
          Date Added
        </TableItemHeader>
        <TableItemHeader width={10}>
          Detail
        </TableItemHeader>
        <TableItemHeader width={3} last={true}>
          <i className="fas fa-globe-europe"/>
        </TableItemHeader>
      </TableRowHeader>

      {
        flats.map((flat) => {
          const createdAt = new Date(flat.createdAt)
          const date = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`
          const priceComparison = Math.ceil(flat.pricePerMeter - medianPrice)

          return (
            <TableRow key={flat._id}>
              <TableItem width={14}>
                {flat.address}
              </TableItem>
              <TableItem width={8}>
                {flat.rooms}
              </TableItem>
              <TableItem width={19}>
                {flat.agency}
              </TableItem>
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
              <TableItem width={10}>
                {date}
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
    </TableContainerFull>
  )
}

export default NeighbourhoodTable
