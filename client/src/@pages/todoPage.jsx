import React, { useState } from 'react';
import TodoList from '../@components/todo/todoList';
import TodoInput from '../@components/todo/todoInput';
import { styled } from 'styled-components';
import TodoLogo from '../assets/todo.png';

function TodoPage() {
    const [todos, setTodos] = useState([]);
    
    // 할 일 추가 시 호출
    const handleAddTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    return(
        <TodoPageWrapper>
            <img src={TodoLogo} alt='Signup Logo' width={400} height={50} style={{margin: '10rem 0 5rem 0'}}/>
            <TodoInput onAddTodo={handleAddTodo}/>
            <TodoList todos={todos}/>
        </TodoPageWrapper>
    )
}

const TodoPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #f7f7f7;

`
export default TodoPage