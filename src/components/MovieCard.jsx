import { useState, useEffect } from 'react'
import '../App.css'
import styled from "styled-components";
import { useNavigate} from 'react-router-dom';

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

// https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&api_key=${apiKey}
// "total_pages": 249, "total_results": 4980

export default function Card() {

  const [movies, setMovies] = useState([])
  const navigate = useNavigate()

  const apiKey = import.meta.env.VITE_TMDB_API_KEY
  // TMDb API에서 인기 영화를 가져오는 함수
  const fetchMovies = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&api_key=${apiKey}`);
      const data = await response.json();
      console.log(data)
      setMovies(data.results);  // API 응답에서 영화 목록을 상태에 저장
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies()
  }, [])

  return (
    <StyledCard>
      <ul>
        {movies.map((el) => (
          <li key={el.id}>
            <img onClick={() => navigate(`/details/${el.id}`)} src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={el.title}/>
            <div>
              <h3>{el.title}</h3>
              <span>☆{el.vote_average}</span>
            </div>
          </li>
        ))}
      </ul>
    </StyledCard>
  );
}