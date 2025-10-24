import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { TodoItem } from '../TodoItem';
import { createMockTodo } from '../../test/test-utils';

describe('TodoItem', () => {
    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    beforeEach(() => {
        mockOnToggle.mockClear();
        mockOnDelete.mockClear();
    });

    it('displays todo title and completion status', () => {
        const todo = createMockTodo({ title: 'Test todo', completed: false });
        render(
            <TodoItem
                todo={todo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        expect(screen.getByText('Test todo')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('shows completed todo with line-through styling', () => {
        const todo = createMockTodo({ title: 'Completed todo', completed: true });
        render(
            <TodoItem
                todo={todo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        const todoText = screen.getByText('Completed todo');
        expect(todoText).toHaveClass('line-through');
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('toggles completion on checkbox click', async () => {
        const user = userEvent.setup();
        const todo = createMockTodo({ id: 'test-1' });

        render(
            <TodoItem
                todo={todo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        await user.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledWith('test-1');
    });

    it('calls delete function on delete button click', async () => {
        const user = userEvent.setup();
        const todo = createMockTodo({ id: 'test-1', title: 'Test todo' });

        render(
            <TodoItem
                todo={todo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        const deleteButton = screen.getByRole('button', { name: /delete test todo/i });
        await user.click(deleteButton);

        expect(mockOnDelete).toHaveBeenCalledWith('test-1');
    });

    it('has proper accessibility attributes', () => {
        const todo = createMockTodo({ title: 'Accessible todo' });

        render(
            <TodoItem
                todo={todo}
                onToggle={mockOnToggle}
                onDelete={mockOnDelete}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveAttribute('aria-label', 'Mark Accessible todo as complete');

        const deleteButton = screen.getByRole('button', { name: /delete accessible todo/i });
        expect(deleteButton).toBeInTheDocument();
    });
});
