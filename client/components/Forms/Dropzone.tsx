import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { DragNDrop } from './StyledForm'

interface Props {
  activeDragText: string
  emptyZoneText: string
  multipleFiles: boolean
  name: string
  callback: Function
  maxSize?: number
}

const Dropzone = ({activeDragText, emptyZoneText, multipleFiles, name, maxSize = 10000000, callback }: Props) => {
  const onDrop = useCallback(acceptedFiles => {
    callback(acceptedFiles)
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
    <DragNDrop {...getRootProps()}>
      <input {...getInputProps()} name={name}/>
      {renderDropzoneText()}
    </DragNDrop>
  )
}

export default Dropzone
