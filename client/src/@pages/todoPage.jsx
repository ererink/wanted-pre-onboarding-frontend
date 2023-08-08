import React from 'react';
import TodoList from '../@components/todo/todoList';
import TodoInput from '../@components/todo/todoInput';
function TodoPage() {
    return(
        <>
            <TodoInput onAddTodo={handleAddTodo}/>
            <TodoList todoItems={todoItems} handleTodoComplete={handleTodoComplete} />
        </>
    )
}

export default TodoPage