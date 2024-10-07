import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useDebounce from './useDebounce'; // Debounce 훅 import

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #111;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 80px;

  h1 {
    font-size: 3.5rem;
    color: #fff;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
    
    li {
      display: flex;
      align-items: center;

      a, input {
        margin-left: .3rem;
        height: 30px;        
        font-size: .8rem;
        font-weight: 500;
        border: none;
        border-radius: 7px;
        cursor: pointer;
        text-decoration: none;
      }
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #fabf0e;
        width: 65px;
      }
       a:hover {
          background-color: #e2b83a;
     }
       input{
          padding: .5rem;
      }      
    }
  }
`
export default function NavBar ({ setSearchResults })  { // setSearchResults prop 추가
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms 지연 적용

  const apiKey = import.meta.env.VITE_TMDB_API_KEY; // API 키 가져오기

  // TMDb API를 사용하여 영화 검색하는 함수
  const searchMovies = async (query) => {
    setLoading(true); // 로딩 시작
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&language=ko-KR`);
      const data = await response.json();
      setSearchResults(data.results); // 검색 결과 업데이트
    } catch (error) {
      console.error('Error fetching search results:', error); // 에러 처리
    }
    setLoading(false); // 로딩 종료
  };

  // Debounced 검색어가 변경되었을 때 API 호출
  useEffect(() => {
    if (debouncedSearchQuery) {
      searchMovies(debouncedSearchQuery); // 검색어가 있을 때만 API 호출
    } else {
      setSearchResults([]); // 검색어가 없을 때는 결과 초기화
    }
  }, [debouncedSearchQuery]);

  return (
    <StyledHeader>
      <h1>
        <Link to='/'>OZ무비</Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>다크모드</Link>
          <Link to='/login'>로그인</Link>
          <Link to='/signup'>회원가입</Link>
        </li>
        <li>
          <input
            type="text"
            placeholder="영화 검색..."
            value={searchQuery} // 입력된 검색어
            onChange={(e) => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
          />
        </li>
      </ul>
      {loading && <LoadingText>Loading...</LoadingText>} {/* 로딩 중 표시 */}
    </StyledHeader>
  );
};
