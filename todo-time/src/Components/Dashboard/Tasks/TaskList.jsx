import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DateTime } from 'luxon';
import Task from './Task';

export default function TaskList(props){
    const { isSuccess, isLoading, isError, data, error } = props.query;
    const [ todosByDate, setTodosByDate ] = useState({});

    useEffect(() => {
        if(data) {
            console.log("DATA IS READY", data);
            let dates = {}
            data.data.forEach(t => {
                let date = DateTime.fromISO(t.day).toLocaleString(DateTime.DATE_SHORT);
                if(!(date in dates)){
                    dates[date] = [];
                }

                dates[date].push(t);
            })

            console.log("tasks sorted by dates:", dates);
            setTodosByDate(dates);
        }
    }, [props.query, isSuccess, data]);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        console.log(error);
        return <span>Error: {error.message}</span>
    }

    return (
        <Stack spacing={3}>
            <>
                { Object.keys(todosByDate).map( (date) => {
                    return (
                        <div key={date}>
                            <h2 key={date}>{date}</h2>
                            { todosByDate[date].map( (todo) => {
                                return (   
                                <Task key={todo.id} 
                                    no={todo.id}
                                    name={todo.name} 
                                    description={todo.description} 
                                    priority={todo.priority} 
                                    start={todo.start_time}
                                    end={todo.end_time}
                                    day={todo.day}
                                />);
                            })}
                        </div>
                    );
                })}
            </>
        </Stack>
    )
}