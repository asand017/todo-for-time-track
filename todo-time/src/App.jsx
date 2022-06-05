import React, { useState, useEffect } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
  } from 'react-query';
import { getTodos, addTodo } from './api/apiService';

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
        <div>
            <button onClick={() => {
                mutation.mutate({
                    name: "fucker",
                    description: "kill",
                    priority: 3
                })
            }}>Add Todo</button>
        </div>
    )
}  

export default App;