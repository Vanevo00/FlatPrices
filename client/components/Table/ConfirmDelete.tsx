import React from 'react'
import { ConfirmButton, ConfirmDeleteContainer } from './StyledTable'

interface Props {
  address: string
  flatId: string
  selected: boolean
  confirmDelete: Function
}

const ConfirmDelete = ({address, flatId, selected, confirmDelete}: Props) => {
  const onClick = () => {
    confirmDelete(flatId)
  }

  return (
    <ConfirmDeleteContainer selected={selected}>
      Delete {address}?
      <ConfirmButton onClick={onClick}>Confirm</ConfirmButton>
    </ConfirmDeleteContainer>
  )
}

export default ConfirmDelete
