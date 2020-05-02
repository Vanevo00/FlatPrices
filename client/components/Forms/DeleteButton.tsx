import React, { useState } from 'react'
import { ConfirmDeleteIcons, DeleteButtonContainer, DeleteText, StyledDeleteButton } from './StyledForm'

interface Props {
  name: string
  callback: Function
}

const DeleteButton = ({name, callback }: Props) => {
  const [confirmationActive, setConfirmationActive] = useState(false)
  const [showText, setShowText] = useState(true)

  const onClick = () => {
    if (!confirmationActive) {
      setShowText(false)
      setTimeout(() => {
        setConfirmationActive(true)
      }, 300)
      setTimeout(() => {
        setShowText(true)
      }, 400)
    }
  }

  const undoClick = () => {
    setShowText(false)
    setTimeout(() => {
      setConfirmationActive(false)
    }, 300)
    setTimeout(() => {
      setShowText(true)
    }, 400)
  }

  return (
    <DeleteButtonContainer>
      <StyledDeleteButton onClick={onClick}>
        <DeleteText show={showText}>{confirmationActive ? 'Are you sure ?' : `Delete ${name}`}</DeleteText>
        <ConfirmDeleteIcons show={showText} showConfirm={confirmationActive}>
          <i className="fas fa-undo" onClick={undoClick}/>
          <i className="fas fa-trash-alt" onClick={() => callback()}/>
        </ConfirmDeleteIcons>
      </StyledDeleteButton>
    </DeleteButtonContainer>
  )
}

export default DeleteButton
