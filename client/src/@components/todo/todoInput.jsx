import React, { useState } from 'react';
import styled from 'styled-components';

function TodoInput(props) {
    const [todoItem, setTodoItem] = useState('');

    // 변경 감지
    const handleTodoChange = (event) => {
        setTodoItem(event.target.value);
    };

    // 할 일 추가
    const handleAddTodo = async (event) => {
        event.preventDefault();

        try{
            const response = await fetch('/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ todoItem }),
            });

            window.alert("할 일이 추가되었습니다!");
            setTodoItem(''); // 초기화
            // onTodoAdded(); 

        } catch (error) {
            console.log(error.message);
        }
        const newTodo = {
            id: Date.now(),
            text: todoItem,
            isCompleted: false,
        };
        // 새로운 할 일 넘겨주기
        props.onAddTodo(newTodo)
        // 할 일 추가 후 입력 필드 초기화
        setTodoItem('');
    };

    return(
        <>
            <form onSubmit={handleAddTodo}>
                <input data-testid="new-todo-input"
                       onChange={handleTodoChange}
                       value={todoItem}
                       placeholder='오늘의 할 일은 무엇인가요?'/>
                <button data-testid="new-todo-add-button"
                        type='submit'
                        disabled={!todoItem.trim()} >

                    ADD</button>
            </form>
        </>
    );
}

export default TodoInput