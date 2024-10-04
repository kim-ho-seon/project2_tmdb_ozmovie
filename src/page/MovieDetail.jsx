import { useState, useEffect } from 'react'
import '../App.css'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const StyledDetail = styled.div`
display: flex;
justify-content: center;
height: 100vh;
justify-content: center;
align-items: center;
section{
    display: flex;
    img{
        height: 700px;
    }
    
    aside{
        width: 500px;
        h1{
            font-size: 2rem;
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
          <section>
              <img src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
              alt = {movieDetail.original_title}/>
              <aside>
                  <div>
                      <h1>{ movieDetail.title }</h1>
                      <h2>☆{ movieDetail.vote_average }</h2>
                  </div>
                  <h2>장르: {movieDetail.genres.map(genre => genre.name).join(', ')}</h2>
                  <h2>줄거리:</h2>
                  <p>{ movieDetail.overview}</p>
              </aside>
          </section>
        </StyledDetail>
    );
}
  


    