import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
display : flex;
flex-wrap : wrap;
gap : 10px;`

const NotFound = styled.h3`
color : ${({theme}) => theme.text}
`

const Search = ({setProgress}) => {
 const [video, setVideo] = useState([])
 const location = useLocation()
 const query = location.search
 


useEffect(() => {
 const fetchResult = async() => {
  setProgress(10)
  const res = await axios.get(`/videos/search${query}`)
 setProgress(100)
  setVideo(res.data)
 }
 fetchResult()
}, [query])

 return (
    <Container>
    {
    video?.map((videos) => {
      return <Card key={videos._id} video={videos} />

     }) 
    }

    </Container>
  )
}

export default Search
