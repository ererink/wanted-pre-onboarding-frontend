import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SigninInput(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSignIn = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/signin',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            console.log(response);
            window.alert("로그인 성공!");
            // 로그인 성공시 /todo 페이지로 이동
            navigate('/todo');
        } catch (error) {
            console.log(error.message);
        }
    }
    return(
        <>
            <SigninInputWrapper>
                <h1>login</h1>
                <form onSubmit={handleSignIn}>
                    <div>
                        Email {''}
                        <input data-testid="email-input"
                                type="email"
                                name="user-email"
                                value={email}
                                required
                                onChange={handleEmailChange} />
                    </div>
                    <div>
                        Password {''}
                        <input data-testid="password-input"
                                type='password'
                                name="user-password"
                                value={password}
                                required
                                onChange={handlePasswordChange} />
                    </div>
                    <button data-testid="signin-button" type="submit" > 로그인 </button>
                </form>
            </SigninInputWrapper>
            
        </>
    );
}

const SigninInputWrapper = styled.div`
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
export default SigninInput