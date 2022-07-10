import * as React from 'react';
import { useState } from 'react';
import { useFormik } from 'formik';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from 'luxon';
import { isBefore, subDays, parseISO } from 'date-fns';
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
        console.log("resetting date/time fields");
        if (props.intent === "add"){
            formik.resetForm();
            setStartTime(0);
            setEndTime(0);
            setDateValue(null);
        }

        if (props.intent === "update"){
            setStartTime(formik.values.startTime);
            setEndTime(formik.values.endTime);
            setDateValue(formik.values.day);
        }

        onClose();
    }


    return (
        <DialogComponent onClose={handleClose} open={open}>
            <DialogTitle>
                {task.title}
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch', maxWidth: '100%'},
                        display: 'flex',
                        flexDirection: 'column',
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
                            <FormControlLabel value="1" control={<Radio sx={{color: 'green', '&.Mui-checked': { color: 'green' }}}/>} label="1" />
                            <FormControlLabel value="2" control={<Radio sx={{color:'yellow', '&.Mui-checked': { color: 'yellow' }}}/>} label="2" />
                            <FormControlLabel value="3" control={<Radio sx={{color: 'red', '&.Mui-checked': { color: 'red' }}}/>} label="3" />
                        </RadioGroup>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date"
                            value={dateValue}
                            shouldDisableDate={(day) => { 
                                if(props.intent === "add")
                                    return isBefore(day, subDays(Date.now(), 1)); 

                                if(props.intent === "update")
                                    return isBefore(day, parseISO(dateValue));
                            }}
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
                            shouldDisableTime={(time, clock) => { 
                                //console.log(time, clock.slice(0,clock.length-1), DateTime.now());
                                let t = (!startTime) ? DateTime.now() : startTime;
                                if (time < t.c[clock.slice(0,clock.length-1)]) {
                                    return true;
                                }
                            }}
                            onChange={(value) => {
                                setStartTime(value);
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            shouldDisableTime={(time, clock) => { 
                                //console.log(time, clock.slice(0,clock.length-1), startTime);
                                if (time < startTime.c[clock.slice(0,clock.length-1)]) {
                                    return true;
                                }
                            }}
                            onChange={(value) => {
                                setEndTime(value);
                            }}
                            renderInput={(params) => <TextField {...params}/>}
                        />
                    </LocalizationProvider>
            
                    <Stack direction='row' spacing={2} sx={{justifyContent: 'end'}}>
                        <Button color="primary" variant="outlined" type="submit">{props.action_button_text}</Button>
                        <Button color="primary" variant="outlined" onClick={handleClose}>{props.close_button_text}</Button>
                    </Stack>
                 
                </Box>
            </DialogContent>
        </DialogComponent>
    )
}