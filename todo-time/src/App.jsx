import React, { useState, useEffect } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
  } from 'react-query';
import { getTodos, addTodo } from './api/apiService';
import Container from '@mui/material/Container';
import TaskAdd from './tasks/TaskAdd';

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

    const query = useQuery('todos', getTodos)

    const mutation = useMutation(addTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
    })

    return (
        <Container maxWidth='lg'>
            <TaskAdd mutation={mutation} />
        </Container>
    )
}  

export default App;