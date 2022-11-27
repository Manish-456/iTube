import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../Firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/userSlice";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;
const Update = styled.h1`
  color: Cyan;
  font-size: 15px;
  font-weight: 500;
`;

const UpdateInputs = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const Avatar = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  padding: 10px;
`;
const Label = styled.label`
  cursor: pointer;
  position: absolute;
  top: 115px;
  margin-left: 77px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  border: 1px solid cyan;
  padding: 10px 20px;
  font-size: 15px;
  margin-top: 10px;
  border-radius: 5px;
`;
const EditAccount = ({setProgress}) => {
  const [img, setImg] = useState(undefined);
  const [inputs, setInputs] = useState({});

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
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

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
  const dispatch = useDispatch();
  useEffect(() => {
    img && uploadFile(img, "img");
  }, [img]);
  const handleUpload = async () => {
    setProgress(10)
    const res = await axios.put(`/users/${currentUser?._id}`, {
      ...inputs,
    });
    
    dispatch(loginSuccess(res.data));
    setProgress(100)
    navigate("/");
  };

  const { currentUser } = useSelector((state) => state.user);
 
  return (
    <Container>
      <Wrapper>
        <Update>Update Your Profile</Update>
        <Avatar
        src={img ? URL.createObjectURL(img) : currentUser?.img}
        />
        <Label htmlFor="file">
          <CameraAltIcon />
        </Label> 
        <Input
          type="file"
          name="file"
          id="file"
          style={{ display: "none" }}
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <UpdateInputs>
          <Input placeholder="username" name="name" onChange={handleChange} />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <Button onClick={handleUpload}>Update</Button>
        </UpdateInputs>
      </Wrapper>
    </Container>
  );
};

export default EditAccount;
