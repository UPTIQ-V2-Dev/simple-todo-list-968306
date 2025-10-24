import { Todo } from '../types/todo';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
    return (
        <div className='flex items-center gap-3 p-3 border rounded-lg bg-card'>
            <Checkbox
                checked={todo.completed}
                onCheckedChange={() => onToggle(todo.id)}
                aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
            />
            <span className={cn('flex-1 text-sm', todo.completed && 'line-through text-muted-foreground')}>
                {todo.title}
            </span>
            <Button
                variant='ghost'
                size='sm'
                onClick={() => onDelete(todo.id)}
                className='h-8 w-8 p-0 text-muted-foreground hover:text-destructive'
                aria-label={`Delete ${todo.title}`}
            >
                <Trash2 className='h-4 w-4' />
            </Button>
        </div>
    );
};
