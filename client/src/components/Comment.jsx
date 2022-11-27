import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import TimeAgo from "timeago-react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FlagIcon from "@mui/icons-material/Flag";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
  position: relative;
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;
const Text = styled.span`
  font-size: 14px;
`;

const Icon = styled.div`
  position: absolute;
  right: 0;
`;

const ManageComment = styled.div`
// width : 20%;
`;
const Items = styled.span`
  background-color: ${({ theme }) => theme.bgLighter};
  position : absolute;
  right : -60px;
  top : 24px;
  `;
const Item = styled.span`
  display: flex;
  font-size: 14px;
  gap: 10px;
  align-items: center;
`;
const TopIcon = styled.div`



`
const Comment = ({ comment }) => {

  const { currentUser } = useSelector((state) => state.user);
  
  const [open, setOpen] = useState(false);

  const [commenter, setCommenter] = useState([]);

 

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/users/find/${comment?.userId}`);
     
      setCommenter(res.data);
    };
    fetchComments();
  }, [comment]);
  

 const deleteHandler = async() => {
  try {
    
     await axios.delete(`/comments/${comment?._id}`)
  
     window.location.reload(true)

  } catch (err) {
    console.log(err.response.data.message)
  }
 }

  return (
    <Container>
      {commenter && (
        <>
          <Avatar
            src={`${
              commenter?.img ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
            }
          `}
            title={currentUser?.name}
          />
          <Icon>
            <TopIcon>   
            <MoreHorizIcon onClick={() => setOpen(!open)} /></TopIcon> 
            </Icon>

            <ManageComment>
              {open && (
                <Items>
                  {commenter?._id !== currentUser?._id && (
                    <Item>
                      <FlagIcon /> Report
                    </Item>
                  )}
                  {commenter?._id === currentUser?._id && (
                    <Item onClick={deleteHandler}>
                      <DeleteOutlineIcon /> Delete
                    </Item>
                  )}
                </Items>
              )}
            </ManageComment>
      
         
          <Details>
            <>
              {" "}
              <Name>
                {commenter?.name}{" "}
                <Date>
                  <TimeAgo datetime={comment?.createdAt} />
                </Date>
              </Name>
              <Text>{comment?.desc}</Text>
            </>
          </Details>
        </>
      )}
    </Container>
  );
};

export default Comment;
