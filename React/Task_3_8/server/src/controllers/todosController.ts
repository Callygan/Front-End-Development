import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Todo } from '../models/todo';

// Helper
const isValidId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// GET /todos
export const getTodos = async (_req: Request, res: Response) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

// GET /todos/:id
export const getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch {
        res.status(500).json({ error: 'Failed to fetch todo' });
    }
};

// POST /todos
export const createTodo = async (req: Request, res: Response) => {
    const { title, description, completed } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    try {
        const todo = await Todo.create({ title, description, completed });
        res.status(201).json(todo);
    } catch {
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

// PUT /todos/:id
export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid id' });
    const { title, description, completed } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true, runValidators: true }
        );
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

// DELETE /todos/:id
export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.status(204).send();
    } catch {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};