import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { useTodos } from '../../hooks/useTodos';
import { Todo } from '../../types';

const TodoList: React.FC = () => {
    const { todos, isLoading, error, editTodo, removeTodo } = useTodos();

    if (isLoading) return <ul id="todoList" />;
    if (error) return <p style={{ color: 'red', marginTop: 16 }}>Error loading todos. Is the server running?</p>;

    return (
        <ul id="todoList">
            {todos.map((todo: Todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onEdit={(updated) => editTodo.mutate(updated)}
                    onDelete={(id) => removeTodo.mutate(id)}
                />
            ))}
        </ul>
    );
};

export default TodoList;
