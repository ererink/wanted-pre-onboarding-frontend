import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

function TodoList(){
    const [todoItems, setTodoItems] = useState([]);
    const userToken = localStorage.getItem("jwt-token");
    const navigate = useNavigate();

    useEffect(() => {
        // 로그인을 하지 않은 상태로 로그인한 경우 /signin 페이지로 리다이렉트
        if (!userToken) {
            window.alert('로그인이 필요한 페이지입니다!')
            navigate('/signin');
        }

        // 할 일 목록을 가져오는 API 요청
        fetch('/todos', {
            headers: {'Authorization': `Bearer ${userToken}`}
        })
        .then(response => response.json())
        .then(data => {
            // 서버에서 받아온 데이터로 todoItems 업데이트
            setTodoItems(data);
        })
        .catch(error => {
            console.log('API 요청 에러:', error);
        });
      }, [userToken, navigate]);
    
    // 완료된 할 일 처리
    const handleTodoComplete = (todoId) => {
        const updatedTodoItem = todoItems.map((todo) => 
            todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
        );
        setTodoItems(updatedTodoItem);
    }

    return (
        <TodoListWrapper>
            <h1>Todo List</h1>
            <TodoItems>
               {todoItems.map((todo) =>(
                    <TodoItem key={todo.id}>
                        <label>
                            <input type='checkbox'
                                   checked={todo.isCompleted}
                                   onChange={() => handleTodoComplete(todo.id)}/>
                            <span>{todo.todo}</span>
                        </label>
                    </TodoItem>
                ))} 
            </TodoItems>
            
        </TodoListWrapper>
    );
};

const TodoListWrapper = styled.div`
  
`;

const TodoItems = styled.ul`
  
`;

const TodoItem = styled.li`
  
`;

export default TodoList