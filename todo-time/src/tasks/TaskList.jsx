import React, { useState, useEffect } from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider
} from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

async function createFetchTodos() {
    const { data } = await axios.get('/');
    return data;
}

export default function TaskList(props){

    const todos = useState([]);
    const { data, error, isError, isLoading } = useQuery(['todos'], createFetchTodos)

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div>
            {data.now}
        </div>
    )
}