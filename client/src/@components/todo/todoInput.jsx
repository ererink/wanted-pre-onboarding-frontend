import React, { useState } from 'react';
import styled from 'styled-components';

function TodoInput(props) {
    const [todoItem, setTodoItem] = useState('');

    // 유저 정보
    const userToken = localStorage.getItem('jwt-token');
    const userId = userToken ? JSON.parse(atob(userToken.split('.')[1])).sub : null;

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
                headers: { 
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify({ todo: todoItem }),
            });
            if (response.ok) {
                const newTodo = await response.json();
                props.onAddTodo(newTodo); // 부모 컴포넌트의 콜백 호출
                setTodoItem(''); // 입력 필드 초기화
                window.alert("할 일이 추가되었습니다 :)");
            } else {
                console.log("할 일이 추가되지 않았어요 :(");
            }

        } catch (error) {
            console.log(error.message);
        }
        
    };

    return(
        <>
            <form onSubmit={handleAddTodo}>
                <input data-testid="new-todo-input"
                       onChange={handleTodoChange}
                       value={todoItem}
                       placeholder='오늘의 할 일은 무엇인가요?'
                />
                <button data-testid="new-todo-add-button"
                        type='submit'
                        disabled={!todoItem.trim()}>
                ADD</button>
            </form>
        </>
    );
}

export default TodoInput