import { useState, useEffect, useRef } from 'react'
import '../App.css'
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const StyledCard = styled.div`
box-sizing: border-box;
padding-top: 150px;
ul { 
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    
    li{
      width: 300px;
      /* overflow: hidden; */
      position: relative;
      padding: .3rem;
      
      img{
        width: 100%;
        object-fit: cover;
        aspect-ratio: 8 / 12; /* 가로 8, 세로 12의 비율 유지 */
        border-radius: 1rem;
        transition: transform 0.3s ease;
        
        cursor: pointer;

        &:hover{
          transform: scale(1.05); /* 호버 시 이미지 1.1배 확대 */
          box-shadow: 0 5px 8px rgba(0, 0, 0, 0.2)
        }
      }
     
      div{
        padding: .6rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
      h3{ 
        padding-right: 50px;
        white-space: nowrap; /* 줄 바꿈 방지 */
        overflow: hidden; /* 넘치는 내용 숨김 */
        text-overflow: ellipsis; /* 넘치는 내용에 ... 표시 */
        }
        span{
        }
      }
    }
    }
`

export default function MovieCard({ searchResults }) {
  const [movies, setMovies] = useState([]); // 초기 영화 상태 (빈 배열로 설정)
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const loaderRef = useRef(null); // 로더 참조를 위한 훅
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  // 영화 데이터를 가져오는 비동기 함수
  const fetchMovies = async (pageNum) => {
    if (loading) return; // 이미 로딩 중이면 함수 종료
    setLoading(true); // 로딩 상태를 true로 설정

    try {
      // TMDb API를 호출하여 인기 영화를 가져옴
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageNum}&api_key=${apiKey}`);
      const data = await response.json(); // JSON 형태로 응답 파싱

      // 이전 영화 목록에 새로운 영화 추가
      // prevMovies 배열에서 현재 영화(movie)의 id와 일치하는 영화가 없는 경우
      // 주석 설명:
      // data.results: API 또는 데이터 소스에서 가져온 영화 목록
      // filter(): 주어진 조건을 만족하는 요소만으로 새로운 배열을 생성
      // movie: data.results 배열의 각 영화 객체
      // prevMovies: 이전에 이미 로드된 영화 목록
      // some(): prevMovies 배열에서 주어진 조건(여기서는 id가 일치하는지)을 만족하는 요소가 있는지 확인
      // 결과적으로 newMovies는 prevMovies에 없는 새로운 영화 객체만 포함하는 배열이 됨

      setMovies((prevMovies) => {
        // data.results에서 새로운 영화 목록을 필터링
        const newMovies = data.results.filter((movie) =>
          !prevMovies.some((prevMovie) => prevMovie.id === movie.id)
        );
        return [...prevMovies, ...newMovies]; // 이전 영화 목록에 새로운 영화 추가하여 상태 업데이트
      });
      setLoading(false); // 로딩 상태를 false로 설정
    } catch (error) {
      console.error("Error fetching movies:", error); // 에러 처리
      setLoading(false); // 로딩 상태를 false로 설정
    }
  };

  // 검색 결과나 페이지가 변경될 때마다 영화 데이터 가져오기
  useEffect(() => {
    if (searchResults.length > 0) {
      setMovies(searchResults); // 검색 결과가 있을 경우 movies 상태를 검색 결과로 업데이트
    } else {
      fetchMovies(page); // 검색 결과가 없으면 페이지에 맞는 인기 영화 목록을 가져옴
    }
  }, [searchResults, page]); // searchResults와 page가 변경될 때마다 호출

  // 무한 스크롤 구현
  useEffect(() => {
    // IntersectionObserver를 사용하여 스크롤 이벤트를 감지
    const observer = new IntersectionObserver(
      (entries) => {
        // 관찰 대상(로더)이 화면에 보일 경우의 처리
        if (entries[0].isIntersecting && !loading) {
          // 로더가 보이면 현재 페이지 수를 증가시킴
          setPage((prevPage) => prevPage + 1); // 페이지 증가
        }
      },
      { threshold: 0.5 } // 관찰 대상의 50%가 화면에 보일 때 콜백 호출
    );

    // loaderRef가 현재 DOM 요소를 참조하고 있을 때
    if (loaderRef.current) {
      // 로더 요소를 관찰 시작
      observer.observe(loaderRef.current); // 로더 참조를 관찰
    }

    // 클린업 함수: 컴포넌트가 언마운트될 때 또는 effect가 다시 실행될 때
    return () => {
      if (loaderRef.current) {
        // 관찰을 중지하여 메모리 누수 방지
        observer.unobserve(loaderRef.current); // 컴포넌트 언마운트 시 관찰 중지
      }
    };
  }, [loading]); // loading 상태가 변경될 때마다 effect가 실행됨

  // 영화 목록 렌더링 함수
  const renderMovies = (movieList) => {
    return (
      <ul>
        {movieList.map((movie, index) => (
          <li key={`${movie.id}-${index}`}>
            <img onClick={() => navigate(`/details/${movie.id}`)} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div>
              <h3>{movie.title}</h3> {/* 영화 제목 표시 */}
              <span>☆{movie.vote_average}</span> {/* 영화 평점 표시 */}
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <StyledCard>
      {searchResults.length > 0 ? (
        renderMovies(movies) // 검색 결과가 있을 경우 렌더링
      ) : (
        <>

          {/* 검색 결과가 없으면 일반 영화 목록 렌더링 */}
          {renderMovies(movies)}

          {/*  이 div 요소는 IntersectionObserver에 의해 관찰되며,
       스크롤이 이 div 요소에 도달하면 더 많은 데이터를 불러오는 트리거 역할을 함
      따라서 이 div의 존재 여부가 무한 스크롤 기능에 영향을 미침 */}
          <div ref={loaderRef} style={{ height: '50px', textAlign: 'center' }}>
            {loading ? <p>Loading...</p> : <p>더 많은 영화를 불러오는 중...</p>} {/* 로딩 메시지 */}
          </div>
        </>
      )}

    </StyledCard>
  );
}


// https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&api_key=${apiKey}
// "total_pages": 249, "total_results": 4980

// export default function Card() {

//   const [movies, setMovies] = useState([])
//   const navigate = useNavigate()

//   const apiKey = import.meta.env.VITE_TMDB_API_KEY
//   // TMDb API에서 인기 영화를 가져오는 함수
//   const fetchMovies = async () => {
//     try {
//       const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${apiKey}`);
//       const data = await response.json();
//       console.log(data)
//       setMovies(data.results);  // API 응답에서 영화 목록을 상태에 저장
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMovies()
//   }, [])

//   return (
//     <StyledCard>
//       <ul>
//         {movies.map((el) => (
//           <li key={el.id}>
//             <img onClick={() => navigate(`/details/${el.id}`)} src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={el.title}/>
//             <div>
//               <h3>{el.title}</h3>
//               <span>☆{el.vote_average}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </StyledCard>
//   );
// }