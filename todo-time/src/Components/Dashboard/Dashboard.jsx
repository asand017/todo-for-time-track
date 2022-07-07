import React, { useEffect } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
  } from 'react-query';
import { getTodos, addTodo, deleteTodo, updateTodo, completeTodo } from '../../api/apiService';
import Container from '@mui/material/Container';
import TaskAdd from './Tasks/TaskAdd';
import TaskList from './Tasks/TaskList';
import { DeleteContext, UpdateContext, CompleteTodoContext } from '../../Contexts.js';
import { useAuth } from '../../custom_hooks/useAuth';

const queryClient = new QueryClient();

export default function Dashboard() {
    // get auth token
    const { token, onLogin, onLogout } = useAuth();

    useEffect(() => {
        console.log("token: ", token);
    }, [token]);

    return(
        <>
            <h2>Dashboard</h2>
            <QueryClientProvider client={queryClient}>
                <Todos token={token}/>
            </QueryClientProvider>
        </>
    );
}

function Todos(props) {
    const queryClient = useQueryClient();
    const token = props.token;

    const get = useQuery('todos', () => getTodos(token));

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