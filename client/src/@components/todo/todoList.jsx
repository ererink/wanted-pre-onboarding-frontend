import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

function TodoList(){
    const userToken = localStorage.getItem("jwt-token");
    const navigate = useNavigate();
    
    useEffect(() => {
        // 로그인을 하지 않은 상태로 로그인한 경우 /signin 페이지로 리다이렉트
        if (!userToken) {
            window.alert('로그인이 필요한 페이지입니다!')
            navigate('/signin');
        }
      }, [userToken, navigate]);
    console.log(userToken);
    const [todoItems, setTodoItems] = useState([]);

    // 완료된 할 일 처리
    const handleTodoComplete = (todoId) => {
        const updatedTodoItem = todoItems.map((todo) => 
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        );
        setTodoItems(updatedTodoItem);
    }

    return (
        <TodoListWrapper>
            <h1>Todo List</h1>
            <TodoItems>
               {todoItems.map((todo) =>(
                    <TodoItem key={todo.id}>
                        <lable>
                            <input type='checkbox'
                                   checked={todo.completed}
                                   onChange={() => handleTodoComplete(todo.id)}/>
                            <span>{todo.text}</span>
                        </lable>
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