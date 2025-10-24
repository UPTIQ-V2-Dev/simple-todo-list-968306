import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateTodoId, createTodo, saveTodosToStorage, loadTodosFromStorage } from '../lib/todoUtils';
import { createMockTodo } from './test-utils';

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

describe('Essential Todo Functionality Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Todo Utils', () => {
        it('generates unique todo IDs', () => {
            const id1 = generateTodoId();
            const id2 = generateTodoId();

            expect(id1).not.toBe(id2);
            expect(typeof id1).toBe('string');
            expect(id1.length).toBeGreaterThan(0);
        });

        it('creates todo with correct structure', () => {
            const title = 'Test todo';
            const todo = createTodo(title);

            expect(todo).toMatchObject({
                title,
                completed: false
            });
            expect(todo.id).toBeDefined();
            expect(todo.createdAt).toBeInstanceOf(Date);
        });

        it('saves todos to localStorage', () => {
            const todos = [createTodo('Test todo')];

            saveTodosToStorage(todos);

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(todos));
        });

        it('loads todos from localStorage', () => {
            const storedTodos = [
                {
                    id: 'test-1',
                    title: 'Stored todo',
                    completed: true,
                    createdAt: '2024-01-01T00:00:00.000Z'
                }
            ];

            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedTodos));

            const todos = loadTodosFromStorage();

            expect(todos).toHaveLength(1);
            expect(todos[0]).toMatchObject({
                id: 'test-1',
                title: 'Stored todo',
                completed: true
            });
            expect(todos[0].createdAt).toBeInstanceOf(Date);
        });

        it('handles localStorage errors gracefully', () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('localStorage error');
            });

            const todos = loadTodosFromStorage();

            expect(todos).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalled();

            consoleErrorSpy.mockRestore();
        });
    });

    describe('Mock Data Helpers', () => {
        it('creates mock todo with defaults', () => {
            const todo = createMockTodo();

            expect(todo).toMatchObject({
                title: 'Test Todo',
                completed: false
            });
            expect(todo.id).toBeDefined();
            expect(todo.createdAt).toBeInstanceOf(Date);
        });

        it('creates mock todo with overrides', () => {
            const todo = createMockTodo({
                title: 'Custom Todo',
                completed: true
            });

            expect(todo.title).toBe('Custom Todo');
            expect(todo.completed).toBe(true);
        });
    });

    describe('Todo Operations', () => {
        it('validates todo creation workflow', () => {
            const title = 'My New Todo';
            const todo = createTodo(title);

            // Verify new todo structure
            expect(todo.title).toBe(title);
            expect(todo.completed).toBe(false);
            expect(todo.id).toMatch(/^[a-z0-9]+$/);

            // Verify can be stored
            const todos = [todo];
            saveTodosToStorage(todos);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(todos));
        });

        it('validates todo completion toggle workflow', () => {
            const todo = createTodo('Toggle test');

            // Initial state
            expect(todo.completed).toBe(false);

            // Toggle completion
            const toggledTodo = { ...todo, completed: !todo.completed };
            expect(toggledTodo.completed).toBe(true);

            // Toggle back
            const toggledBack = { ...toggledTodo, completed: !toggledTodo.completed };
            expect(toggledBack.completed).toBe(false);
        });
    });
});
