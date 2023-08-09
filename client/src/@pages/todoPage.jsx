import React from 'react';
import TodoList from '../@components/todo/todoList';
import TodoInput from '../@components/todo/todoInput';

function TodoPage() {
    // const [todoItems, setTodoItems] = useState([]);
    
    // const handleAddTodo = (todoText) => {
    //     const newTodo = {
    //         id: Date.now(),
    //         text: todoText,
    //         isCompleted: false,
    //     };
    //     setTodoItems([...todoItems, newTodo]);
    // };

    return(
        <>
            <TodoInput />
            <TodoList />
        </>
    )
}

export default TodoPage