import * as React from 'react';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export default function DialogForm(props) {
    const { onClose, open, task } = props;
    const [startTime, setStartTime] = useState(DateTime.fromFormat(task.start, 'TT'));
    const [endTime, setEndTime] = useState(DateTime.fromFormat(task.end, 'TT'));
    const [dateValue, setDateValue] = useState(task.day);

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
            id: task.no,
            name: task.name, 
            description: task.description,
            priority: task.priority,
            startTime: startTime,
            endTime: endTime,
            day: dateValue
        },
        validate: validate,
        onSubmit: (values) => {
            console.log("UPDATEING TODO");
            props.submitCallback({
                id: values.id,
                name: values.name,
                description: values.description,
                priority: values.priority,
                start_time: startTime.toLocaleString(DateTime.TIME_24_SIMPLE),
                end_time: endTime.toLocaleString(DateTime.TIME_24_SIMPLE),
                day: dateValue
            });
            handleClose();
        }
    })

    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        //console.log(task);
        //console.log(startTime, endTime, dateValue);
    }, [])

    useEffect(() => {
        //console.log("new date set", dateValue);
    }, [dateValue])

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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date"
                                value={dateValue}
                                onChange={(newValue) => {
                                    setDateValue(newValue);
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
                                <Button color="primary" variant="outlined" type="submit">{props.action_button_text}</Button>
                                <Button color="primary" variant="outlined" onClick={handleClose}>{props.close_button_text}</Button>
                            </Stack>
                        </div>
                    </Box>
                </DialogContent>
                
            </Dialog>
        </>
    )
}