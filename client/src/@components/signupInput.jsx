import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SignupInput(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        console.log("handleEmailChange")
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        console.log("handlePasswordChange")
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
                        email: {''}
                        <input data-testid="email-input"
                                type="email"
                                name="user-email"
                                value={email}
                                required
                                onChange={handleEmailChange} />
                    </div>
                    <div>
                        password: {''}
                        <input data-testid="password-input"
                                type='password'
                                name="user-password"
                                value={password}
                                required
                                onChange={handlePasswordChange} />
                    </div>
                    
                    <button data-testid="signup-button" type="submit" > 회원가입 </button>
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