import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { App } from '../App';

describe('App', () => {
    it('should render the todo app', () => {
        render(<App />);
        expect(screen.getByText(/Todo App/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Add a new todo.../i)).toBeInTheDocument();
    });
});
