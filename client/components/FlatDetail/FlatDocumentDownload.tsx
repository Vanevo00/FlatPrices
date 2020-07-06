import React from 'react'
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType
} from 'docx'
import { Flat } from '../../../Types/Flat'
import formatDate from '../../utils/formatDate'
import { WideButton } from '../StyledButtons'
import styled from 'styled-components'

interface Props {
  flat: Flat
  isLoading: boolean
  rentDescriptionText: string
  priceDescriptionText: string
}

interface tableRow {
  title: string
  data: string
}

const DocumentDownloadButton = styled(WideButton)`
  margin-top: 1rem;
  margin-bottom: 2rem;
`

const FlatDocumentDownload = ( { flat, isLoading, rentDescriptionText, priceDescriptionText }: Props ) => {
  const tableRows = [
    {
      title: 'Price',
      data: `CZK ${String(flat.priceCZK.toLocaleString())},-`
    },
    {
      title: 'Price per m2',
      data: `CZK ${parseInt(flat.pricePerMeter.toFixed(0)).toLocaleString()},-`
    },
    {
      title: 'Price Comparison',
      data: priceDescriptionText
    },
    {
      title: 'Rent analysis',
      data: rentDescriptionText
    },
    {
      title: 'Reason for sale',
      data: flat.reasonForSelling
    },
    {
      title: 'On the market (at least) since',
      data: flat.createdAt ? formatDate(flat.createdAt, false) : ''
    },
    {
      title: 'Flat ownership structure',
      data: flat.ownershipStructure
    },
    {
      title: 'Building ownership structure',
      data: flat.houseOwnershipStructure
    },
    {
      title: 'Ownership type',
      data: flat.ownershipType
    },
    {
      title: 'Last sale',
      data: flat.lastSale ? formatDate(flat.lastSale, false) : ''
    },
    {
      title: 'Expenses',
      data: `${flat.monthlyExpensesAssociation ? `Association (SVJ): ${flat.monthlyExpensesAssociation}` : ''}${flat.monthlyExpensesOther ? `, other: ${flat.monthlyExpensesOther}` : ''}`
    },
    {
      title: 'Flat renovation',
      data: flat.renovated ? formatDate(flat.renovated, false) : ''
    },
    {
      title: 'Building renovation',
      data: flat.houseRenovated ? formatDate(flat.houseRenovated, false) : ''
    },
    {
      title: 'Floor',
      data: flat.floor ? String(flat.floor) : ''
    },
    {
      title: 'Parking',
      data: typeof flat.parking === 'boolean' ? `${flat.parking ? 'yes' : 'no'}` : ''
    },
    {
      title: 'Balcony',
      data: typeof flat.balcony === 'boolean' ? `${flat.balcony ? 'yes' : 'no'}` : ''
    },
    {
      title: 'Garden',
      data: typeof flat.garden === 'boolean' ? `${flat.garden ? 'yes' : 'no'}` : ''
    },
    {
      title: 'Windows facing',
      data: ''
    },
    {
      title: 'Heating',
      data: flat.heating
    },
    {
      title: 'Public transport',
      data: flat.publicTransport
    },
    {
      title: 'Lift',
      data: typeof flat.lift === 'boolean' ? `${flat.lift ? 'yes' : 'no'}` : ''
    },
    {
      title: 'Mortgage',
      data: typeof flat.mortgaged === 'boolean' ? `${flat.mortgaged ? 'yes' : 'no'}` : ''
    },
    {
      title: 'Cadastral info',
      data: flat.cadastralInfo
    },
    {
      title: 'Other notes',
      data: flat.notes
    }
  ]

  const renderTableRows = (tableRows: tableRow[]) => {
    const finalRows = []

    tableRows.map((tableRow) => {
      finalRows.push(
        new TableRow({
          children: [
            new TableCell({
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                left: 200,
                right: 200,
                top: 100,
                bottom: 100
              },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: tableRow.title,
                      bold: true
                    })
                  ]
                })
              ]
            }),
            new TableCell({
              verticalAlign: VerticalAlign.CENTER,
              margins: {
                left: 200,
                right: 200,
                top: 100,
                bottom: 100
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.JUSTIFIED,
                  children: [
                    new TextRun({
                      text: tableRow.data
                    })
                  ]
                })
              ]
            }),
          ],
        })
      )
    })

    return finalRows
  }

  const downloadFlatInfo = async () => {
    const doc = new Document()

    doc.addSection({
      children: [
        new Paragraph({
          text: `${flat.city.name}, ${flat.address}, ${flat.squareMeters}m2`,
          heading: HeadingLevel.HEADING_1,
          spacing: {
            before: 0,
            after: 0
          }
        }),
        new Paragraph({
          text: `${flat.agency ? flat.agency : '[agency]'}, ${flat.contact ? flat.contact : '[contact]'}`,
          heading: HeadingLevel.HEADING_3,
          spacing: {
            before: 50,
            after: 0
          }
        }),
        new Paragraph({
          text: `visited on: ${flat.visited ? formatDate(flat.visited, false) : '[visited info]'}`,
          heading: HeadingLevel.HEADING_3,
          spacing: {
            before: 50,
            after: 100
          }
        }),
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: renderTableRows(tableRows)
        })
      ]
    })

    const docBlob = await Packer.toBlob(doc)
    const blobUrl = URL.createObjectURL(docBlob)
    window.location.replace(blobUrl)
  }

  console.log(isLoading)

  if (isLoading) {
    return null
  }

  return (
    <DocumentDownloadButton onClick={downloadFlatInfo}>Download flat information as .docx</DocumentDownloadButton>
  )
}

export default FlatDocumentDownload
