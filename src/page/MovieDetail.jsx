import { useState, useEffect } from 'react'
import '../App.css'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const StyledDetail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 150px;
  /* background-color: #f9f9f9;  */
  &>div{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);

  img { 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지가 영역을 채우도록 */
    z-index: -5; /* 배경 뒤로 보내기 */
  }
  }

  section {
    display: flex;
    align-items: center;
    gap: 50px; /* 이미지와 텍스트 간의 간격 */
    max-width: 1200px; /* 레이아웃이 너무 넓어지지 않도록 제한 */
    background-color: rgba(255, 255, 255, .5); /* 컨텐츠 박스 배경 */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
    padding: 30px;
    border-radius: 10px;
    z-index: 3;

    img {
      height: 500px;
      border-radius: 10px;
      object-fit: cover; /* 이미지 비율 유지하며 잘리도록 */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 이미지에 그림자 */
    }

    aside {
      padding: 1em;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      h1 {
        font-size: 2rem;
        font-weight: bold;
        color: #d0d0d0; /* 어두운 텍스트 색상 */
      }

      h2 {
        font-size: 1rem;
        color: #eee;
      }

      h3{
          color: #d0d0d0
        }

      p {
        width: 300px;
        font-size: .9rem;
        line-height: 1.6; /* 가독성을 위한 줄 간격 */
        color: #eee;
      }

      div {
        /* margin-bottom: 20px; */
        h2 {
          color: #f39c12; /* 별점 색상 */
          font-size: 1.5rem;
          margin-top: 10px;
        }
      }
    }
  }
`

export default function MovieDetail() {
    const {movieId} = useParams();
    const [movieDetail, setMovieDetail] = useState();

    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    // TMDb API에서 영화 상세 정보를 가져오는 함수
    const fetchMovieDetail = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=${apiKey}`);
            const data = await response.json();
            setMovieDetail(data);  // API 응답에서 영화 상세 정보 저장
        } catch (error) {
            console.error("Error fetching movie detail:", error);
        }
    };

    useEffect(() => {
        fetchMovieDetail();
    }, [movieId]);

    if (!movieDetail) {return <div>Loading...</div>;}

    if (parseInt(movieId) !== movieDetail.id) {
        return <StyledDetail>
            <div>영화를 찾을수가 없습니다.</div>
        </StyledDetail>;
    }

    // const { title, genres, overview, poster_path, vote_average } = movieDetail; 
    // movieDetail이 정의되지 않았을 때, 예외처리를 해야 한다


    return (
        <StyledDetail>
          <div>
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.backdrop_path}`} alt={movieDetail.original_title} />
          </div>
          <section>
              <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
              alt = {movieDetail.original_title}/>
              <aside>
                  <div>
                      <h1>{ movieDetail.title }</h1>
                      <h2>☆{ movieDetail.vote_average }</h2>
                  </div>
                  <h2>장르:</h2>
                  <h3> {movieDetail.genres.map(genre => genre.name).join(', ')}</h3>
                  <h2>줄거리:</h2>
                  <p>{ movieDetail.overview}</p>
              </aside>
          </section>
        </StyledDetail>
    );
}
  


    