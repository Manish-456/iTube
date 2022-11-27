import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 56px);
`;
const SignupWrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.bgLighter};
  padding: 20px 15px;
  border: 1px solid ${({ theme }) => theme.soft};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const SubTitle = styled.h2`
  font-size: 21px;
  font-weight: 500;
`;

const Input = styled.input`
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
`;

const More = styled.div`
  display: flex;
  font-size: 10px;
`;

const Links = styled.div`
  margin-left: 25px;
`;

const Linked = styled.span`
  margin-right: 15px;
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
`;
const SignUpLink = styled.div`
margin-top : 20px;
display : flex;
align-items : center;
gap : 20px;
`;
document.title = "iTube - Signin"
const Sign = styled.span`
font-size : 12px;


`;

const Signin = ({setProgress}) => {

  const [signInError, setSignInError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      setProgress(10)
      const res = await axios.post("/auth/signin", { email, password });
       setProgress(100)
      
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure());
      setSignInError(err.response.data.message);
    }
  };

  const signInWithGoogle = async () => {
    setProgress(10)
    dispatch(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        axios
          .post("/auth/google", {
            name: result.user.displayName,
            email: result.user.email,
            img: result.user.photoURL,
          })
          .then((res) => {
            dispatch(loginSuccess(res.data));
            
            setProgress(100)
          });
        navigate("/");
      })
      .catch((err) => {});
  };
  setTimeout(() => {
    setSignInError(null);
  }, 5000);
  return (
    <Container>
      <SignupWrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to iTube.com</SubTitle>
        <Input
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        {signInError && <Error>{signInError}</Error>}
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <SignUpLink>
          <Sign>Dont'have account ?</Sign>
        
            <Sign> <Link to="/signup" style={{color : "inherit"}}>Create new account          </Link></Sign>

        </SignUpLink>
      </SignupWrapper>
      <More>
        English(USA)
        <Links>
          <Linked>Help</Linked>
          <Linked>Privacy</Linked>
          <Linked>Terms and policy</Linked>
        </Links>
      </More>
    </Container>
  );
};

export default Signin;
