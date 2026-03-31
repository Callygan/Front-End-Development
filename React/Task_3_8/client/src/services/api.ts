import axios from 'axios';
import { Todo, CreateTodoInput } from '../types';

const API_URL = 'http://localhost:5000/todos';

export const fetchTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTodo = async (todo: CreateTodoInput): Promise<Todo> => {
    const response = await axios.post(API_URL, todo);
    return response.data;
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/${todo._id}`, todo);
    return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};