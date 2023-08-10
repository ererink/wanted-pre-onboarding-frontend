import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

function TodoList(props){
    const [todoItems, setTodoItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedItem, setEditedItem] = useState('');
    const [editedItemId, setEditedItemId] = useState(null);
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
      }, [userToken, navigate, todoItems]);
    
    // 수정 폼 열기
    const handleTodoEdit = (todoId) => {
        const todoToEdit = todoItems.find(todo => todo.id === todoId);
        setEditedItem(todoToEdit.todo);
        setEditedItemId(todoId);
        setIsEditing(true);
    }

    // 수정 input 변경 감지
    const handleUpdatedChange = (event) => {
        setEditedItem(event.target.value);
    }
    // 체크박스 변경 감지
    const handleCheckedChange = (todoId) => {
        const updatedTodoItem = todoItems.map((todo) =>{
            if (todo.id === todoId) {
                todo.isCompleted = !todo.isCompleted;
            } 
        });
            
        setTodoItems(updatedTodoItem);
        handleTodoUpdated(todoId);
    }

    // 할 일 수정 및 완료된 할 일 처리
    const handleTodoUpdated = async (todoId) => {
        try{
            const updatedTodoItem = todoItems.map((todo) =>
                todo.id === todoId 
                ? { ...todo, 
                    isCompleted: todo.isCompleted,
                    todo: !editedItem ? todo.todo : editedItem
                } : todo             
            );
            setTodoItems(updatedTodoItem);
            
            console.log("isCompleted", todoId.isCompleted)
            // API 엔드포인트와 요청 데이터
            const apiUrl = `/todos/${todoId}`;
            const requestData = {
                todo: updatedTodoItem.find(todo => todo.id === todoId).todo,
                isCompleted: updatedTodoItem.find(todo => todo.id === todoId).isCompleted,
            };

            // 값 변경을 위한 API 요청
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData), 
            });

        } catch (error){
            console.log(error.message);
        }  
    }

    // 할 일 삭제
    const handleTodoDelete = async (todoId) => {
        try {
            const apiUrl = `/todos/${todoId}`;
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            if (response.status === 204) {
                const deletedTodoItem = todoItems.filter(todo => todo.id !== todoId);
                setTodoItems(deletedTodoItem);
            } else{
                console.log("삭제 실패");
            }
        } catch(error){
            console.log(error.message);
        }
    }

    if(isEditing && editedItemId){
        return (
            <TodoListWrapper>
                <h1>Todo List</h1>
                <TodoItems>
                    {todoItems.map((todo) => (
                        todo.id === editedItemId ? (
                            <TodoItem key={todo.id}>
                                <label>
                                    <input
                                        type='checkbox'
                                        checked={todo.isCompleted}
                                        onChange={() => handleCheckedChange()}
                                        disabled={isEditing}
                                    />
                                </label>
                                <form onSubmit={handleTodoUpdated}>
                                    <input
                                        data-testid="modify-input"
                                        value={editedItem}
                                        onChange={handleUpdatedChange}
                                    />
                                    <button
                                        data-testid="submit-button"
                                        type='submit'
                                        disabled={!editedItem.trim()}
                                        onClick={() => handleTodoUpdated(todo.id)}
                                    >제출</button>
                                    <button
                                        data-testid="cancel-button"
                                        onClick={() => setIsEditing(false)}
                                    >취소</button>
                                </form>
                            </TodoItem>
                        ) : (
                            <TodoItem key={todo.id}>
                                <label>
                                    <input
                                        type='checkbox'
                                        checked={todo.isCompleted}
                                        onChange={() => handleCheckedChange(todo.id)}
                                    />
                                    <span>{todo.todo}</span>
                                </label>
                                <button
                                    data-testid="modify-button"
                                    type='button'
                                    onClick={() => handleTodoEdit(todo.id)}
                                >수정</button>
                                <button
                                    data-testid="delete-button"
                                    onClick={() => handleTodoDelete(todo.id)}
                                >삭제</button>
                            </TodoItem>
                        )
                    ))}
                </TodoItems>
                
            </TodoListWrapper>
        );
    } else {
        return (
            <TodoListWrapper>
                <h1>Todo List</h1>
                <TodoItems>
                   {todoItems.map((todo) =>(
                        <TodoItem key={todo.id}>
                            <label>
                                <input type='checkbox'
                                    checked={todo.isCompleted}
                                    onChange={() => handleCheckedChange(todo.id)}
                                />
                                <span>{todo.todo}</span>
                            </label>
                            <button data-testid="modify-button"
                                    type='submit'
                                    onClick={() => handleTodoEdit(todo.id)}
                            >수정</button>
                            <button data-testid="delete-button"
                                    onClick={() => handleTodoDelete(todo.id)}
                            >삭제</button>
                        </TodoItem>
                    ))} 
                </TodoItems>
                
            </TodoListWrapper>
        );
    }
    
};

const TodoListWrapper = styled.div`
  
`;

const TodoItems = styled.ul`
  
`;

const TodoItem = styled.li`
  
`;

export default TodoList