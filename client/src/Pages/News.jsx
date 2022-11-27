import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import styled from "styled-components";
import ReactPlayer from 'react-player'
const Container = styled.div`
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

const News = ({setProgress}) => {
  const location = useLocation();
  const tags = location.pathname.slice(1).toLowerCase();
  document.title = "iTube - News"
  const [video, setVideo] = useState([]);

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
  url={'https://youtu.be/reVy1pct30U'}
  playing={true}
  muted
  width={"100%"}
  height={"500px"}
/>}
<Title>Latest News</Title>
    <Container>
 
      {video&& video.map((video) => {
        return <Card video={video} key={video.videoId} />;
      })}
      
    </Container>
    </>
  );
};

export default News;
