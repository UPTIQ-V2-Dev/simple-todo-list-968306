import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { TodoList } from '../TodoList';
import { createMockTodos } from '../../test/test-utils';

describe('TodoList', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    beforeEach(() => {
        mockOnToggle.mockClear();
        mockOnDelete.mockClear();
    });

    it('renders list of todos correctly', () => {
        const todos = createMockTodos(3);
        render(
            <TodoList
                todos={todos}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        todos.forEach(todo => {
            expect(screen.getByText(todo.title)).toBeInTheDocument();
        });
    });

    it('shows empty state when no todos', () => {
        render(
            <TodoList
                todos={[]}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument();
    });

    it('passes correct props to TodoItem components', () => {
        const todos = createMockTodos(2);
        render(
            <TodoList
                todos={todos}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        // Check that all todo items are rendered with checkboxes and delete buttons
        expect(screen.getAllByRole('checkbox')).toHaveLength(2);
        expect(screen.getAllByRole('button')).toHaveLength(2); // Delete buttons
    });

    it('handles empty array without crashing', () => {
        render(
            <TodoList
                todos={[]}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        expect(screen.getByText('No todos yet. Add one above to get started!')).toBeInTheDocument();
    });
});
