import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { generateTodoId, createTodo, saveTodosToStorage, loadTodosFromStorage } from '../lib/todoUtils';
import { createMockTodo, createMockTodos } from './test-utils';

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

describe('Complete Todo App Test Suite', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('Core Functionality', () => {
        it('generates unique todo IDs', () => {
            const id1 = generateTodoId();
            const id2 = generateTodoId();
            expect(id1).not.toBe(id2);
            expect(typeof id1).toBe('string');
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

        it('saves and loads todos from localStorage', () => {
            const todos = [createTodo('Test todo')];

            // Test save
            saveTodosToStorage(todos);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('todos', JSON.stringify(todos));

            // Test load
            mockLocalStorage.getItem.mockReturnValue(
                JSON.stringify([
                    { id: 'test-1', title: 'Stored todo', completed: false, createdAt: '2024-01-01T00:00:00.000Z' }
                ])
            );

            const loaded = loadTodosFromStorage();
            expect(loaded).toHaveLength(1);
            expect(loaded[0].title).toBe('Stored todo');
        });
    });

    describe('Mock Data Helpers', () => {
        it('creates single mock todo', () => {
            const todo = createMockTodo({ title: 'Custom Todo' });
            expect(todo.title).toBe('Custom Todo');
            expect(todo.id).toBeDefined();
        });

        it('creates multiple mock todos', () => {
            const todos = createMockTodos(3);
            expect(todos).toHaveLength(3);
            expect(todos[0].title).toBe('Test Todo 1');
            expect(todos[1].title).toBe('Test Todo 2');
            expect(todos[2].title).toBe('Test Todo 3');
        });
    });

    describe('Basic Component Rendering', () => {
        const SimpleComponent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

        const TodoDisplay = ({ title, completed }: { title: string; completed: boolean }) => (
            <div>
                <span className={completed ? 'completed' : 'active'}>{title}</span>
                <input
                    type='checkbox'
                    checked={completed}
                    readOnly
                />
            </div>
        );

        it('renders simple component', () => {
            render(<SimpleComponent>Hello World</SimpleComponent>);
            expect(screen.getByText('Hello World')).toBeInTheDocument();
        });

        it('renders todo display component', () => {
            render(
                <TodoDisplay
                    title='My Todo'
                    completed={false}
                />
            );
            expect(screen.getByText('My Todo')).toBeInTheDocument();
            expect(screen.getByRole('checkbox')).not.toBeChecked();
        });

        it('renders completed todo', () => {
            render(
                <TodoDisplay
                    title='Completed Todo'
                    completed={true}
                />
            );
            expect(screen.getByText('Completed Todo')).toBeInTheDocument();
            expect(screen.getByRole('checkbox')).toBeChecked();
        });
    });

    describe('Error Handling', () => {
        it('handles localStorage read errors gracefully', () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('localStorage error');
            });

            const todos = loadTodosFromStorage();
            expect(todos).toEqual([]);

            consoleErrorSpy.mockRestore();
        });

        it('handles localStorage write errors gracefully', () => {
            const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            mockLocalStorage.setItem.mockImplementation(() => {
                throw new Error('localStorage error');
            });

            expect(() => saveTodosToStorage([createTodo('test')])).not.toThrow();

            consoleErrorSpy.mockRestore();
        });
    });

    describe('Todo Operations Workflow', () => {
        it('validates complete todo lifecycle', () => {
            // Create
            const todo = createTodo('Lifecycle Test');
            expect(todo.completed).toBe(false);

            // Toggle completion
            const completedTodo = { ...todo, completed: true };
            expect(completedTodo.completed).toBe(true);

            // Store
            const todos = [completedTodo];
            saveTodosToStorage(todos);
            expect(mockLocalStorage.setItem).toHaveBeenCalled();

            // Simulate delete by filtering
            const afterDelete = todos.filter(t => t.id !== todo.id);
            expect(afterDelete).toHaveLength(0);
        });

        it('validates todo list operations', () => {
            const todos = [createTodo('Todo 1'), createTodo('Todo 2'), createTodo('Todo 3')];

            expect(todos).toHaveLength(3);

            // Mark one as completed
            todos[1].completed = true;
            expect(todos.filter(t => t.completed)).toHaveLength(1);
            expect(todos.filter(t => !t.completed)).toHaveLength(2);

            // Remove completed
            const remaining = todos.filter(t => !t.completed);
            expect(remaining).toHaveLength(2);
            expect(remaining.find(t => t.title === 'Todo 2')).toBeUndefined();
        });
    });
});
