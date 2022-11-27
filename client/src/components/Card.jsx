import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import TimeAgo from "timeago-react";
import axios from "axios";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import Alert from "./Alert";

const Main = styled.div`
  position: relative;
`;

const Container = styled.div`
  width: ${(props) => props.type !== "recommendation" && "360px"};
  margin-bottom: ${(props) =>
    props.type === "recommendation" ? "10px" : "45px"};
  cursor: pointer;
  display: ${(props) => props.type === "recommendation" && "flex"};
  gap: 10px;
`;
const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "recommendation" ? "100px" : "202px")};
  cursor: pointer;
  background-color: #999;
  flex: 1;
`;
const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "recommendation" && "16px"};
  flex: 1;
  position: relative;
  gap: 12px;
  color: ${({ theme }) => theme.text};
`;
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  display: ${(props) => props.type === "recommendation" && "none"};
  background-color: gray;
`;
const Texts = styled.div``;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
`;

const ChannelName = styled.h2`
  font-size: 14px;
  margin: 10px 0px;
`;
const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;
const Icon = styled.div`
  position: absolute;
  right: 15px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
`;
const More = styled.div`
  display: flex;

  flex-direction: column;
  position: absolute;
  right: -50px;
  top: 250px;
  background-color: ${({ theme }) => theme.bgLighter};
  gap: 10px;
  padding: 10px 20px;
  z-index: 999;
`;
const Item = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
const Card = ({ type, video }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [channel, setChannel] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const channelDetail = async () => {
      const res = await axios.get(`/users/find/${video?.userId}`);
      setChannel(res.data);
    };
    channelDetail();
  }, [video?.userId]);

  const WatchLaterHandler = async () => {
    try {
      await axios.patch(`/videos/addToWatchLaterVideo/${video?._id}`, {
        watchLater: true,
      });
      setAlert("Added to watch later");
      setOpen(false);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  setTimeout(() => {
    setAlert(null);
  }, 5000);

  const clickHandler = async () => {
    currentUser ? navigate(`/video/${video?._id}`) : navigate("/signin");
    try {
      await axios.put(`/videos/view/${video?._id}`);
    } catch (err) {}
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`/videos/${video._id}`);
      console.log("video deleted");
      navigate("/");
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <Main>
      <Container type={type} onClick={clickHandler} >
        <Image src={video?.imgUrl} alt="" type={type} />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={
              channel?.img ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
            }
          />
          <Texts>
            <Title>{video?.title}</Title>
            <ChannelName>
              {channel?.name} <VerifiedIcon style={{ fontSize: "12px " }} />
            </ChannelName>
            <Info>
              {video?.views} Views • <TimeAgo datetime={video?.createdAt} />
            </Info>
          </Texts>
          {type !== "recommendation" && (
            <Icon>
              <MoreVertIcon
               
                onMouseOver={() => setOpen(!open)} />
            </Icon>
          )}
        </Details>
      </Container>
      {type !== "recommendation" && (
        <>
          {open && (
            <More>
              {type !== "own" ? (
                <>
                  <Item onClick={WatchLaterHandler}>
                    <WatchLaterOutlinedIcon /> Watch Later
                  </Item>
                  <Item>
                    <FlagOutlinedIcon />
                    Report
                  </Item>
                </>
              ) : (
                <>
                  <Item onClick={() => navigate(`/updatevideo/${video?._id}`)}>
                    <ModeEditOutlinedIcon /> Edit
                  </Item>
                  <Item onClick={deleteHandler}>
                    <DeleteOutlineIcon /> Delete
                  </Item>
                </>
              )}
            </More>
          )}
        </>
      )}

      <Alert alert={alert} />
    </Main>
  );
};

export default Card;
