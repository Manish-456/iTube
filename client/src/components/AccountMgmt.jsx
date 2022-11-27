import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut } from "../redux/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';
import FeedbackIcon from '@mui/icons-material/Feedback';
import FeedBack from "./FeedBack";
const Container = styled.div`
  border: 1px solid gray;
  position: fixed;
  right: 0;
  width: 300px;
  background-color: ${({theme}) => theme.bg}};
  padding: 10px;
  z-index : 999;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex-direction: column;
 
`;
const Avatar = styled.img`
  height: 33px;
  width: 33px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserDetails = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const Name = styled.h3`
  font-size: 14px;
  font-weight: 500;
`;
const Email = styled.span`
  font-size: 13px;
  font-weight: 400;
`;
const LogOut = styled.div``;
const Button = styled.button`
padding : 5px 15px;
background-color : transparent;
border: 1px solid green,
border-radius : 3px;
color : cyan;
font-weight : 500;
margin-top : 10px;
cursor : pointer;
display : flex;
align-items : center;
gap: 5px;
font-size : 13px;
width : 100%;
justify-content : center;
`;

const Hr = styled.hr`
  margin: 10px 0px;
  width: 100%;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 13px;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const AccountItems = styled.div`
  margin-top: 10px;
`;
const AccountManageMent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
`;
const AccountItem = styled.div`
  display: flex;
  font-size: 13px;
  align-items: center;
  gap: 20px;
  justify-content: space-around;
  width: 200px;
  padding-left: 27px;
`;

const AccountMgmt = ({ darkMode, setDarkMode, openAccBoard, setOpenAccBoard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openManager, setOpenManager] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [openFeedBack, setOpenFeedBack] = useState(false)
  const logOutHandler = async () => {
    try {
      // await axios.get("/auth/logOut");
      dispatch(logOut());
      setOpenAccBoard(!openAccBoard)
      navigate("/");
    } catch (error) {}
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`/users/${currentUser?._id}`);
      navigate("/signin");
      await axios.delete(`/videos/deleteAllVideos/${currentUser?._id}`)
      dispatch(logOut());
      setOpenAccBoard(!openAccBoard)
    } catch (err) {}
  };
  return (
    <Container>
      <Wrapper>
        <Avatar
          src={`${
            currentUser?.img ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
          }
          `}
          title={currentUser?.name}
        />

        <Name>{currentUser?.name}</Name>
        <Email>{currentUser?.email}</Email>
      </Wrapper>{" "}
     {!openFeedBack && <UserDetails>
        <AccountItems>
          <AccountItem>
            Manage your account
            {!openManager ? (
              <KeyboardArrowDownOutlinedIcon
                onClick={() => setOpenManager(!openManager)}
              />
            ) : (
              <KeyboardArrowUpOutlinedIcon
                onClick={() => setOpenManager(!openManager)}
              />
            )}
          </AccountItem>

          {openManager && (
            <AccountManageMent>
              <Hr />
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/editProfile/${currentUser?._id}`}
              >
                <AccountItem>
                  Edit Account
                  <BorderColorOutlinedIcon />
                </AccountItem>
              </Link>
              <AccountItem>
                Delete Account
                <DeleteForeverOutlinedIcon onClick={deleteHandler} />
              </AccountItem>
            </AccountManageMent>
          )}
        </AccountItems>
        <Hr />
        <Item onClick={() => navigate("/personal")}>
          <VideoSettingsIcon />
          Your Videos
           
        </Item>

        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
        <Item onClick={() => setOpenFeedBack(!openFeedBack)}>
          <FeedbackIcon  /> Feedback
        </Item>

        {currentUser && (
          <LogOut>
            <Button onClick={logOutHandler}>
              {" "}
              <LogoutIcon  /> Log Out
            </Button>
            <Hr />
          </LogOut>
        )}
      
      </UserDetails>}
      
      {openFeedBack && <>
       <Hr/>
      <FeedBack setOpenFeedBack={setOpenFeedBack} openFeedBack={openFeedBack} /></> }
    </Container>
  );
};

export default AccountMgmt;
