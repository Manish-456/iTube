import React from "react";
import styled from "styled-components";

import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { Link } from "react-router-dom";
import { useSelector} from 'react-redux'
import iTubeIcon from '../Assets/iTubeIcon.png'





const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  position: sticky;
  overflow : scroll;
  top: 0;
  font-size: 14px;

  ::-webkit-scrollbar{
    width : 0px
   }
   ::-webkit-scrollbar-track{
    background-color: ${({theme}) => theme.bgLighter};
   }
   ::-webkit-scrollbar-thumb{
    background-color: ${({theme}) => theme.bg};
   }
`;


const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  padding: 7.5px 0px;
  color: ${({ theme }) => theme.text};
`;

const Img = styled.img`
  height: 24px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div``;
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
gap: 5px`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;
const Menu = () => {

  const {currentUser} = useSelector(state => state.user)
   
 
  
  
  return (
    <Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo>
            <Img src={iTubeIcon} alt="itube logo" />
            iTube.com
          </Logo>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>

        <Link
          to="/trending"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </Link>
        <Link
          to="/subscription"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </Link>

        <Hr />
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
       <Link to="/watchlater" style={{textDecoration : "none", color : "inherit"}}>
       <Item>
          <WatchLaterOutlinedIcon />
          Watch Later
        </Item>
       </Link>
        <Hr />

       {!currentUser && <Login>
          Sign in to watch videos and upload your contents
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {" "}
            <Button>
              {" "}
              <AccountCircleOutlinedIcon /> SIGN IN
            </Button>{" "}
          </Link> 
            <Hr />
        </Login>}

        
        <Title>Best of iTube</Title>
       <Link to="/music" style={{textDecoration : "none", color : "inherit"}}> <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        </Link>
        <Link to="/sports" style={{textDecoration : "none", color : "inherit"}}><Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        </Link>
        <Link to="/gaming" style={{textDecoration : "none", color : "inherit"}}>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        </Link>
        
        <Link to="/movies" style={{textDecoration : "none", color : "inherit"}}>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        </Link>
        
        <Link to="/news" style={{textDecoration : "none", color : "inherit"}}>
        <Item>
          <ArticleOutlinedIcon />
          News
        </Item>
        </Link>
        
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon />
          Help
        </Item>
       
      </Wrapper>
    </Container>
  );
};

export default Menu;
