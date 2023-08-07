import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

function TodoList(){
    const userToken = localStorage.getItem("jwt-token");
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!userToken) {
            window.alert('로그인이 필요한 페이지입니다!')
            navigate('/signin');
        }
      }, [userToken, navigate]);

    return (
        <>
            <h1>Todo List</h1>
        </>
    );
};

export default TodoList