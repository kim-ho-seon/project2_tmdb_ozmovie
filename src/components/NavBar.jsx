import styled from 'styled-components'
import '../App.css'
import { Link } from 'react-router-dom'

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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
    gap: 1rem;
    
    li {
      display: flex;
      align-items: center;

      a {
        margin-left: .5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 90px;
        height: 40px;
        font-size: 1rem;
        color: white;
        background-color: #007BFF;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-decoration: none;  

        &:hover {
          background-color: #0056b3;
        }      
      }
    }
  }
`
export default function Header() {
    return (
        <StyledHeader>
            <h1>
                <Link to='/'>OZ무비</Link >
            </h1>
            <ul>
                <li>
                    <Link to='/'>다크모드</Link>
                    <Link to='/'>search</Link>
                    <Link to='/login'>로그인</Link>
                    <Link to='/signup'>회원가입</Link>
                </li>
            </ul>
        </StyledHeader>
    )
}