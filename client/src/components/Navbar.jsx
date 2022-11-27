import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Upload from "./Upload";
import AccountMgmt from "./AccountMgmt";

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 56px;
  background-color: ${({ theme }) => theme.bgLighter};
  z-index: 999;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 20px;
  justify-content: flex-end;
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  padding: 5px;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.color};
  border-radius: 10px;
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;
const Button = styled.button`
padding : 5px 15px;
background-color : transparent;
border: 1px solid green,
border-radius : 3px;
color : cyan;
font-weight : 500;
cursor : pointer;
display : flex;
align-items : center;
gap: 5px

`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  font-size: 14px;
  font-weight: 500;
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  object-fit: cover;
`;

const Span = styled.span`
  font-weight: 500;
  font-size: 12px;
`;
const Navbar = ({ darkMode, setDarkMode}) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [que, setQue] = useState("");
  const [openAccBoard, setOpenAccBoard] = useState(false);

   
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              type="text"
              placeholder="search..."
              value={que}
              onChange={(e) => setQue(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={() => navigate(`/search?que=${que}`)}
            />
          </Search>

         
          {currentUser ? (
            <User>
              {currentUser && (
                <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              )}
              <Avatar
                src={`${
                  currentUser.img ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                }
          `}
                title={currentUser.name}
                onClick={() => setOpenAccBoard(!openAccBoard)}
              />
            </User>
          ) : (
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
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen}  />}
      {openAccBoard && (
        <AccountMgmt
          setOpenAccBoard={setOpenAccBoard}
          openAccBoard={openAccBoard}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

    </>
  );
};

export default Navbar;
