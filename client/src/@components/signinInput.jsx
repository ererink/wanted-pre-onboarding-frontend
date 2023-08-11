import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '../assets/email.png';
import PasswordIcon from '../assets/password.png';
import SigninLogo from '../assets/login.png';

function SigninInput(){
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

        if(!emailRegex.test(event.target.value)){
            setEmailMessage('올바른 이메일 형식이 아닙니다!');
            setIsEmail(false);
        } else {
            setEmailMessage('올바른 이메일 형식입니다!')
            setIsEmail(true);
        }
    };

    const handlePasswordChange = (event) => {
        // 유효성 검사
        const passwordRegex = /^.{8,}$/;

        setPassword(event.target.value);

        if(!passwordRegex.test(event.target.value)) {
            setPasswordMessage('8자리 이상 입력해주세요!');
            setIsPassword(false);
        } else {
            setPasswordMessage('사용 가능한 비밀번호 입니다');
            setIsPassword(true);
        }
    }

    const handleSignIn = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('/auth/signin',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200){
                const responseData = await response.json();
                if(responseData.access_token) {
                    // 로그인 시 로컬 스토리지에 토큰 저장
                    localStorage.setItem('jwt-token', responseData.access_token);
                    console.log(responseData);
                    window.alert("로그인이 되었습니다!");

                    // 로그인 성공시 /todo 페이지로 이동            
                    navigate('/todo');
                } 
            } else if (response.status === 404) {
                // DB에 해당 유저 정보가 없는 경우
                window.alert("로그인 정보가 없습니다 :(");
            }
                
        } catch (error) {
            console.log(error.message);
        }
    };

    return(
        <>
            <SigninInputWrapper>
                <SigninInputBox>
                    <img src={SigninLogo} alt='Signin Logo' width={130} height={30}/>
                    <form onSubmit={handleSignIn}>
                        <DataInput>
                            <img src={EmailIcon} alt="Email icon" width={30} height={20} style={{ margin: '0 10px' }}/>
                            {''}
                            <input data-testid="email-input"
                                    type="email"
                                    name="user-email"
                                    value={email}
                                    required
                                    onChange={handleEmailChange}
                                    placeholder='이메일을 입력해주세요' />
                            <span></span>
                        </DataInput>
                        <DataValidate isError={!isEmail}>
                            {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
                        </DataValidate>
                        <DataInput>
                            <img src={PasswordIcon} alt='Password Icon' width={23} height={27} style={{ margin: '0 13px' }}/>
                            {''}
                            <input data-testid="password-input"
                                    type='password'
                                    name="user-password"
                                    value={password}
                                    required
                                    onChange={handlePasswordChange}
                                    placeholder='비밀번호를 입력해주세요' />
                            <span></span>
                        </DataInput>
                        <DataValidate isError={!isPassword}>
                            {password.length > 0 && (
                                <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                                )}
                        </DataValidate>
                        <DataButton>
                            <button data-testid="signin-button" 
                                    type="submit"
                                    disabled={!(isEmail && isPassword)}> 
                                    login </button>
                        </DataButton>
                    </form>
                </SigninInputBox>
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
    background-color: #f7f7f7;

    form {
        display: flex;
        flex-direction: column;
    }
`

const SigninInputBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40rem;
    height: 40rem;
    padding: 4rem 2rem;

    background-color: white;
    border-radius: 1.5rem;
    box-shadow: #cecece 2px 3px 5px;
`

const DataInput = styled.div`
    display: flex;
    align-items: center;
    margin: 5rem 0 0 1rem;

    input {
        width: 20rem;
        padding: 1rem 2rem 0.7rem 0.2rem;
        border-bottom: 1.5px solid #cfcfcf;
        transition: border-color 0.4s;
    }

    input:focus {
        border-color: orange;
    }

    input ~ span {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        transition: width 0.4s, left 0.4s;
    }

    input:focus ~ span{
        width: 100%; 
        left: 0;
    }
`

const DataValidate = styled.div`
    margin: 0.5rem 0 0 4rem;
    
    span {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0 0 0 2rem;
        color: ${props => props.isError ? '#e33232' : 'grey'};
    }
`

const DataButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    button{
        padding: 1.5rem 3rem;
        margin: 4rem 0;
        border-radius: 1.5rem;
        background-color: orange;
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        transition: background-color 0.3s, color 0.3s;
    }

    button:hover{
        background-color: #e77401;
        color: white;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
    }
    
`
export default SigninInput