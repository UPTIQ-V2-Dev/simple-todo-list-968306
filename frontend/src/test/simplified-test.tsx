import { describe, it, expect } from 'vitest';
import { createMockTodo } from './test-utils';
import { generateTodoId, createTodo } from '../lib/todoUtils';

describe('Simplified Todo Tests', () => {
    it('should generate unique todo IDs', () => {
        const id1 = generateTodoId();
        const id2 = generateTodoId();
        expect(id1).not.toBe(id2);
        expect(typeof id1).toBe('string');
    });

    it('should create todo with correct structure', () => {
        const title = 'Test todo';
        const todo = createTodo(title);

        expect(todo).toMatchObject({
            title,
            completed: false
        });
        expect(todo.id).toBeDefined();
        expect(todo.createdAt).toBeInstanceOf(Date);
    });

    it('should create mock todo', () => {
        const mockTodo = createMockTodo({ title: 'Mock Todo' });
        expect(mockTodo.title).toBe('Mock Todo');
        expect(mockTodo.completed).toBe(false);
        expect(mockTodo.id).toBeDefined();
    });
});
