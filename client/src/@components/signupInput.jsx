import React, { useState } from 'react'
import styled from 'styled-components';

function SignupInput(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            console.log("body", JSON.stringify({ email, password }));
            const response = await fetch('http://localhost:8000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
    
            console.log(response);

            
        } catch (error) {
            console.log(error.message);
        }
    };
    
    return(
        <>
            <SignupInputWrapper>
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
    flex-direction: column;
    align-items: center;

    input {
        width: 30rem;
    }
`

export default SignupInput;