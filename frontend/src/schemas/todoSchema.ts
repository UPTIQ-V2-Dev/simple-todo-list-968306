import { z } from 'zod';

export const todoFormSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters')
});

export const todoSchema = z.object({
    id: z.string(),
    title: z.string(),
    completed: z.boolean(),
    createdAt: z.date()
});

export type TodoFormData = z.infer<typeof todoFormSchema>;
export type TodoData = z.infer<typeof todoSchema>;
