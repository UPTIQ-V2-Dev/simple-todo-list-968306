import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTodos } from '../useTodos';
import { createMockLocalStorage } from '../../test/mocks/localStorage';

// Mock localStorage
const mockLocalStorage = createMockLocalStorage();
Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

describe('useTodos', () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        vi.clearAllMocks();
    });

    it('initializes with empty todos array', () => {
        const { result } = renderHook(() => useTodos());

        expect(result.current.todos).toEqual([]);
    });

    it('adds new todo with correct structure', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('Test todo');
        });

        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0]).toMatchObject({
            title: 'Test todo',
            completed: false
        });
        expect(result.current.todos[0].id).toBeDefined();
        expect(result.current.todos[0].createdAt).toBeInstanceOf(Date);
    });

    it('toggles todo completion status', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('Test todo');
        });

        const todoId = result.current.todos[0].id;

        act(() => {
            result.current.toggleTodo(todoId);
        });

        expect(result.current.todos[0].completed).toBe(true);

        act(() => {
            result.current.toggleTodo(todoId);
        });

        expect(result.current.todos[0].completed).toBe(false);
    });

    it('deletes todo by ID', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('Todo 1');
            result.current.addTodo('Todo 2');
        });

        expect(result.current.todos).toHaveLength(2);

        const todoId = result.current.todos[0].id;

        act(() => {
            result.current.deleteTodo(todoId);
        });

        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0].title).toBe('Todo 2');
    });

    it('persists todos to localStorage', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('Test todo');
        });

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith('todos', expect.stringContaining('Test todo'));
    });

    it('loads todos from localStorage on mount', () => {
        const existingTodos = [
            {
                id: 'test-1',
                title: 'Existing todo',
                completed: false,
                createdAt: '2024-01-01T00:00:00.000Z'
            }
        ];

        mockLocalStorage.getItem.mockReturnValue(JSON.stringify(existingTodos));

        const { result } = renderHook(() => useTodos());

        expect(result.current.todos).toHaveLength(1);
        expect(result.current.todos[0].title).toBe('Existing todo');
        expect(result.current.todos[0].createdAt).toBeInstanceOf(Date);
    });

    it('handles localStorage errors gracefully', () => {
        mockLocalStorage.getItem.mockImplementation(() => {
            throw new Error('localStorage error');
        });

        const { result } = renderHook(() => useTodos());

        expect(result.current.todos).toEqual([]);
    });

    it('adds new todos to the beginning of the list', () => {
        const { result } = renderHook(() => useTodos());

        act(() => {
            result.current.addTodo('First todo');
            result.current.addTodo('Second todo');
        });

        expect(result.current.todos[0].title).toBe('Second todo');
        expect(result.current.todos[1].title).toBe('First todo');
    });
});
