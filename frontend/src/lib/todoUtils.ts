import { Todo } from '../types/todo';

export const generateTodoId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createTodo = (title: string): Todo => ({
    id: generateTodoId(),
    title,
    completed: false,
    createdAt: new Date()
});

export const saveTodosToStorage = (todos: Todo[]): void => {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error('Failed to save todos to localStorage:', error);
    }
};

export const loadTodosFromStorage = (): Todo[] => {
    try {
        const stored = localStorage.getItem('todos');
        if (!stored) return [];

        const parsed = JSON.parse(stored);
        return parsed.map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt)
        }));
    } catch (error) {
        console.error('Failed to load todos from localStorage:', error);
        return [];
    }
};
