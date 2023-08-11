import React, { useState, useEffect} from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import CancelIcon from '../../assets/cancel.png';
import EditIcon from '../../assets/edit.png';
import DeleteIcon from '../../assets/delete.png';
import AddIcon from '../../assets/add.png';

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
                <TodoItems>
                    {todoItems.map((todo) => (
                        todo.id === editedItemId ? (
                            <TodoEditItem key={todo.id} checked={todo.isCompleted}>
                                <label>
                                    <input
                                        type='checkbox'
                                        checked={todo.isCompleted}
                                        onChange={() => handleCheckedChange()}
                                        disabled={isEditing}
                                    />
                                </label>
                                <TodoEditInputBox>
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
                                        >
                                        <img src={AddIcon} alt='Add Icon'width={20} height={20}/>
                                        </button>
                                        <button
                                            data-testid="cancel-button"
                                            onClick={() => setIsEditing(false)}
                                        >
                                        <img src={CancelIcon} alt='Cancel Icon' width={18} height={18}/>
                                        </button>
                                        
                                    </form>
                                </TodoEditInputBox>
                            </TodoEditItem>
                        ) : (
                            <TodoItem key={todo.id} checked={todo.isCompleted}>
                                <label>
                                    <input
                                        type='checkbox'
                                        checked={todo.isCompleted}
                                        onChange={() => handleCheckedChange(todo.id)}
                                    />
                                    <span>{todo.todo}</span>
                                </label>
                                <TodoButton>
                                    <button
                                        data-testid="modify-button"
                                        type='button'
                                        onClick={() => handleTodoEdit(todo.id)}
                                    ><img src={EditIcon} alt='Edit Icon' width={20} height={20}/>
                                    </button>
                                    <button
                                        data-testid="delete-button"
                                        onClick={() => handleTodoDelete(todo.id)}
                                    >
                                    <img src={DeleteIcon} alt='Delete Icon' width={20} height={20}/>
                                    </button>
                                </TodoButton>
                            </TodoItem>
                        )
                    ))}
                </TodoItems>
                
            </TodoListWrapper>
        );
    } else {
        return (
            <TodoListWrapper>
                <TodoItems>
                   {todoItems.map((todo) =>(
                        <TodoItem key={todo.id} checked={todo.isCompleted}>
                            <label>
                                <input type='checkbox'
                                    checked={todo.isCompleted}
                                    onChange={() => handleCheckedChange(todo.id)}
                                />
                                <span>{todo.todo}</span>
                            </label>
                            <TodoButton>
                                 <button data-testid="modify-button"
                                        type='submit'
                                        onClick={() => handleTodoEdit(todo.id)}
                                >
                                <img src={EditIcon} alt='Edit Icon'/>
                                </button>
                                <button data-testid="delete-button"
                                        onClick={() => handleTodoDelete(todo.id)}
                                >
                                <img src={DeleteIcon} alt='Delete Icon'/>
                                </button>
                            </TodoButton>
                           
                        </TodoItem>
                    ))} 
                </TodoItems>
                
            </TodoListWrapper>
        );
    }
    
};

const TodoListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: 3rem 0 0 0;
`;

const TodoItems = styled.ul``;

const TodoItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 40rem;
    height: 5.5rem;
    background-color: white;
    border: 0.5px solid orange;
    border-radius: 1.5rem;
    margin: 2rem 0;
    padding: 0 2rem;

    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    label {
        display: flex;
        align-items: center;
    }

    span {
        font-size: 1.4rem;
        font-weight: 480;
        text-decoration: ${props => props.checked ? 'line-through' : 'none'};
        color: ${props => props.checked ? '#888888' : 'inherit'};
    }

    input[type="checkbox"] {
        border: 1px solid #cecece;
        border-radius: 5px;
        width: 15px;
        height: 15px;
        margin: 0 1.3rem 0 0;
        cursor: pointer;
        background-color: transparent;
        outline: none;
    }

    input[type="checkbox"]:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: orange;
    }
`;

const TodoButton = styled.div`
    img {
        width: 1.9rem;
        height: 1.9rem;
    }
    button {
        margin: 0 0.3rem;
    }
`
const TodoEditItem = styled.div`
    display: flex;
    align-items: center;

    width: 40rem;
    height: 5.5rem;
    background-color: white;
    border: 0.5px solid orange;
    border-radius: 1.5rem;
    margin: 2rem 0;
    padding: 0 2rem;

    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    label {
        display: flex;
        align-items: center;
    }

    span {
        font-size: 1.4rem;
        font-weight: 480;
        text-decoration: ${props => props.checked ? 'line-through' : 'none'};
        color: ${props => props.checked ? '#888888' : 'inherit'};
    }

    input {
        font-size: 1.4rem;
        font-weight: 480;
    }

    input[type="checkbox"] {
        border: 1px solid #cecece;
        border-radius: 5px;
        width: 15px;
        height: 15px;
        margin: 0 1.3rem 0 0;
        cursor: pointer;
        background-color: transparent;
        outline: none;
    }

    input[type="checkbox"]:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: orange;
    }
`

const TodoEditInputBox = styled.div`
    input {
        margin: 0 12.7rem 0 0;
    }

    button {
        img{
            margin: 0 4px ;
        }
        
    }
`

export default TodoList