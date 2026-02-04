const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo_app';

// Connect to MongoDB; fail fast if unreachable.
mongoose
    .connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error', err);
        process.exit(1);
    });

// Basic Todo shape stored in Mongo; timestamps adds createdAt/updatedAt.
const todoSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        completed: { type: Boolean, default: false }
    },
    {timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);

// Parse incoming JSON bodies.
app.use(express.json());

// Simple health check/root endpoint.
app.get('/', (_req, res) => {
    res.send('Todo API is running');
});

// Helper to validate a Mongo ObjectId before hitting the database.
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// List all todos, newest first.
app.get('/todos', async(_req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// Retrieve a single todo by id.
app.get('/todos/:id', async(req, res) => {
    const { id } = req.params;
    if(!isValidId(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
        const todo = await Todo.findById(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch todo' });
}
});

// Create a new todo; title is required.
app.post ('/todos', async (req, res) => {
    const { title, description, completed } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    try {
        const todo = await Todo.create({ title, description, completed });
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// Update fields of an existing todo.
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid id' });
    const { title, description, completed } = req.body;
    try {
        const todo = await Todo.findByIdAndUpdate(
            id, 
            { title, description, completed },
            {new: true, runValidators: true }
        );
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// Delete a todo by id.
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid id' });
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json ({ error: 'Failed to delete todo' });
    }
});

app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
});