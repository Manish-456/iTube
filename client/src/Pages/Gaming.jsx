import React, { useEffect, useState } from 'react'
import Styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styled from 'styled-components';
import ReactPlayer from 'react-player'

const Container = Styled.div`
display : flex;
justify-content : space-between;
flex-wrap : wrap;
margin-top : 20px;

`;
const Title = styled.h2`
 margin : 20px 0px;
text-align: center;
color : ${({theme}) => theme.textSoft}

`
const Gaming = ({setProgress}) => {
 const location = useLocation();
  const tags = location.pathname.slice(1).toLowerCase();
  const [video, setVideo] = useState([]);
  document.title = "iTube - Gaming"
  useEffect(() => {
   const fetchTagVideo = async () => {
   setProgress(10)
     const res = await axios.get(`/videos/tags?tags=${tags}`);
     setProgress(100)
     setVideo(res?.data);
   };
   fetchTagVideo();
 }, [tags]);

  return (
    <>
    {video &&   <ReactPlayer
  url={'https://youtu.be/EhFSiJu0I6M'}
  playing={true}
  muted
  width={"100%"}
  height={"500px"}
/>}
    <Title>Gaming</Title>
          <Container>
      {video &&
        video.map((video) => {
          return <Card key={video._id} video={video} />;
        })} 
    </Container>
    </>
  )
}

export default Gaming
