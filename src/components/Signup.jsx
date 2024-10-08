import styled from 'styled-components'
import '../App.css'
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

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

    p{
        color: red;
    }
`
// Supabase 클라이언트 설정
const supabaseUrl = import.meta.env.VITE_SUPA_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPA_API_KEY;

// console.log(supabaseUrl);
// console.log(supabaseAnonKey);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Signup({setIsLoggedIn}) {

    const [formSignup, setFormSignup] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormSignup({
            ...formSignup,
            [name]: value
        });
        setError('');
    };

    // // 폼 유효성 검사
    // const validateForm = () => {
    //     let formErrors = {};
    //     if (formSignup.password !== formSignup.confirmPassword) {
    //         formErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    //     }
    //     return formErrors;
    // };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = formSignup;

        // 유효성 검사
        if (!name || !email || !password || !confirmPassword) {
            setError('모든 필드를 입력해주세요.');
            return;
        }
        // if (!validateEmail(email)) {
        //     setError('유효한 이메일 주소를 입력해주세요.');
        //     return;
        // }
        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.');
            return;
        }
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        // Supabase에 유저 생성 요청
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name: name,
              },
            },
          });

        if (error) {
            setError(error.message);
        } else {
            setSuccess('회원가입이 완료되었습니다!');
        }
    };
    const googleLogin = async () => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          });
    
          if (error) {
            setError(error.message);
            setIsLoggedIn(false); // 회원가입 실패 시 상태 업데이트
          } else {
            setIsLoggedIn(true); // 회원가입 성공 시 상태 업데이트
            alert('구글 회원가입 성공');
            // navigate('/'); // 리스트 페이지로 리다이렉트
          }
        } catch (error) {
          setError('구글 회원가입에 실패했습니다.');
          setIsLoggedIn(false); // 회원가입 실패 시 상태 업데이트
        }
      };
    
    return (

        <StyledLogin>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formSignup.name}
                        onChange={handleChange}
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formSignup.email}
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
                        value={formSignup.password}
                        onChange={handleChange}
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formSignup.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </fieldset>
                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}
                <div>
                    <button type="submit">회원가입</button>
                    <button onClick={googleLogin}>구글 회원가입</button>
                </div> 
            </form>
        </StyledLogin>
    );
};
