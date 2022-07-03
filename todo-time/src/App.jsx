import React, { useState, useEffect } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
  } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { getTodos, addTodo, deleteTodo, updateTodo, completeTodo } from './api/apiService';
import Container from '@mui/material/Container';
import TaskAdd from './Components/tasks/TaskAdd';
import TaskList from './Components/tasks/TaskList';
import { DeleteContext, UpdateContext, CompleteTodoContext } from './Contexts.js';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Todos />
            <ReactQueryDevtools initialIsOpen={false}/>
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

    const markTodoComplete = useMutation(completeTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
    })

    return (
        <Container maxWidth='lg'>
            <h1>Time Tracker</h1>
            <TaskAdd mutation={mutation} />
            <DeleteContext.Provider value={del}>
                <UpdateContext.Provider value={updateMutation}>
                    <CompleteTodoContext.Provider value={markTodoComplete}>
                        <TaskList query={get}/>
                    </CompleteTodoContext.Provider>
                </UpdateContext.Provider>
            </DeleteContext.Provider>  
        </Container>
    )
}  

export default App;