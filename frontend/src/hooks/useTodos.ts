import { useState, useEffect } from 'react';
import { Todo } from '../types/todo';
import { createTodo, saveTodosToStorage, loadTodosFromStorage } from '../lib/todoUtils';

export const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Load todos from localStorage on mount
    useEffect(() => {
        const savedTodos = loadTodosFromStorage();
        setTodos(savedTodos);
    }, []);

    // Save todos to localStorage whenever todos change
    useEffect(() => {
        if (todos.length > 0 || localStorage.getItem('todos')) {
            saveTodosToStorage(todos);
        }
    }, [todos]);

    const addTodo = (title: string) => {
        const newTodo = createTodo(title);
        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prev => prev.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo
    };
};
