import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
 
 position : fixed;
 left : 300px;
 bottom : 20px;
 z-index : 999;

 

 
`
const Wrapper = styled.div`
padding : 10px 20px;
font-size : 17px;
color : white; background-color : gray;
`

const Alert = ({alert}) => {
  return (
  <Container>
     {alert && <Wrapper>
       {alert}
      </Wrapper>}
    </Container>
  )
}

export default Alert
