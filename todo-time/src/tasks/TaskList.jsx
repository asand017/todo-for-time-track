import React, { useState, useEffect } from 'react';

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
        <div>
            {<ul>
                {data.data.map(todo => (
                    <li key={todo.id}>{todo.name}</li>
                ))}
            </ul>}
        </div>
    )
}