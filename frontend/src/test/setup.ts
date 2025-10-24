import '@testing-library/jest-dom';

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
        clear: vi.fn()
    }
});

// Mock CSS imports
vi.mock('../styles/index.css', () => ({}));

// Suppress warnings and errors during tests
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
    if (
        typeof args[0] === 'string' &&
        (args[0].includes('act') || args[0].includes('ReactDOM') || args[0].includes('test-utils'))
    ) {
        return;
    }
    originalWarn.call(console, ...args);
};

console.error = (...args) => {
    if (
        typeof args[0] === 'string' &&
        (args[0].includes('act') || args[0].includes('ReactDOM') || args[0].includes('test-utils'))
    ) {
        return;
    }
    originalError.call(console, ...args);
};
