import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import DownloadForOfflineOutlinedIcon from "@mui/icons-material/DownloadForOfflineOutlined";

import Comments from "../components/Comments";

import { useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  disLikes,
  fetchFailure,
  fetchSuccess,
  likes,
} from "../redux/videoSlice";
import TimeAgo from "timeago-react";
import ThumbUp from "@mui/icons-material/ThumbUp";
import ThumbDown from "@mui/icons-material/ThumbDown";
import { subscription } from "../redux/userSlice";
import Recomendation from "../components/Recomendation";


import VerifiedIcon from '@mui/icons-material/Verified';


const Container = styled.div`
  display: flex;
  gap: 24px;
 
`;

const Content = styled.div`
  flex: 5;
`;

const VideoWrapper = styled.div``;
const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;
const Buttons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;
const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetails = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;
const ChannelName = styled.span`
  font-weight: 500;
`;
const ChannelSubscriber = styled.span`
color: ${({ theme }) => theme.textSoft};

margin-top : 5px;
margin-bottom : 20px;
font-size: 12px;
font-weight: 400;
}
`;
const Description = styled.p`
  font-size: 14px;
`;
const SubscribeButton = styled.button`
  background-color: #c00;
  border-radius: 2px;
  font-weight: 500;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;



const VideoFrame = styled.video`
max-height : 750px;
width : 100%`

const Video = ({setProgress}) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [channel, setChannel] = useState({});
  document.title = `${currentVideo?.title} - iTube`
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setProgress(10)
        const videoRes = await axios.get(`/videos/find/${path}`);
       setProgress(100)
       
        dispatch(fetchSuccess(videoRes.data));
        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );

        setChannel(channelRes.data);
      } catch (err) {
        dispatch(fetchFailure(err));
      }
    };
    fetchVideo();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      await axios.put(`/users/like/${currentVideo._id}`);
      dispatch(likes(currentUser?._id));
    } catch (err) {
    
    }
  };

  const handleDislike = async () => {
    try {
      await axios.put(`/users/dislike/${currentVideo._id}`);
      dispatch(disLikes(currentUser?._id));
    } catch (err) {
    
    }
  };

  const subscribeHandler = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsubs/${channel._id}`)
      : await axios.put(`/users/subs/${channel._id}`);
      dispatch(subscription(channel._id))

  };


  return (
    <Container>
      <Content>
        <VideoWrapper>
        <VideoFrame src={currentVideo?.videoUrl} controls />
 
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} Views •{" "}
            {<TimeAgo datetime={currentVideo?.createdAt} />}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes.includes(currentUser?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes.includes(currentUser._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownOutlinedIcon />
              )}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <DownloadForOfflineOutlinedIcon /> Download
            </Button>
            <Button>
              <AddTaskOutlinedIcon />
              Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image
              src={channel?.img ||  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"}
              alt="channelimage"
            />
            <ChannelDetails>
              <ChannelName>{channel?.name} <VerifiedIcon style={{fontSize : "12px "}}/></ChannelName>
              <ChannelSubscriber>
                {channel?.subscribers?.length} subscribers
              </ChannelSubscriber>
              <Description>{currentVideo?.desc}</Description>
            </ChannelDetails>
          </ChannelInfo>
          <SubscribeButton onClick={subscribeHandler}>
            {currentUser.subscribedUsers?.includes(channel?._id)
              ? "Subscribed"
              : "Subscribe"}
          </SubscribeButton>
        </Channel>
        <Hr />
        <Comments />
      </Content>

      <Recomendation tags={currentVideo?.tags}/>
    </Container>
  );
};

export default Video;
