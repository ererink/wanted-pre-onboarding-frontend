import React, { useState } from 'react';
import TodoList from '../@components/todo/todoList';
import TodoInput from '../@components/todo/todoInput';

function TodoPage() {
    const [todos, setTodos] = useState([]);
    
    // 할 일 추가 시 호출
    const handleAddTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    return(
        <>
            <TodoInput onAddTodo={handleAddTodo}/>
            <TodoList todos={todos}/>
        </>
    )
}

export default TodoPage