import React, { useState, useEffect } from 'react';
import { Todo } from '../../types';

interface TodoItemProps {
    todo: Todo;
    onEdit: (todo: Todo) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    useEffect(() => { setEditTitle(todo.title); }, [todo.title]);

    const handleSave = () => {
        const trimmed = editTitle.trim();
        if (!trimmed) { setEditTitle(todo.title); setIsEditing(false); return; }
        onEdit({ ...todo, title: trimmed });
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') { setEditTitle(todo.title); setIsEditing(false); }
    };

    return (
        <li className={todo.completed ? 'completed' : ''}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onEdit({ ...todo, completed: !todo.completed })}
            />

            {isEditing ? (
                <input
                    autoFocus
                    type="text"
                    className="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleSave}
                />
            ) : (
                <span className="text">{todo.title}</span>
            )}

            <div className="actions">
                {!isEditing ? (
                    <button className="modify" title="Edit"
                        onClick={() => { setEditTitle(todo.title); setIsEditing(true); }}>
                        <img src="/images/rename-icon.png" alt="Edit" />
                    </button>
                ) : (
                    <button className="check" title="Save" onClick={handleSave}>
                        <img src="/images/check-icon.png" alt="Save" />
                    </button>
                )}
                {!isEditing && (
                    <button className="delete" title="Delete" onClick={() => onDelete(todo._id)}>
                        <img src="/images/trash-icon.png" alt="Delete" />
                    </button>
                )}
            </div>
        </li>
    );
};

export default TodoItem;
