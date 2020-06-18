import React, { useState } from 'react'
import { ExternalImageInputContainer, FormInput, UploadButton } from './StyledForm'

const ExternalImageUpload = () => {
  const [imageAddress, setImageAddress] = useState<string>()

  const onClick = async () => {

  }

  return (
    <>
      <ExternalImageInputContainer>
        <FormInput
          type='text'
          name='mainImage'
          placeholder={'or upload an image from external address'}
          onChange={(e) => setImageAddress(e.target.value)}
          value={imageAddress}
        />
        <UploadButton onClick={onClick}>Upload from external address</UploadButton>
      </ExternalImageInputContainer>
    </>
  )
}

export default ExternalImageUpload
