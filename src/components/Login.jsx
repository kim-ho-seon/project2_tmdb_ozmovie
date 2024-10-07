import { useState } from "react";
import styled from "styled-components";

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 120px;
  /* background-color: #f7f7f7; */

  form {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
    width: 400px;

    fieldset {
      border: none;
      margin-bottom: 1.6rem;

      label {
        display: block;
        font-size: 18px;
        color: #333;
        margin-bottom: 0.5rem;
      }

      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 18px;
        box-sizing: border-box;
        
        &:focus {
          outline: none;
          border: 2px solid #fabf0e;
        }
       }
      }
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #fabf0e;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #e2b83a;
      }
    }
  `

export default function Login() {
    const [formLogin, setFormLogin] = useState({
        id: '',
        password: '',
    });  

    const handleChange = (e) => {
        const { name, value }  = e.target
        setFormLogin({
            ...formLogin,
            [name]: value
        });
    };
    return(
        <>
            <StyledLogin>
                <form>
                    <fieldset>
                        <label htmlFor="email">이메일</label>
                        <input type="email"
                            id="email"
                            name="email"
                            value={formLogin.email}
                            onChange={handleChange}
                            required />
                    </fieldset>
                   <fieldset>
                     <label htmlFor="password">비밀번호</label>
                     <input type="password"
                         id="password"
                         name="password"
                         value={formLogin.password}
                         onChange={handleChange}
                         required />
                   </fieldset>
                    <button>로그인</button>
                </form>
            </StyledLogin>
        </>
    )  
}