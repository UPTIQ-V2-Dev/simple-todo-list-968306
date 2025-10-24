import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoFormSchema, TodoFormData } from '../schemas/todoSchema';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Plus } from 'lucide-react';

interface TodoFormProps {
    onAddTodo: (title: string) => void;
}

export const TodoForm = ({ onAddTodo }: TodoFormProps) => {
    const form = useForm<TodoFormData>({
        resolver: zodResolver(todoFormSchema),
        defaultValues: {
            title: ''
        }
    });

    const onSubmit = (data: TodoFormData) => {
        onAddTodo(data.title);
        form.reset();
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex gap-2'
            >
                <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormControl>
                                <Input
                                    placeholder='Add a new todo...'
                                    {...field}
                                    className='h-11'
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type='submit'
                    size='default'
                    className='h-11 px-4'
                    disabled={form.formState.isSubmitting}
                >
                    <Plus className='h-4 w-4' />
                    <span className='sr-only'>Add todo</span>
                </Button>
            </form>
        </Form>
    );
};
