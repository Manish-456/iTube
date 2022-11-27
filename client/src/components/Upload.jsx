import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import app from "../Firebase";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Container = styled.div`
  width: 50%;
  height: 50%;
  position: absolute;
  // z-index : 999;
   top : 200px;
   left : 500px;
  // background-color: #000000d1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  
 padding : 20px;
 width: 512px;
 height: 627px;
  background-color: ${({ theme }) => theme.bgLighter};
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index : 1000;
  position: relative;
`;
const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  // border: 1px solid ${({ theme }) => theme.soft};
  border : none;
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  background-color: transparent;
  padding: 10px;
`;
const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  background-color: transparent;
  padding: 10px;
`;
const Button = styled.button`
  border-radius: 2px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  
  &::disabled {
    color : red;
  }
  
  `;
const Label = styled.label`
  font-size: 14px;
`;
const Upload = ({ setOpen}) => {
  const navigate = useNavigate();
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [tags, setTags] = useState([]);
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
 
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
   
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setInputs((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async () => {
   const res = await axios.post("/videos", {
      ...inputs,
      tags,
    });



    setOpen(false);
    navigate(`/video/${res.data._id}`);
  };
  

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}><HighlightOffOutlinedIcon /></Close>
        <Title>Upload a New Content</Title>
        <Label>Video</Label>
        {videoPerc > 0 ? (
          `Uploading ${videoPerc}%`
        ) : (
          <Input
            type="file"
            name="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
          />
        )}
        <Label>Title</Label>
        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <Label>Description</Label>
        <Desc
          placeholder="Description"
          rows={8}
          name="desc"
          onChange={handleChange}
        />
        <Label>Tags</Label>
        <Input
          type="text"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value.split(","))}
        />
        <Label>Image</Label>
        {imgPerc > 0 ? (
          `Uploading images ${imgPerc}%`
        ) : (
          <Input
            type="file"
            name="file"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <Button disabled = {!inputs && true} onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
