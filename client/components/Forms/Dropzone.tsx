import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { DragNDrop, DropzoneContainer, ImagePreview, ImagePreviewContainer, UploadContainer } from './StyledForm'
import axios from 'axios'

interface Props {
  activeDragText: string
  emptyZoneText: string
  multipleFiles: boolean
  callback: Function
  maxSize?: number
  imagePreview?: string
}

const Dropzone = ({ activeDragText, emptyZoneText, multipleFiles, maxSize = 10000000, callback, imagePreview }: Props) => {
  const [imageLoading, setImageLoading] = useState(false)

  const onDrop = useCallback(async (acceptedFiles) => {
    setImageLoading(true)
    const formData = new FormData()
    formData.append('image', acceptedFiles[0])
    const response = await axios.post(`${window.location.protocol}//${window.location.hostname}:4000/api/images`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    callback(response.data)
    setImageLoading(false)
  }, [])

  const {getRootProps, getInputProps, acceptedFiles, isDragActive} = useDropzone({
    multiple: multipleFiles,
    maxSize,
    onDrop
  })

  const renderDropzoneText = () => {
    if (acceptedFiles.length > 0) {
      return acceptedFiles.map((file: any) => (
        <p key={file.name}>{file.path} - {(file.size / 1000000).toFixed(2)} MB</p>
      ))
    }
    if (isDragActive) {
      return <p>{activeDragText}</p>
    }
    return (
      <>
        <p>{emptyZoneText}</p>
        <p>(max. {maxSize / 1000000} MB)</p>
      </>
    )
  }

  return (
    <DropzoneContainer>
      <UploadContainer>
        <DragNDrop {...getRootProps()}>
          <input {...getInputProps()}/>
          {renderDropzoneText()}
        </DragNDrop>
      </UploadContainer>
      <ImagePreviewContainer>
        {imageLoading && <p>Uploading image...</p>}
        {
          imagePreview && !imageLoading &&
          <ImagePreview src={imagePreview} alt='image preview'/>
        }
        {
          !imagePreview && !imageLoading &&
          <ImagePreview src='https://www.agora-gallery.com/advice/wp-content/uploads/2015/10/image-placeholder-300x200.png' alt='no image'/>
        }
      </ImagePreviewContainer>
    </DropzoneContainer>
  )
}

export default Dropzone
