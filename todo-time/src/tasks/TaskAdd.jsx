import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useFormik } from 'formik';
import { DateTime } from 'luxon';
import * as Yup from 'yup';

export default function TaskAdd(props) {

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
            priority: '',
            start_time: null,
            end_time: null 
        },
        validate: validate,
        onSubmit: (values) => {
            console.log("submitting");
            props.mutation.mutate(values);
        }
    })

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
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
                    label="task name" 
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}/>
                <TextField required id="description" 
                    name="description" 
                    label="task description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}/>
                <TextField required id="priority" 
                    name="priority" 
                    label="priority" 
                    value={formik.values.priority}
                    onChange={formik.handleChange}
                    error={formik.touched.priority && Boolean(formik.errors.priority)}/>
                
                <Button color="primary" variant="outlined" type="submit">Add Todo</Button>
            </Box>
        </LocalizationProvider>
    )
}

/*
<TimePicker id="start_time" 
name="start_time"
label="start time"
value={formik.values.start_time}
onChange={formik.handleChange}/>
*/