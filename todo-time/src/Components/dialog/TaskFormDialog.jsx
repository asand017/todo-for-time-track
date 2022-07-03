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
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { DialogTitle, DialogContent } from '@mui/material';
import DialogComponent from './Dialog';

export default function TaskFormDialog(props) {
    const { onClose, open, task } = props;
    const [startTime, setStartTime] = useState(task.start ? DateTime.fromFormat(task.start, 'TT') : 0);
    const [endTime, setEndTime] = useState(task.end ? DateTime.fromFormat(task.end, 'TT') : 0);
    const [dateValue, setDateValue] = useState(task.day ? task.day : null);
    const [priority, setPriority] = useState(task.priority ? task.priority : 1);

    const validate = (values, props) => {
        const errors = {};
        if (!values.name) 
            errors.name = 'Required';

        if (!values.description) 
            errors.description = 'Required';
        
        return errors;
    }

    const formik = useFormik({
        initialValues: {
            id: task.no ? task.no : null,
            name: task.name ? task.name : "", 
            description: task.description ? task.description : "",
            priority: priority,
            startTime: startTime,
            endTime: endTime,
            day: dateValue
        },
        validate: validate,
        onSubmit: (values) => {
            console.log("PROCESSING TODO");
            props.submitCallback({
                id: values.id,
                name: values.name,
                description: values.description,
                priority: priority,
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
        //console.log("new date set", dateValue);
    }, [dateValue])

    return (
        <DialogComponent onClose={handleClose} open={open}>
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
                    <FormControl id="priority" error={formik.touched.priority && Boolean(formik.errors.priority)}>
                        <FormLabel id="priority-row-radio-buttons-group-label">Priority</FormLabel>
                        <RadioGroup row name="row-radio-buttons-group"
                            value={priority}
                            onChange={(event) => {
                                setPriority(event.target.value)
                            }}>
                            <FormControlLabel value="1" control={<Radio/>} label="1" />
                            <FormControlLabel value="2" control={<Radio/>} label="2" />
                            <FormControlLabel value="3" control={<Radio/>} label="3" />
                        </RadioGroup>
                    </FormControl>
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
        </DialogComponent>
    )
}

/*
<TextField required id="priority" 
                        name="priority" 
                        label="Priority" 
                        value={formik.values.priority}
                        onChange={formik.handleChange}
                        error={formik.touched.priority && Boolean(formik.errors.priority)}/>

*/