import { useState, useEffect } from 'react'
import '../App.css'
import movieListData from '../assets/data/movieListData.json'
import styled from "styled-components";
import { useNavigate} from 'react-router-dom';

const StyledCard = styled.div`
ul { 
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    img{
      width: 500px;
      height: 750px;
    }
    div{
      display: flex;
      align-items: baseline;
      /* justify-content: space-between; */
     h2{ 
      padding-right: 50px;
      }
    }
    }
`
export default function Card() {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate()
 
  useEffect(() => {
    setMovies(movieListData.results)
  }, [])

  return (
    <StyledCard>
      <ul>
        {movies.map((el) => (
          <li key={el.id}>
            <img onClick={() => navigate(`/details/${el.id}`)} src={`https://image.tmdb.org/t/p/w500/${el.poster_path}`} alt={el.title}/>
            <div>
              <h2>{el.title}</h2>
              <span>{el.vote_average}</span>
            </div>
          </li>
        ))}
      </ul>
    </StyledCard>
  );
}