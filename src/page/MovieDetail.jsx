import { useState, useEffect } from 'react'
import '../App.css'
import movieDetailData from '../assets/data/movieDetailData.json'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const StyledDetail = styled.div`
display: flex;
div{
    div{
        display: flex;
        align-items: center;
        gap: 1rem
    }
}
`

export default function MovieDetail() {
    const {movieId} = useParams();
    const [movieDetail, setMovieDetail] = useState();

    useEffect(() => {
        setMovieDetail(movieDetailData);
        // console.log(movieDetailData);
    }, []);

    if (parseInt(movieId) !== movieDetailData.id) {
        return <div>영화를 찾을수가 없습니다.</div>;
    }

    // const { title, genres, overview, poster_path, vote_average } = movieDetail; 
    // movieDetail이 정의되지 않았을 때, 예외처리를 해야 한다
    // if (!movieDetail) {return <div>Loading...</div>;}

    return (
        <StyledDetail>
            <img src={`https://image.tmdb.org/t/p/w500/${movieDetailData.poster_path}`}
            alt = {movieDetailData.original_title}/>
            <div>
                <div>
                    <h1>{ movieDetailData.title }</h1>
                    <h2>☆{ movieDetailData.vote_average }</h2>
                </div>
                <h2>장르: {movieDetailData.genres.map(genre => genre.name).join(', ')}</h2>
                <h2>줄거리:</h2>
                <p>{ movieDetailData.overview}</p>
            </div>
        </StyledDetail>
    );
}
  


    