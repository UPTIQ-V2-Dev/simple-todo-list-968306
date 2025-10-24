import { useTodos } from '../hooks/useTodos';
import { TodoForm } from '../components/TodoForm';
import { TodoList } from '../components/TodoList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

export const TodoPage = () => {
    const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

    return (
        <div className='min-h-screen bg-background p-4'>
            <div className='mx-auto max-w-2xl'>
                <Card>
                    <CardHeader>
                        <CardTitle>Todo App</CardTitle>
                        <CardDescription>Keep track of your tasks with this simple todo app</CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-6'>
                        <TodoForm onAddTodo={addTodo} />
                        <TodoList
                            todos={todos}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                        />
                    </CardContent>
                </Card>

                {todos.length > 0 && (
                    <div className='mt-4 text-center text-sm text-muted-foreground'>
                        {todos.filter(todo => !todo.completed).length} of {todos.length} tasks remaining
                    </div>
                )}
            </div>
        </div>
    );
};
