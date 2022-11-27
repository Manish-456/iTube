import { useState} from 'react'
import styled,  { ThemeProvider } from 'styled-components'
import LoadingBar from 'react-top-loading-bar'
import Menu from './components/Menu'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import {darkTheme, lightTheme} from './utils/Theme'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Video from './Pages/Video'
import Signin from './Pages/Signin'
import Search from './Pages/Search'
import EditAccount from './Pages/EditAccount'
import Sports from './Pages/Sports'
import Gaming from './Pages/Gaming'
import Music from './Pages/Music'
import News from './Pages/News'
import Movies from './Pages/Movies'
import YourVideos from './Pages/YourVideos'
import WatchLater from './Pages/WatchLater'
import UpdateVideo from './Pages/UpdateVideo'
import Signup from './Pages/Signup'



const Container = styled.div`
 display : flex;
 background-color : ${({theme}) => theme.bg};
 color : ${({theme}) => theme.text} 

`

const Main = styled.div`
flex : 7

`

const Wrapper = styled.div`
  padding : 22px 96px
`
const App = () => {

  const [progress, setProgress] = useState(0)
  const [darkMode, setDarkMode] = useState(true)
 


  

  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <ThemeProvider theme={darkMode? darkTheme : lightTheme}>
   <Container>
    <Router>

    
    <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
   <Main>
    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
    
    <Wrapper>
      <Routes>
       <Route index element={<Home setProgress={setProgress} type="random"/>} />
       <Route path='subscription' element={<Home setProgress={setProgress} type="sub"/>} />
       <Route path='trending' element={<Home setProgress={setProgress} type="trending"/>} />
       <Route exact path='editProfile/:id'  element={<EditAccount setProgress={setProgress}/>} />
       <Route path='sports' element={<Sports setProgress={setProgress}/>} />
       <Route path='music' element={<Music setProgress={setProgress}/>} />
       <Route path='movies' element={<Movies setProgress={setProgress}/>} />
       <Route path='news' element={<News setProgress={setProgress}/>} />
       <Route path='sports' element={<Sports setProgress={setProgress}/>} />
       <Route path='gaming' element={<Gaming setProgress={setProgress}/>} />
       <Route path='signin' element={<Signin setProgress={setProgress}/>} />
       <Route path='signup' element={<Signup setProgress={setProgress}/>} />
       <Route path='search' element={<Search setProgress={setProgress}/>} />
       <Route path='personal' element={<YourVideos setProgress={setProgress} />} />
       <Route path='watchlater' element={<WatchLater setProgress={setProgress}/>} />
       <Route path='updatevideo/:id' element={<UpdateVideo setProgress={setProgress}/>} />
       <Route path='video' >
        <Route path=':id' element={<Video setProgress={setProgress}/>} />
       </Route>
       
      </Routes>

      </Wrapper>
   </Main>


 
    {/* main */}
    </Router>
   </Container>
   </ThemeProvider>
   </>
  )
}

export default App
