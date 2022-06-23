import React, { useState, useEffect } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
  } from 'react-query';
import { getTodos, addTodo, deleteTodo, updateTodo } from './api/apiService';
import Container from '@mui/material/Container';
import TaskAdd from './tasks/TaskAdd';
import TaskList from './tasks/TaskList';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Todos />
        </QueryClientProvider>
    )
}

function Todos() {
    const queryClient = useQueryClient();

    const get = useQuery('todos', getTodos);

    const del = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
    });

    const mutation = useMutation(addTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
    })

    const updateMutation = useMutation(updateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
    })

    return (
        <Container maxWidth='lg'>
            <TaskAdd mutation={mutation} />
            <TaskList client={queryClient} query={get} del={del} update={updateMutation}/>
        </Container>
    )
}  

export default App;