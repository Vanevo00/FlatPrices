import React from 'react'
import { Flat } from '../../../Types/Flat'
import { DescriptionBody, DescriptionContainer, DescriptionHalfRow, DescriptionHeader } from './StyledFlatDetail'
import styled from 'styled-components'
import formatDate from '../../utils/formatDate'

interface Props {
  flat: Flat
}

const AdditionalDescriptionContainer = styled(DescriptionContainer)`
  margin-top: 1rem;
`

const AdditionalDescriptionBody = styled(DescriptionBody)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const AdditionalDescriptionItemTitle = styled.p`
  width: 50%;
  color: ${props => props.theme.colors.gray};
`

const AdditionalDescriptionItemData = styled.p`
  width: 50%;
`

const FlatAdditionalInfo = ({ flat }: Props) => {
  const tableRows = [
    {
      source: flat.reasonForSelling,
      title: 'Reason for sale',
      data: flat.reasonForSelling
    },
    {
      source: flat.ownershipStructure,
      title: 'Flat ownership structure',
      data: flat.ownershipStructure
    },
    {
      source: flat.houseOwnershipStructure,
      title: 'Building ownership structure',
      data: flat.houseOwnershipStructure
    },
    {
      source: flat.ownershipType,
      title: 'Ownership type',
      data: flat.ownershipType
    },
    {
      source: flat.lastSale,
      title: 'Last sale',
      data: flat.lastSale ? formatDate(flat.lastSale, false) : ''
    },
    {
      source: flat.monthlyExpensesAssociation,
      title: 'Expenses',
      data: `${flat.monthlyExpensesAssociation ? `Association (SVJ): CZK ${flat.monthlyExpensesAssociation} per month` : ''}${flat.monthlyExpensesOther ? `, other: CZK ${flat.monthlyExpensesOther} per month` : ''}`
    },
    {
      source: flat.renovated,
      title: 'Flat renovation',
      data: flat.renovated ? formatDate(flat.renovated, false) : ''
    },
    {
      source: flat.houseRenovated,
      title: 'Building renovation',
      data: flat.houseRenovated ? formatDate(flat.houseRenovated, false) : ''
    },
    {
      source: flat.floor,
      title: 'Floor',
      data: flat.floor ? String(flat.floor) : ''
    },
    {
      source: flat.parking,
      title: 'Parking',
      data: typeof flat.parking === 'boolean' ? `${flat.parking ? 'yes' : 'no'}` : ''
    },
    {
      source: flat.balcony,
      title: 'Balcony',
      data: typeof flat.balcony === 'boolean' ? `${flat.balcony ? 'yes' : 'no'}` : ''
    },
    {
      source: flat.garden,
      title: 'Garden',
      data: typeof flat.garden === 'boolean' ? `${flat.garden ? 'yes' : 'no'}` : ''
    },
    {
      source: flat.heating,
      title: 'Heating',
      data: flat.heating
    },
    {
      source: flat.publicTransport,
      title: 'Public transport',
      data: flat.publicTransport
    },
    {
      source: flat.lift,
      title: 'Lift',
      data: typeof flat.lift === 'boolean' ? `${flat.lift ? 'yes' : 'no'}` : ''
    },
    {
      source: flat.mortgaged,
      title: 'Mortgage',
      data: typeof flat.mortgaged === 'boolean' ? `${flat.mortgaged ? 'yes' : 'no'}` : ''
    },
    {
      source: flat.cadastralInfo,
      title: 'Cadastral info',
      data: flat.cadastralInfo
    },
    {
      source: flat.notes,
      title: 'Other notes',
      data: flat.notes
    }
  ]

  const rowsWithAvailableData = tableRows.filter((row) => row.source)

  if (rowsWithAvailableData.length === 0) {
    return null
  }

  return (
    <AdditionalDescriptionContainer>
      <DescriptionHeader>
        Additional information
      </DescriptionHeader>
      <AdditionalDescriptionBody loading={!flat}>
        {
          rowsWithAvailableData.map((row) => (
            <DescriptionHalfRow>
              <AdditionalDescriptionItemTitle>{row.title}:</AdditionalDescriptionItemTitle>
              <AdditionalDescriptionItemData>{row.data}</AdditionalDescriptionItemData>
            </DescriptionHalfRow>
          ))
        }
      </AdditionalDescriptionBody>

    </AdditionalDescriptionContainer>
  )
}

export default FlatAdditionalInfo
