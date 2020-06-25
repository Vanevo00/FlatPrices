import React from 'react'
import Link from 'next/link'
import { EditButton as StyledEditButton } from '../StyledButtons'

interface Props {
  href: string
}

const EditButton = ({ href }: Props) => (
  <Link href={href}>
    <StyledEditButton>
      <i className='far fa-edit fa-2x'/>
    </StyledEditButton>
  </Link>
)


export default EditButton
