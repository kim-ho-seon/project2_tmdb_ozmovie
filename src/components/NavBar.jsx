import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useDebounce from './useDebounce'; // Debounce 훅 
import { createClient } from '@supabase/supabase-js';

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
    white-space: nowrap;

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
    gap: .3rem;
    
    li {
      display: flex;
      align-items: center;
      gap: .3rem;

      a, input, button {
        height: 30px;
        font-size: 0.8rem;
        font-weight: 500;
        border: none;
        border-radius: 7px;
        cursor: pointer;
        text-decoration: none;
      }

      a, button {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: #fabf0e;
        width: 65px;
        white-space: nowrap;
        }
      }

      a:hover {
        background-color: #e2b83a;
      }

      input {
        padding: 0.5rem;
      }
    }
`;

const LoadingText = styled.p`
  color: white;
`;

const apiKey = import.meta.env.VITE_TMDB_API_KEY; // API 키 가져오기
const supabaseUrl = import.meta.env.VITE_SUPA_URL; // Supabase URL 가져오기
const supabaseAnonKey = import.meta.env.VITE_SUPA_API_KEY; // Supabase Anon Key 가져오기
const supabase = createClient(supabaseUrl, supabaseAnonKey); // Supabase 클라이언트 생성


export default function NavBar ({ setSearchResults, setIsLoggedIn })  { // setSearchResults prop 추가
  const [isLoggedIn, setIsLoggedInState] = useState(false); // 로그인 상태 관리
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

  // Supabase 인증 상태 변경 감지
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      setIsLoggedInState(!!session); // 로그인 여부에 따라 상태 업데이트
      setIsLoggedIn(!!session); // 부모 컴포넌트에 로그인 상태 전달
    });
    return () => {
      subscription?.unsubscribe(); // 언subscribe
    };
  }, [setIsLoggedIn]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false); // 로그아웃 시 부모 컴포넌트에 상태 업데이트
  };

  return (
    <StyledHeader>
      <h1>
        <Link to='/'>OZ무비</Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>다크모드</Link>
          {isLoggedIn ? (
            <>
              <Link to='/mypage'>마이페이지</Link> {/* 마이페이지 링크 */}
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <Link to='/login'>로그인</Link>
          )}
          {!isLoggedIn && <Link to='/signup'>회원가입</Link>} {/* 로그아웃 상태일 때만 회원가입 보이기 */}
        </li>
        <li>
          <input
            type="text"
            placeholder="영화 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </li>
      </ul>
      {loading && <LoadingText>Loading...</LoadingText>}
    </StyledHeader>
  );
};
