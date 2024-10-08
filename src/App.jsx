import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MovieCard from '../src/components/MovieCard'
import MovieDetail from '../src/page/MovieDetail';
import { createGlobalStyle } from 'styled-components';
import Login from './components/Login';
import Signup from './components/Signup'
import { useState } from 'react';

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

function App() {

  // 검색 결과 상태를 관리
  const [searchResults, setSearchResults] = useState([]);
  // 로그인 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (

    <>
      {/* NavBar에 검색 결과 상태, 로그인 상태설정 */}
      <NavBar setSearchResults={setSearchResults} setIsLoggedIn={setIsLoggedIn} />
      <GlobalStyle />
      <Routes>
        {/* 루트 경로에 MovieCard 컴포넌트를 렌더링하고 검색 결과를 전달 */}
        <Route path="/" element={<MovieCard searchResults={searchResults} />} />
        <Route path="/details/:movieId" element={<MovieDetail />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* setIsLoggedIn 전달 */}
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>

  );
}

export default App;
