import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Task from './Task';

export default function TaskList(props){

    const { isLoading, isError, data, error } = props.query;

    useEffect(() => {
        console.log("todos:", data)
    });

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <Stack spacing={3}>
            {data.data.map(todo => (
                <Task key={todo.id} 
                    no={todo.id}
                    name={todo.name} 
                    description={todo.description} 
                    priority={todo.priority} 
                    start={todo.start_time}
                    end={todo.end_time}
                    day={todo.day}
                    del={props.del}
                    update={props.update}
                />
            ))}
        </Stack>
    )
}