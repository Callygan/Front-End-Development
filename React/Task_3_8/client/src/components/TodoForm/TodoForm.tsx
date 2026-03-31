import React, { useState } from 'react';
import { useTodos } from '../../hooks/useTodos';

const TodoForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const { addTodo } = useTodos();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        addTodo.mutate({ title: title.trim() });
        setTitle('');
    };

    return (
        <div className="todo-header">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
                placeholder="Type here to add a task..."
            />
            <button onClick={handleSubmit} disabled={addTodo.isPending}>
                + Add
            </button>
        </div>
    );
};

export default TodoForm;
