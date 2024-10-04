import styled from 'styled-components'
import '../App.css'
import { useState } from 'react';

const StyledLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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
          border: 2px solid #007BFF;
        }
       }
      }
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #007BFF;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }

    p{
        color: red;
    }
`

export default function Signup() {

    const [formSignup, setFormSignup] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});

    // 입력값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormSignup({
            ...formSignup,
            [name]: value
        });
    };

    // 폼 유효성 검사
    const validateForm = () => {
        let formErrors = {};
        if (formSignup.password !== formSignup.confirmPassword) {
            formErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }
        return formErrors;
    };

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
    
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            // 회원가입 처리 로직 추가
            
            console.log('회원가입 성공:');
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
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formSignup.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </fieldset>
                <button type="submit">회원가입</button>
            </form>
        </StyledLogin>
    );
};
