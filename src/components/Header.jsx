import styled from 'styled-components'
import '../App.css'

const StyledHeader = styled.div`
 display: flex;
 text-align: center;
 justify-content: space-around;
 align-items: center;
 /* flex-wrap: nowrap; */
 gap: 1rem;
    h1{
        font-size: 5rem;
        white-space: nowrap;
    }
    & > :last-child {
    margin-left: auto;
  }
 button{
    margin-right: .5rem;
    width: 100px;
    height: 50px;
 }
 li{
    display: flex;
  }
`
export default function Header() {
    return (
        <StyledHeader>
            <h1>OZ무비</h1>
            <ul>
                <li>
                    <button>다크모드</button>
                    <button>search</button>
                    <button>로그인</button>
                    <button>회원가입</button>
                </li>
            </ul>
        </StyledHeader>
    )
}