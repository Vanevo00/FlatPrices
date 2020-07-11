import React, { Component } from 'react'
import App from 'next/app'
import Head from 'next/head'
import AuthState from '../context/auth/AuthState'
import theme from '../components/ThemeProvider'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '../components/GlobalStyle'
import Navbar from '../components/Navbar/Navbar'
import NoMobile from '../components/NoMobile'

interface BaseProps {
  title?: string
}

class FlatPrices extends App<BaseProps> {
  render() {

    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" rel="stylesheet"/>
          <title>{'Flat Prices'}</title>
        </Head>
        <AuthState>
          <ThemeProvider theme={theme}>
            <GlobalStyle/>
            <NoMobile/>
            <Navbar/>
            <Component {...pageProps} />
            <script src="https://kit.fontawesome.com/3bca9cb446.js" crossOrigin="anonymous"/>
          </ThemeProvider>
        </AuthState>
      </>
    )
  }
}

export default FlatPrices
