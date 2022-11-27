import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "../components/Card";
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content : center;
`;

const Nothing = styled.div`
margin-top : 200px;
font-weight : 500;
font-size : 28px;
color : ${({theme}) => theme.textSoft};
`
const WatchLater = ({setProgress}) => {
  const [video, setVideo] = useState([]);
  const {currentUser} = useSelector((state) => state.user)
  document.title = "Watch Later - iTube"
  useEffect(() => {
    const getWatchLaterVideo = async () => {
      setProgress(10)
      const res = await axios.get("/videos/watchlatervideo");
      setProgress(100)
      setVideo(res.data);
    };
    getWatchLaterVideo();
  }, []);

  
  return (
    <Container>
     {currentUser ? <> {video &&
        video.map((videos) => {
          return <Card key={videos._id} video={videos} />;
        })}</> : <Nothing>Nothing to preview.. </Nothing>}
    </Container>
  );
};

export default WatchLater;
