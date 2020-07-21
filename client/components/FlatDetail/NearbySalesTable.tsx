import React from 'react'
import { TableContainerFull, TableItem, TableItemHeader, TableRow, TableRowHeader } from '../Table/StyledTable'

interface Props {
  nearbySales: {
    address: string
    pricePerMeter: number
    dateOfSale: string
    area: string
  }[]
}

const NearbySalesTable = ({ nearbySales }: Props) => {
  return (
    <TableContainerFull>
      <TableRowHeader>
        <TableItemHeader width={35}>Address</TableItemHeader>
        <TableItemHeader width={15}>Square Meters</TableItemHeader>
        <TableItemHeader width={25}>Price per meter</TableItemHeader>
        <TableItemHeader width={25} last={true}>Date</TableItemHeader>
      </TableRowHeader>
      {
        nearbySales.map((sale, index) => {
          return (
            <TableRow last={index + 1 === nearbySales.length}>
              <TableItem width={35}>{sale.address}</TableItem>
              <TableItem width={15}>{sale.area}</TableItem>
              <TableItem width={25}>CZK {sale.pricePerMeter.toLocaleString()},-</TableItem>
              <TableItem width={25} last={true}>{sale.dateOfSale}</TableItem>
            </TableRow>
          )
        })
      }
    </TableContainerFull>
  )
}

export default NearbySalesTable
