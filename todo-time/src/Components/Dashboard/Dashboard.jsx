import React from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
  } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import { getTodos, addTodo, deleteTodo, updateTodo, completeTodo } from '../../api/apiService';
import Container from '@mui/material/Container';
import TaskAdd from './Tasks/TaskAdd';
import TaskList from './Tasks/TaskList';
import { DeleteContext, UpdateContext, CompleteTodoContext } from '../../Contexts.js';
import { useAuth } from '../../custom_hooks/useAuth';

const queryClient = new QueryClient();

export default function Dashboard() {
    // get auth token
    const { token, onLogout } = useAuth();

    return(
        <>
            <h2>Dashboard</h2>
            <QueryClientProvider client={queryClient}>
                <Todos token={token} handleLogout={onLogout}/>
            </QueryClientProvider>
        </>
    );
}

function Todos(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const queryClient = useQueryClient();
    //const token = props.token;

    const expiredToken = (err) => {
        if(err.response.data === "Invalid Token"){
            console.log("TOKEN EXPIRED");
            props.handleLogout();
            const origin = location.state?.from?.pathname || '/home';
            navigate(origin);
        }
    }

    const get = useQuery('todos', getTodos, {
        onError: (error) => {
            expiredToken(error);
        }
    });

    const del = useMutation(deleteTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
        onError: (error) => {
            expiredToken(error);
        }
    });

    const mutation = useMutation(addTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
        onError: (error) => {
            expiredToken(error);
        }
    })

    const updateMutation = useMutation(updateTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
        onError: (error) => {
            expiredToken(error);
        }
    })

    const markTodoComplete = useMutation(completeTodo, {
        onSuccess: () => {
            queryClient.invalidateQueries('todos')
        },
        onError: (error) => {
            expiredToken(error);
        }
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