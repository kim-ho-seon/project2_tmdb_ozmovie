import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import MovieCard from '../src/components/MovieCard'
import MovieDetail  from '../src/page/MovieDetail';
import { createGlobalStyle } from 'styled-components';

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
      <Header />
      <GlobalStyle />
        <Routes>
        <Route path="/" element={<MovieCard/>}></Route>
        <Route path="/details/:movieId" element={<MovieDetail />}></Route>
      </Routes>
    </>
    
  );
}

export default App;
