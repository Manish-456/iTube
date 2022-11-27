import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
const Container = styled.div`
display : flex;
justify-content : space-between;
flex-wrap : wrap;
margin-top : 20px;
`
const Title = styled.h2`
 margin : 20px 0px;
text-align: center;
color : ${({theme}) => theme.textSoft}

`

const Sports = ({setProgress}) => {
const location = useLocation()
const tags = location.pathname.slice(1).toLowerCase()
document.title = "iTube - Sports"
 const [video, setVideo] = useState([])

 useEffect(() => {
  const fetchTagVideo = async () => {
    setProgress(10)
   const res = await axios.get(`/videos/tags?tags=${tags}`)
   setProgress(100)
   setVideo(res?.data)
  }
  fetchTagVideo()

 }, [tags])

  return (
    <>
    {video &&   <ReactPlayer
  url={'https://youtu.be/vEibZhS64s4'}
  playing={true}
  muted
  width={"100%"}
  height={"500px"}
/>}
<Title>Sports</Title>
    <Container>
     {video.map((video) => {
            return <Card key={video.videoId} video={video} />
     })
     }
      </Container>
      </>
  )
}

export default Sports
