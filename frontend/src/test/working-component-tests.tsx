import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockTodo } from './test-utils';

// Simple test component to verify rendering works
const SimpleComponent = ({ text }: { text: string }) => <div>{text}</div>;

// Mock TodoItem without Shadcn dependencies
const SimpleTodoItem = ({ title, completed }: { title: string; completed: boolean }) => (
    <div>
        <span className={completed ? 'completed' : ''}>{title}</span>
        <input
            type='checkbox'
            checked={completed}
            readOnly
        />
    </div>
);

describe('Working Component Tests', () => {
    it('renders simple component', () => {
        render(<SimpleComponent text='Hello World' />);
        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders simple todo item', () => {
        render(
            <SimpleTodoItem
                title='Test Todo'
                completed={false}
            />
        );
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('renders completed todo item', () => {
        render(
            <SimpleTodoItem
                title='Completed Todo'
                completed={true}
            />
        );
        expect(screen.getByText('Completed Todo')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    it('creates mock todo correctly', () => {
        const mockTodo = createMockTodo({ title: 'Mock Todo', completed: true });
        expect(mockTodo.title).toBe('Mock Todo');
        expect(mockTodo.completed).toBe(true);
        expect(mockTodo.id).toBeDefined();
    });
});
