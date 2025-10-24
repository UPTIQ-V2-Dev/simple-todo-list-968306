import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Simple test component
const TestComponent = () => <div>Hello Test</div>;

describe('Basic Component Test', () => {
    it('should render a simple component', () => {
        render(<TestComponent />);
        expect(screen.getByText('Hello Test')).toBeInTheDocument();
    });
});
