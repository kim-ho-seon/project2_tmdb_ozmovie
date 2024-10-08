import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    div{
      display: flex; 
      gap: 10px;

        button {
          width: 100%;
          padding: 10px;
          margin-bottom: 8px;
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
    }
  `
// Supabase 클라이언트 설정
const supabaseUrl = import.meta.env.VITE_SUPA_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPA_API_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// setIsLoggedIn prop 추가
export default function Login({ setIsLoggedIn }) {
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formLogin;

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsLoggedIn(false); // 로그인 실패 시 상태 업데이트
      } else {
        setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
        alert('로그인 성공');
        navigate('/'); // 리스트 페이지로 리다이렉트
      }
    } catch (error1) {
      setError('로그인에 실패했습니다.');
      setIsLoggedIn(false); // 로그인 실패 시 상태 업데이트
    }
  };

  const googleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        setError(error.message);
        setIsLoggedIn(false); // 로그인 실패 시 상태 업데이트
      } else {
        setIsLoggedIn(true); // 로그인 성공 시 상태 업데이트
        alert('구글 로그인 성공');
        // navigate('/'); // 리스트 페이지로 리다이렉트
      }
    } catch (error) {
      setError('구글 로그인에 실패했습니다.');
      setIsLoggedIn(false); // 로그인 실패 시 상태 업데이트
    }
  };

  return (
    <StyledLogin>
      <form onSubmit={handleLogin}>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formLogin.email}
            onChange={handleChange}
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formLogin.password}
            onChange={handleChange}
            required
          />
        </fieldset>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <button type="submit">로그인</button>
          <button onClick={googleLogin}>구글 로그인</button>
        </div>
      </form>
    </StyledLogin>
  );
}