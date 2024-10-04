import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MovieCard from '../src/components/MovieCard'
import MovieDetail  from '../src/page/MovieDetail';
import { createGlobalStyle } from 'styled-components';
import Login from './components/Login';
import Signup from './components/Signup'

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
  display: none;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
`

function App () {
 
  return (
    
    <>
      <NavBar />
      <GlobalStyle />
        <Routes>
        <Route path="/" element={<MovieCard/>}></Route>
        <Route path="/details/:movieId" element={<MovieDetail />}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </>
    
  );
}

export default App;
