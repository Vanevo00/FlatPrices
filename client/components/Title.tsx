import React from 'react'
import Head from 'next/head'

interface Props {
  text: string
}

const Title = ({ text }: Props) => {
  return (
    <Head>
      <title>Flat Prices{text ? ` - ${text}` : ''}</title>
    </Head>
  )
}

export default Title
