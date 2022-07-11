import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import { DateTime } from 'luxon';
import { isBefore, isAfter, isEqual, subDays, parseISO } from 'date-fns';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import DialogComponent from '../../dialog/Dialog';
import TaskFormDialog from '../../dialog/TaskFormDialog';
import './Task.css';
import { useContext } from 'react';
import { DeleteContext, UpdateContext, CompleteTodoContext } from '../../../Contexts.js';

const priorityColors = {
    1: '#358f1e',
    2: '#bdbd28',
    3: '#86242A'
}

const SECONDS_MS = 1000;
const MINUTE_MS = 60000;

export default function Task(props) {
    const [open, setOpen] = useState(false);
    const [startTime, setStartTime] = useState(DateTime.fromFormat(props.start, 'TT').toLocaleString(DateTime.TIME_SIMPLE));
    const [endTime, setEndTime] = useState(DateTime.fromFormat(props.end, 'TT').toLocaleString(DateTime.TIME_SIMPLE));
    const [done, setDone] = useState(props.complete);
    const delte = useContext(DeleteContext);
    const update = useContext(UpdateContext);
    const complete = useContext(CompleteTodoContext);
    const [errorStatus, setErrorStatus] = useState(isBefore(parseISO(props.day), subDays(Date.now(), 1)) ? true : false)

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const toggleCompletedTask = async () => {
        let d = !done;
        setDone(d);
        try {
            await complete.mutateAsync({
                id: props.no,
                complete: d
            });
        } catch (error){
            console.log(error);
        }
    }

    // every minute, check if 
    useEffect(() => {
        //console.log(DateTime.fromISO(props.end), DateTime.now())
        if(props.isToday){
            let hit = false;
            const interval = setInterval(() => {
                //console.log("checking if task time has expired");
                if (DateTime.fromISO(props.end) < DateTime.now()) {
                    
                    setErrorStatus(true);
                    hit = true;
                }
            }, SECONDS_MS);
        
            if(hit){
                return () => clearInterval(interval);
            }
        }

    }, [])

    useEffect(() => {
        //console.log("received new props");
        setStartTime(DateTime.fromFormat(props.start, 'TT').toLocaleString(DateTime.TIME_SIMPLE));
        setEndTime(DateTime.fromFormat(props.end, 'TT').toLocaleString(DateTime.TIME_SIMPLE));
        setErrorStatus(isBefore(parseISO(props.day), subDays(Date.now(), 1)) ? true : false);
        // also need to check if Endtime has elapsed if on the same day
    }, [props]);

    return (
        <>
            <Card sx={{backgroundColor: done ? 'rgba(0,215,0,0.5)' : errorStatus ? 'rgba(215,0,0, 0.5)' : 'none'}}>
                <div className='card-face_container'>
                    <div className='task-info'>
                        <div className='task-complete'>
                            <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <FormControlLabel control={
                                    <Checkbox checked={done} sx={{ '& .MuiSvgIcon-root': {fontSize: 30} }} onClick={toggleCompletedTask}/>
                                } sx={{ '& .MuiFormControlLabel-label': {fontSize: 18, fontWeight: 600}}}/>
                            </FormGroup>  
                        </div>
                        <div className='task-title'><p>{props.name}</p></div> 
                        <div className='task-time-frame'><p>{startTime} <span>-</span> {endTime}</p></div>
                    </div>
                    <div className='expand-icon'>
                        <IconButton aria-label="expand" onClick={handleClickOpen}>
                            <DensityMediumIcon className='icon'/>
                        </IconButton>
                    </div>
                </div>
            </Card>
            <InfoDialog open={open} onClose={handleClose} 
                task={props} 
                start={startTime} 
                end={endTime} 
                day={props.day ? DateTime.fromISO(props.day).toLocaleString(DateTime.DATE_SHORT) : null}
                dayStatus={errorStatus}
                del={delte} 
                update={update}/>
        </>
    );
}


function InfoDialog(props) {
    const { onClose, open } = props;
    const [openDelete, setOpenDelete] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClose = () => {
        onClose();
    }

    const handleDeleteClose = () => {
        setOpenDelete(false);
        handleClose();
    }

    const handleEditClose = () => {
        setEdit(false);
        handleClose();
    }

    const handleDelete = () => {
        setOpenDelete(true);
    }
    
    const handleEdit = () => {
        setEdit(true);
    }

    const sendUpdate = async (values) => {
        try {
            console.log("send update to db at id="+values.id, values);
            const td = await props.update.mutateAsync(values);
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    }

    const sendDelete = async (id) => {
        try {
            console.log("send delete to db at id="+id);
            await props.del.mutateAsync(id);
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    }

    return (
        <>
            <DialogComponent onClose={handleClose} open={open} color={priorityColors[props.task.priority]}>
                <DialogTitle>
                    <div className='title'>
                        <div style={{fontWeight: 'bold', fontSize: '1.75rem'}}>{props.task.name}</div>
                        <IconButton aria-label="expand" onClick={handleClose} className="close-button">
                            <CloseIcon className='icon'/>
                        </IconButton>
                    </div>
                    <div className="priority" style={{color: priorityColors[props.task.priority]}}>Priority: {props.task.priority}</div>
                    <div className='date-time'>
                        <div style={{color: props.dayStatus ? 'red' : 'none'}}>{props.day}</div>
                        <div className='time-block'>{props.start} - {props.end}</div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <h3>Description</h3>
                    <p>{props.task.description}</p>
                </DialogContent>
                <DialogActions sx={{display: 'flex', justifyContent: 'center', padding: '1em'}}>
                    <Button className="action-button" variant='contained' onClick={handleEdit}>Edit</Button>
                    <Button className="action-button" variant='contained' onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </DialogComponent>
            <TaskFormDialog onClose={handleEditClose}
                open={edit}
                task={props.task}
                intent="update"
                submitCallback={sendUpdate}
                action_button_text="Update"
                close_button_text="Cancel"
                />
            <DialogComponent onClose={handleDeleteClose} open={openDelete}>
                <DialogTitle>
                    Delete Task
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to delete?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => sendDelete(props.task.no)}>Yes</Button>
                    <Button onClick={handleDeleteClose}>No</Button>
                </DialogActions>    
            </DialogComponent>
        </>
    )
}