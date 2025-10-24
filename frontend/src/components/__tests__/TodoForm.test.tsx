import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { TodoForm } from '../TodoForm';

describe('TodoForm', () => {
    const mockOnAddTodo = vi.fn();

    beforeEach(() => {
        mockOnAddTodo.mockClear();
    });

    it('renders form with input and submit button', () => {
        render(<TodoForm onAddTodo={mockOnAddTodo} />);

        expect(screen.getByPlaceholderText('Add a new todo...')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
    });

    it('calls onAddTodo with correct data on submit', async () => {
        const user = userEvent.setup();
        render(<TodoForm onAddTodo={mockOnAddTodo} />);

        const input = screen.getByPlaceholderText('Add a new todo...');
        const button = screen.getByRole('button', { name: /add todo/i });

        await user.type(input, 'New todo item');
        await user.click(button);

        await waitFor(() => {
            expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item');
        });
    });

    it('clears form after successful submission', async () => {
        const user = userEvent.setup();
        render(<TodoForm onAddTodo={mockOnAddTodo} />);

        const input = screen.getByPlaceholderText('Add a new todo...');

        await user.type(input, 'New todo item');
        fireEvent.submit(input.closest('form')!);

        await waitFor(() => {
            expect(input).toHaveValue('');
        });
    });

    it('validates required title field', async () => {
        const user = userEvent.setup();
        render(<TodoForm onAddTodo={mockOnAddTodo} />);

        const button = screen.getByRole('button', { name: /add todo/i });
        await user.click(button);

        await waitFor(() => {
            expect(screen.getByText('Title is required')).toBeInTheDocument();
        });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    it('validates maximum character limit', async () => {
        const user = userEvent.setup();
        render(<TodoForm onAddTodo={mockOnAddTodo} />);

        const input = screen.getByPlaceholderText('Add a new todo...');
        const longTitle = 'a'.repeat(101); // Exceeds 100 character limit

        await user.type(input, longTitle);
        fireEvent.submit(input.closest('form')!);

        await waitFor(() => {
            expect(screen.getByText('Title must be less than 100 characters')).toBeInTheDocument();
        });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    it('allows valid title within character limit', async () => {
        const user = userEvent.setup();
        render(<TodoForm onAddTodo={mockOnAddTodo} />);

        const input = screen.getByPlaceholderText('Add a new todo...');
        const validTitle = 'a'.repeat(100); // Exactly 100 characters

        await user.type(input, validTitle);
        fireEvent.submit(input.closest('form')!);

        await waitFor(() => {
            expect(mockOnAddTodo).toHaveBeenCalledWith(validTitle);
        });
    });
});
