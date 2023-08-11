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
        <TodoInputWrapper>
            <form onSubmit={handleAddTodo}>
                <TodoInputBox>
                    <input data-testid="new-todo-input"
                        onChange={handleTodoChange}
                        value={todoItem}
                        placeholder='오늘의 할 일을 적어주세요'
                    />
                    <button data-testid="new-todo-add-button"
                            type='submit'
                            disabled={!todoItem.trim()}>
                    add</button>
                </TodoInputBox>
            </form>
        </TodoInputWrapper>
    );
}

const TodoInputWrapper = styled.div`
    form {
        display: flex;
    }
`
const TodoInputBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 40rem;
    height: 5.5rem;
    background-color: white;
    border-radius: 1.5rem;
    box-shadow: #d7d7d7 2px 3px 5px;
    padding: 0 1.5rem;

    transition: width 0.3s, height 0.3s;

    &:focus-within {
        width: 43rem;
        height: 7rem;
        padding: 0 1.7rem;
    }

    input {
        background-color: white;
    }

    button{
        padding: 0.7rem 1.3rem;
        margin: 0 0 0 5rem;
        border-radius: 1rem;
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
export default TodoInput