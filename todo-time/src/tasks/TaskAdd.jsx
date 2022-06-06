import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTime } from 'luxon';

export default function TaskAdd(props) {

    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const validate = (values, props) => {
        const errors = {};
        if (!values.name) 
            errors.name = 'Required';

        if (!values.description) 
            errors.description = 'Required';

        if (!values.priority) 
            errors.priority = 'Required'; 
        
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            name: '', 
            description: '',
            priority: 0,
        },
        validate: validate,
        onSubmit: (values) => {
            console.log("submitting");
            props.mutation.mutate({
                name: values.name,
                description: values.description,
                priority: values.priority,
                start_time: startTime.toLocaleString(DateTime.TIME_24_SIMPLE),
                end_time: endTime.toLocaleString(DateTime.TIME_24_SIMPLE)
            });
        }
    })

    useEffect(() => {
        console.log("Start Time: ", startTime);
    }, [startTime]);

    useEffect(() => {
        console.log("End Time: ", endTime);
    }, [endTime]);

    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': {m: 1, width: '25ch'},
                }}
                autoComplete="off"
                onSubmit={formik.handleSubmit}
            >
                <TextField required id="name" 
                    name="name" 
                    label="Task Name" 
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}/>
                <TextField required id="description" 
                    name="description" 
                    label="Task Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}/>
                <TextField required id="priority" 
                    name="priority" 
                    label="Priority" 
                    value={formik.values.priority}
                    onChange={formik.handleChange}
                    error={formik.touched.priority && Boolean(formik.errors.priority)}/>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <Stack spacing={2}>
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            onChange={(value) => {
                                setStartTime(value);
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            onChange={(value) => {
                                setEndTime(value);
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                    </Stack>
                </LocalizationProvider>
                <Button color="primary" variant="outlined" type="submit">Add Todo</Button>
            </Box>
        </div>
    )
}

/*
<label htmlFor="start_time">Start Time</label>
<TimePicker id="start_time" name="start_time" value={startTime} onChange={ (value) => setStartTime(value)}/>
<label htmlFor="end_time">End Time</label>
<TimePicker id="end_time" name="end_time" value={endTime} onChange={ (value) => setEndTime(value)}/>
*/