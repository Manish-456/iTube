import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";


const Container = Styled.div`
display : flex;
justify-content : center;
gap : 20px;
flex-wrap : wrap;


`;

const Home = ({ type, setProgress }) => {
  const [videos, setVideos] = useState([]);
  type === "trending" ? document.title = `iTube - ${type}` : document.title = "iTube"
  useEffect(() => {

    const randomVideos = async () => {
     setProgress(10)
      const res = await axios.get(`/videos/${type}`);
      setProgress(100)
      setVideos(res.data);
    
    };
    randomVideos();
  }, [type]);

  return (
    <>
    <Container>

     
      {videos &&
        videos.map((video) => {
          return <Card key={video._id} video={video} />;
        })}
     
    </Container>
  
   </> );

};

export default Home;
