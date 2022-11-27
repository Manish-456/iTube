import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";

import axios from "axios";

const Avatar = styled.img`
width : 100%;
height : 500px;
object-fit : cover;
`
const Container = styled.div`
margin-top : 20px;`

const CardContainer = styled.div`
display : flex;
flex-wrap : wrap;
gap : 20px;
margin-top : 20px;
justify-content : center;
`



const Title = styled.h2`
 margin : 20px 0px;
text-align: center;
color : ${({theme}) => theme.textSoft}

`
const YourVideos = ({setProgress}) => {
  const [video, setVideo] = useState([])
 
  document.title = "Your Videos - iTube"
  useEffect(() => {
   const fetchOwnVideos = async() => {
    setProgress(10)
    const res = await axios.get('/videos/ownVideos')
    setProgress(100)
    setVideo(res.data)
   }
   fetchOwnVideos()
  }, [])
 
  return (
    <Container>

      <Avatar src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" />
       <Title>Your Videos</Title>
      <CardContainer>
   {video && video.map((video) => {
    return <Card key={video._id}type={"own"} video={video}/>
   })     }
     
       
      
      </CardContainer>
    </Container>
  );
};

export default YourVideos;
