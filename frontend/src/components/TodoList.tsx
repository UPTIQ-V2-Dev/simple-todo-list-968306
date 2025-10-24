import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoList = ({ todos, onToggle, onDelete }: TodoListProps) => {
    if (todos.length === 0) {
        return (
            <div className='text-center py-8 text-muted-foreground'>
                <p>No todos yet. Add one above to get started!</p>
            </div>
        );
    }

    return (
        <div className='flex flex-col gap-2'>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};
