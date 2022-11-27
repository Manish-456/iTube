import React, {  useRef, useState } from 'react'
import styled from 'styled-components'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import Alert from './Alert';
const Container = styled.div`
 display : flex;
 align-items :center;
 justify-content : center;
 margin-top : 10px;
 gap : 10px;
 flex-direction : column;
 position : relative;
`
const Icon = styled.div`
position : absolute;
right : 0;
top : 0px;

`
const Wrapper = styled.div`
margin-top : 20px;
gap : 10px;
display : flex;
flex-direction : column;
`
const Title = styled.h5`
align-items : center;
font-size : 12px;
font-weight : 500;
color : ${({theme}) => theme.textSoft}


`
const Form = styled.form`
display : flex;
flex-direction : column;
gap : 15px;
margin-top : 20px;
`
const TextArea = styled.textarea`
background-color : transparent;
color : ${({theme}) => theme.text};
padding : 10px;
`
const Button = styled.button`
width : 50%;
margin:auto;
border-radius : 5px;
color : cyan;
background-color : ${({theme}) => theme.bgLighter};
border : 1px solid ${({theme}) => theme.textSoft};
padding : 5px 10px;
font-weight : 500;
`
const Input = styled.input`
background-color : transparent;
color : ${({theme}) => theme.text};
border : none;
outline : none;
`
const FeedBack = ({setOpenFeedBack, openFeedBack}) => {
 const {currentUser} = useSelector((state) => state.user)
 const [alert, setAlert] = useState(null)
const [message , setMessage] = useState("")
const form = useRef()


 const sendEmail = (e) => {
   e.preventDefault();

   emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID, process.env.REACT_APP_YOUR_TEMPLATE_ID, form.current, process.env.REACT_APP_YOUR_PUBLIC_KEY)
   
       setAlert("Thanks for your feedback")   
       setMessage("")

 
 };

 setTimeout(() => {
   setAlert(null)
 }, 5000);
  return (
 <>
    <Container>
     <Icon>
       <HighlightOffOutlinedIcon onClick={() => setOpenFeedBack(!openFeedBack)}/>
      
     </Icon>
     <Wrapper>
        <Title>Send Your feedback</Title>
     <Form ref={form} onSubmit={sendEmail}>
      <Input type="text" value={currentUser?.name} name="user_name" />
      <Input type="email" value={currentUser?.email} name="email" />
     <TextArea name="message" value={message} onChange = {(e) => setMessage(e.target.value)}  placeholder='write your feedback' />
      <Button type='submit'>Send</Button>
     </Form>
     </Wrapper>
    
    </Container>
   {alert &&  <Alert alert={alert}/>}
    </>
  )
}

export default FeedBack
