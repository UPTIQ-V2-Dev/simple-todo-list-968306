import { Todo } from '../types/todo';

// Mock data factories
export const createMockTodo = (overrides: Partial<Todo> = {}): Todo => ({
    id: 'test-id-' + Math.random().toString(36).substr(2, 9),
    title: 'Test Todo',
    completed: false,
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
    ...overrides
});

export const createMockTodos = (count: number): Todo[] =>
    Array.from({ length: count }, (_, i) =>
        createMockTodo({
            id: `test-id-${i}`,
            title: `Test Todo ${i + 1}`,
            completed: i % 2 === 0
        })
    );

// Re-export everything from testing library
export * from '@testing-library/react';
