import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTime } from 'luxon';
import './TaskAdd.css';

export default function TaskAdd(props) {
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [value, setValue] = useState(null);

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
                end_time: endTime.toLocaleString(DateTime.TIME_24_SIMPLE),
                day: value
            });
        }
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        //console.log("Start Time: ", startTime);
    }, [startTime]);

    useEffect(() => {
        //console.log("End Time: ", endTime);
    }, [endTime]);

    return (
        <div className="container">
            <Fab color="primary" size="medium" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{borderBottom: '1px solid rgba(0,0,0,0.3)', paddingBottom: '2px'}}>New Task</DialogTitle>
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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterLuxon}>
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
                        </LocalizationProvider>
                        <div style={{width: '100%', display: 'flex', justifyContent: 'center' }}>
                            <Stack direction='row' spacing={2}>
                                <Button color="primary" variant="outlined" onClick={handleClose}>Cancel</Button>
                                <Button color="primary" variant="outlined" type="submit" onClick={handleClose}>Confirm New Todo</Button>
                            </Stack>
                        </div>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}