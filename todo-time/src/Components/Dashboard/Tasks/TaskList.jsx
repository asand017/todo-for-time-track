import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import { DateTime } from 'luxon';
import Task from './Task';
import { useAuth } from '../../../custom_hooks/useAuth';

export default function TaskList(props){
    const { token } = useAuth();
    const { isSuccess, isLoading, isError, data, error } = props.query;
    const [ todosByDate, setTodosByDate ] = useState({});
    const [ taskView, setTaskView ] = useState([])

    useEffect(() => {
        if(data) {
            console.log("DATA IS READY", data);
            let dates = {}
            data.data.forEach(t => {
                let date = DateTime.fromISO(t.day).toLocaleString(DateTime.DATE_SHORT);
                console.log(t, date);
                if(!(date in dates)){
                    dates[date] = [];
                }
                dates[date].push(t);
            })
            console.log("tasks sorted by dates:", dates);
            setTodosByDate(dates);
        }
    }, [isSuccess, data]);

    useEffect(() => {
        if (Object.keys(todosByDate).length > 0){
            console.log(todosByDate);
            let view = [];
            for (const date in todosByDate){

                console.log(date, todosByDate[date]);
                view.push(<h2 key={date}>{date}</h2>);

                todosByDate[date].forEach(todo => {
                    view.push(<Task key={todo.id} 
                        no={todo.id}
                        name={todo.name} 
                        description={todo.description} 
                        priority={todo.priority} 
                        start={todo.start_time}
                        end={todo.end_time}
                        day={todo.day}
                    />)
                })

            }
            setTaskView(view);
        }
    }, [todosByDate]);

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        console.log(error);
        return <span>Error: {error.message}</span>
    }

    return (
        <Stack spacing={3}>
            {taskView}
        </Stack>
    )
}