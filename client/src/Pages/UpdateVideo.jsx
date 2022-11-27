import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../Firebase";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { loginSuccess } from "../redux/userSlice";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: ${({ theme }) => theme.bgLighter};
`;
const Title = styled.h1`
  font-size: 15px;

  color: ${({ theme }) => theme.textSoft};
  font-weight: 400;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Label = styled.label`
  padding: 10px 12px;
`;
const Input = styled.input`
  border: none;
  border-bottom: 1px solid cyan;
  outline: none;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 16px;
  padding: 10px 20px;
`;

const Button = styled.button`
  width: 40%;

  margin: 10px auto;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: 1px solid cyan;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  cursor: pointer;
`;


const UpdateVideo = ({setProgress}) => {

  // const {currentUser} = useSelector((state) => state.user)
  const location  = useLocation()
  const id = location.pathname.split("/")[2]
  const [img, setImg] = useState(undefined);
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const navigate = useNavigate();
  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {


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
    img && uploadFile(img, "imgUrl");
  }, [img]);
  
  const handleUpload = async () => {
    setProgress(10)
    const res = await axios.put(`/videos/${id}`, {
      ...inputs,
    });
    setProgress(100)
    dispatch(loginSuccess(res.data));

    navigate("/");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Update Video</Title>

        <Details>
          <Input placeholder="Title" 
          name = "title"
          onChange={handleChange}
          />
          <Label htmlFor="file"
          
          >Thumbnail</Label>
          <Input type="file" 
          onChange={(e) => setImg(e.target.files[0])}
          accept="image/*" name="file" id="file" />
          <Button  onClick={handleUpload}>Update</Button>
        </Details>
      </Wrapper>
    </Container>
  );
};

export default UpdateVideo;
