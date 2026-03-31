import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import { Todo, CreateTodoInput } from '../types';

export const useTodos = () => {
  const queryClient = useQueryClient();

  //  Fetch
  const { data: todos = [], isLoading, error } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // Create (optimistic)
  const addTodo = useMutation({
    mutationFn: (input: CreateTodoInput) => createTodo(input),
    onMutate: async (newInput) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      const optimistic: Todo = {
        _id: `temp-${Date.now()}`,
        title: newInput.title,
        completed: false,
      };
      queryClient.setQueryData<Todo[]>(['todos'], (old = []) => [...old, optimistic]);
      return { previousTodos };
    },
    onError: (_err, _input, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Update (optimistic)
  const editTodo = useMutation({
    mutationFn: (todo: Todo) => updateTodo(todo),
    onMutate: async (updated) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.map((t) => (t._id === updated._id ? updated : t))
      );
      return { previousTodos };
    },
    onError: (_err, _updated, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Delete (optimistic)
  const removeTodo = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old = []) =>
        old.filter((t) => t._id !== id)
      );
      return { previousTodos };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Clear All (optimistic)
  const clearAll = useMutation({
    mutationFn: async (todosToDelete: Todo[]) => {
      await Promise.all(todosToDelete.map((t) => deleteTodo(t._id)));
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
      queryClient.setQueryData<Todo[]>(['todos'], []);
      return { previousTodos };
    },
    onError: (_err, _v, context) => {
      queryClient.setQueryData(['todos'], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return { todos, isLoading, error, addTodo, editTodo, removeTodo, clearAll };
};
