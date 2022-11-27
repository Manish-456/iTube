import React, { useEffect, useState } from 'react'
import Card from './Card'
import styled from 'styled-components'
import axios from 'axios';
const Container = styled.div`
  flex: 2;
`;
const Recomendation = ({tags}) => {
 const [video, setVideo] = useState([])

 useEffect(() => {
   const fetchTagVideo = async () => {
    const res = await axios.get(`/videos/tags?tags=${tags}`)
    setVideo(res.data)
   }
   fetchTagVideo()
 }, [tags])

 const clicHandler = async() => {

 }

  return (
    <Container>
     
   {video?.map(videos => {
   return <Card onClick={clicHandler} key={videos._id} video={videos} type="recommendation" />
   })
   }
    </Container>
  )
}

export default Recomendation
