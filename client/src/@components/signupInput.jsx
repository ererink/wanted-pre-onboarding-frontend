import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SignupInput(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 유효성 검사
    const [isEmail, setIsEmail] = useState(false);
    const [isPassword, setIsPassword] = useState(false);

    // 오류 메세지
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    const handleEmailChange = (event) => {
        // 유효성 검사
        const emailRegex = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        setEmail(event.target.value);

        if (!emailRegex.test(event.target.value)) {
            setEmailMessage('올바른 이메일 형식이 아닙니다!');
            setIsEmail(false);
          } else {
            setEmailMessage('올바른 이메일 형식입니다!');
            setIsEmail(true);
          }

    };

    const handlePasswordChange = (event) => {
        // 유효성 검사
        const passwordRegex = /^.{8,}$/;

        setPassword(event.target.value);

        if (!passwordRegex.test(event.target.value)) {
            setPasswordMessage('8자리 이상 입력해주세요!');
            setIsPassword(false);
          } else {
            setPasswordMessage('사용 가능한 비밀번호 입니다');
            setIsPassword(true);
          }
    };

    const handleSignUp = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            console.log(response);
            window.alert("회원가입 성공!");
            // 회원가입 성공시 /signin 페이지로 이동
            navigate('/signin');

        } catch (error) {
            console.log(error.message);
        }
    };
    
    return(
        <>
            <SignupInputWrapper>
                <h1>Signup</h1>
                <form onSubmit={handleSignUp}>
                    <div>
                        <h3>Email</h3> {''}
                        <input data-testid="email-input"
                                type="email"
                                name="user-email"
                                value={email}
                                required
                                onChange={handleEmailChange}
                                placeholder='이메일을 입력해주세요' />
                        {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}

                    </div>
                    <div>
                        <h3>Password</h3>{''}
                        <input data-testid="password-input"
                                type='password'
                                name="user-password"
                                value={password}
                                required
                                onChange={handlePasswordChange}
                                placeholder='비밀번호를 입력해주세요' />
                        {password.length > 0 && (
                        <span className={`message ${password ? 'success' : 'error'}`}>{passwordMessage}</span>
                        )}
                    </div>
                    <div>
                        <button data-testid="signup-button" 
                                type="submit" 
                                disabled={!(isEmail && isPassword)}> 
                                회원가입 </button>
                    </div>
                    
                </form>
            </SignupInputWrapper>
        </>
        
    )
}

const SignupInputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;

    form {
        display: flex;
        flex-direction: column;
    }

`

export default SignupInput;