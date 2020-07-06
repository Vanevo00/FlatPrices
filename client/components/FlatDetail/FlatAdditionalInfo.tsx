import React from 'react'
import { Flat } from '../../../Types/Flat'
import { DescriptionBody, DescriptionContainer, DescriptionHalfRow, DescriptionHeader } from './StyledFlatDetail'
import styled from 'styled-components'

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
  width: 30%;
  color: ${props => props.theme.colors.lightGray};
`

const AdditionalDescriptionItemData = styled.p`
  width: 70%;
`

const FlatAdditionalInfo = ({ flat }: Props) => {
  return (
    <AdditionalDescriptionContainer>
      <DescriptionHeader>
        Additional information
      </DescriptionHeader>
      <AdditionalDescriptionBody loading={!flat}>
        <DescriptionHalfRow>
          <AdditionalDescriptionItemTitle>Pes:</AdditionalDescriptionItemTitle>
          <AdditionalDescriptionItemData>Dva psi</AdditionalDescriptionItemData>
        </DescriptionHalfRow>
        <DescriptionHalfRow>
          <AdditionalDescriptionItemTitle>Pes:</AdditionalDescriptionItemTitle>
          <AdditionalDescriptionItemData>Dva psi</AdditionalDescriptionItemData>
        </DescriptionHalfRow>
        <DescriptionHalfRow>
          <AdditionalDescriptionItemTitle>Pes:</AdditionalDescriptionItemTitle>
          <AdditionalDescriptionItemData>Dva psi</AdditionalDescriptionItemData>
        </DescriptionHalfRow>
      </AdditionalDescriptionBody>

    </AdditionalDescriptionContainer>
  )
}

export default FlatAdditionalInfo
