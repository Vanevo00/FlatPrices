import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import Spinner from '../../components/Spinner/Spinner'

interface Props {
  _id: string
}

const NeighbourhoodDetail = ({_id}: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [neighbourhood, setNeighbourhood] = useState()

  const fetchNeighbourhoodData = async () => {
    setIsLoading(true)
    const data = await axios.get(`http://localhost:4000/api/neighbourhoods/${_id}`)
    setNeighbourhood(data.data)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log(neighbourhood)
  }, [neighbourhood])

  useEffect(() => {
    fetchNeighbourhoodData()
  }, [])


  return (
    <Layout>
      {isLoading && <Spinner/>}
      {
        neighbourhood && neighbourhood.name
      }
    </Layout>
  )
}

NeighbourhoodDetail.getInitialProps = async (context: any) => {
  return {
    _id: context.query._id
  }
}

  export default NeighbourhoodDetail
