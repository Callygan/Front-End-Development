import mongoose, { Schema, Document } from 'mongoose';

// Document type — extends Mongoose's Document so we get _id, save(), etc.
export interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
}

const todoSchema = new Schema<ITodo>(
    {
        title: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }   // adds createdAt + updatedAt automatically
);

export const Todo = mongoose.model<ITodo>('Todo', todoSchema);
