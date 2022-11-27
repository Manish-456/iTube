import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";



import { useNavigate } from "react-router-dom";


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

const Link = styled.span`
  margin-right: 15px;
`;
const Error = styled.span`
color : red;
 font-size : 12px;
`
const Signup = ({setProgress}) => {
 
   const [inputs, setInputs] = useState({})
 const [error, setError] = useState("")
  const navigate = useNavigate()
  document.title = "iTube - SignUp"
  const changeHandler = (e) => {
   setInputs(prev => {
    return {...prev , [e.target.name] : e.target.value}
   })
  }
  
  const handleSignUp = async () => {

   try {
    setProgress(10)
   await axios.post('/auth/signup', {
      ...inputs
     })
      setProgress(100)
     navigate('/signin')
   } catch (err) {
      setError(err.response.data.message)
   }

  };

 
  return (
    <Container>
      <SignupWrapper>
        <Title>Sign Up</Title>
       
        <Input
          placeholder="username"
           name="name"
           onChange={changeHandler}       
        />
        <Input
          placeholder="email"
         name="email"
          onChange={changeHandler}
        />
        <Input
          type="password"
          placeholder="password"
         name="password"
          onChange={changeHandler}
        />

        <Input placeholder="confirm password" name="confirmPassword"
          onChange={changeHandler}      
        />
        <Button onClick={handleSignUp}>Sign up</Button>
        <Error>{error}</Error>
      </SignupWrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms and policy</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Signup;
