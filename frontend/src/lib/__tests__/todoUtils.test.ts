import { describe, it, expect, beforeEach, vi } from 'vitest';
import { generateTodoId, createTodo, saveTodosToStorage, loadTodosFromStorage } from '../todoUtils';
import { createMockLocalStorage } from '../../test/mocks/localStorage';

// Mock localStorage
const mockLocalStorage = createMockLocalStorage();
Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

describe('todoUtils', () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        vi.clearAllMocks();
    });

    describe('generateTodoId', () => {
        it('generates unique IDs', () => {
            const id1 = generateTodoId();
            const id2 = generateTodoId();

            expect(id1).not.toBe(id2);
            expect(typeof id1).toBe('string');
            expect(typeof id2).toBe('string');
            expect(id1.length).toBeGreaterThan(0);
        });
    });

    describe('createTodo', () => {
        it('creates todo with correct structure', () => {
            const title = 'Test todo';
            const todo = createTodo(title);

            expect(todo).toMatchObject({
                title,
                completed: false
            });
            expect(todo.id).toBeDefined();
            expect(typeof todo.id).toBe('string');
            expect(todo.createdAt).toBeInstanceOf(Date);
        });

        it('generates unique IDs for different todos', () => {
            const todo1 = createTodo('Todo 1');
            const todo2 = createTodo('Todo 2');

            expect(todo1.id).not.toBe(todo2.id);
        });
    });

    describe('saveTodosToStorage', () => {
        it('saves todos to localStorage', () => {
            const todos = [createTodo('Test todo')];

            saveTodosToStorage(todos);

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(todos));
        });

        it('handles localStorage errors gracefully', () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            mockLocalStorage.setItem.mockImplementation(() => {
                throw new Error('localStorage error');
            });

            const todos = [createTodo('Test todo')];

            expect(() => saveTodosToStorage(todos)).not.toThrow();
            expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to save todos to localStorage:', expect.any(Error));

            consoleErrorSpy.mockRestore();
        });
    });

    describe('loadTodosFromStorage', () => {
        it('returns empty array when no todos stored', () => {
            mockLocalStorage.getItem.mockReturnValue(null);

            const todos = loadTodosFromStorage();

            expect(todos).toEqual([]);
        });

        it('loads and parses todos from localStorage', () => {
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
            expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load todos from localStorage:', expect.any(Error));

            consoleErrorSpy.mockRestore();
        });

        it('handles invalid JSON gracefully', () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            mockLocalStorage.getItem.mockReturnValue('invalid json');

            const todos = loadTodosFromStorage();

            expect(todos).toEqual([]);
            expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load todos from localStorage:', expect.any(Error));

            consoleErrorSpy.mockRestore();
        });
    });
});
