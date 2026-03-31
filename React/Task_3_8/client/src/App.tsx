import React from 'react';
import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import { useTodos } from './hooks/useTodos';

const App: React.FC = () => {
  const { clearAll, todos } = useTodos();

  return (
    <>
      <div className="container">
        <div className="todo-app">
          <TodoForm />
        </div>
        <TodoList />
      </div>

      <button
        className="clear-btn"
        onClick={() => clearAll.mutate(todos)}
        disabled={clearAll.isPending}
      >
        <img src="/images/trash-icon.png" alt="Trash Icon" />
        Clear all tasks
      </button>
    </>
  );
};

export default App;