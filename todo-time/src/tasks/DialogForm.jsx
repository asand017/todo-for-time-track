import * as React from 'react';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export default function DialogForm(props) {
    const { onClose, open, task } = props;

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
            name: task.name, 
            description: task.description,
            priority: task.priority,
            startTime: DateTime.fromSQL(task.start),
            endTime: DateTime.fromSQL(task.end)

        },
        validate: validate,
        onSubmit: (values) => {
            props.submitCallback();
        }
    })

    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        console.log(task);
        console.log(DateTime.fromSQL(task.start), DateTime.fromSQL(task.end));
    }, [])

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>
                    {task.title}
                </DialogTitle>
                <DialogContent>
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
                            <TimePicker
                                label="Start Time"
                                value={formik.startTime}
                                onChange={formik.handleChange}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                            <TimePicker
                                label="End Time"
                                value={formik.endTime}
                                onChange={formik.handleChange}
                                renderInput={(params) => <TextField {...params}/>}
                            />
                        </LocalizationProvider>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Stack direction='row' spacing={2}>
                                <Button color="primary" variant="outlined" type="submit" onClick={handleClose}>{props.action_button_text}</Button>
                                <Button color="primary" variant="outlined" onClick={handleClose}>{props.close_button_text}</Button>
                            </Stack>
                        </div>
                    </Box>
                </DialogContent>
                
            </Dialog>
        </>
    )
}