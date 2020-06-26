import React, { useState } from 'react'
import { ExternalImageInputContainer, FormInput, UploadButton } from './StyledForm'
import axios from 'axios'

interface Props {
  callback: Function
}

const ExternalImageUpload = ({ callback }) => {
  const [imageAddress, setImageAddress] = useState<string>()

  const onClick = async () => {
    const response = await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/api/images/external`, {
      link: imageAddress,
      headers: 'application/json'
    })

    callback(response.data)
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
