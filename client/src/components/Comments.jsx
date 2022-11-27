import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import axios from "axios";
import {  useSelector } from "react-redux";


// Style CSS
const Container = styled.div``;
const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  outline: none;
  pading: 5px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

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

const Comments = () => {
  const { currentVideo } = useSelector((state) => state.video);
 
  const [comments, setComments] = useState([]);



  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    desc: "",
  });
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/comments/${currentVideo?._id}`);
      setComments(res.data);
    };
    fetchComments();
  }, [currentVideo?._id]);

  const clickHandler = () => {
    setOpen(!open);
  };

  const postComment = async () => {
   
    try {
    await axios.post("/comments", {
        ...input,
        videoId: currentVideo?._id,
      });
  
      window.location.reload();
    } catch (error) {
  
    }
  };

  const cancelHandler = () => {
    setInput({ ...input, desc: "" });
    setOpen(false);
  };

  return (
    <Container>
      <NewComment onClick={clickHandler}>
        <Avatar
          src={`${
            currentUser.img ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
          }
          `}
        />
        <Input
          placeholder="Add a comment..."
          value={input.desc}
          onChange={(e) => setInput({ desc: e.target.value })}
        />
      </NewComment>
      {open && (
        <Buttons>
          <Button onClick={cancelHandler}>Cancel</Button>
          <Button onClick={postComment}>Comment</Button>
        </Buttons>
      )}
      {comments?.map((comment) => {
        return <Comment key={comment._id} comment={comment} />;
      })}
    </Container>
  );
};

export default Comments;
