import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
display : flex;
justify-content : space-between;
flex-wrap : wrap;

`;

const Movies = ({setProgress}) => {
  const location = useLocation();
  const tags = location.pathname.slice(1).toLowerCase();
  document.title = `iTube - Movies`
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
    { <Container>
      { video?.map((video) => {
        return <Card video={video} key={video.videoId} />;
      })}
    </Container>}</>
  );
};

export default Movies;
