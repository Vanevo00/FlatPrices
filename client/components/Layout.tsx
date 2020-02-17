import React, { Fragment } from 'react'
import Head from 'next/head'
import GlobalStyle from './GlobalStyle'
import { ThemeProvider } from 'styled-components'
import theme from './ThemeProvider'
import Navbar from './Navbar/Navbar'

const Layout = (props: any) => {
  return (
    <Fragment>
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
        <title>{`Flat Prices${props.title ? ': ' + props.title : ''}`}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <Navbar/>
        {props.children}
        <script src="https://kit.fontawesome.com/3bca9cb446.js" crossOrigin="anonymous"></script>
      </ThemeProvider>
    </Fragment>
  )
}

export default Layout
