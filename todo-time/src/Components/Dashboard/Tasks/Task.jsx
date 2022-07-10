import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import { DateTime } from 'luxon';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import DialogComponent from '../../Dialog/Dialog';
import TaskFormDialog from '../../Dialog/TaskFormDialog';
import './Task.css';
import { useContext } from 'react';
import { DeleteContext, UpdateContext, CompleteTodoContext } from '../../../Contexts.js';
import { useAuth } from '../../../custom_hooks/useAuth';

const priorityColors = {
    1: 'green priority',
    2: 'yellow priority',
    3: 'red priority'
}

export default function Task(props) {
    const [open, setOpen] = React.useState(false);
    const [startTime, setStartTime] = React.useState(DateTime.fromFormat(props.start, 'TT').toLocaleString(DateTime.TIME_SIMPLE));
    const [endTime, setEndTime] = React.useState(DateTime.fromFormat(props.end, 'TT').toLocaleString(DateTime.TIME_SIMPLE));
    const [day, setDay] = React.useState(props.day ? DateTime.fromISO(props.day).toLocaleString(DateTime.DATE_SHORT) : null);//format(parseISO(props.day), 'MM/dd/yyyy'));
    const [done, setDone] = React.useState(false);
    const delte = useContext(DeleteContext);
    const update = useContext(UpdateContext);
    const complete = useContext(CompleteTodoContext);
    const { token } = useAuth();

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
            const td = await complete.mutateAsync({
                id: props.no,
                complete: d
            });
        } catch (error){
            console.log(error);
        }
    }

    useEffect(() => {
        //console.log(done);
    }, [done]);

    useEffect(() => {
        //console.log("new props");
        setStartTime(DateTime.fromFormat(props.start, 'TT').toLocaleString(DateTime.TIME_SIMPLE));
        setEndTime(DateTime.fromFormat(props.end, 'TT').toLocaleString(DateTime.TIME_SIMPLE));
    }, [props]);

    return (
        <>
            <Card>
                <div className='card-face_container'>
                    <div className='task-info'>
                        <div className='task-complete'>
                            <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <FormControlLabel control={
                                    <Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 30} }} onClick={toggleCompletedTask}/>
                                } sx={{ '& .MuiFormControlLabel-label': {fontSize: 18, fontWeight: 600}}} value={done}/>
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
                day={day} 
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
    }

    const handleEditClose = () => {
        setEdit(false);
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
            console.log(td);
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    }

    const sendDelete = async (id) => {
        try {
            console.log("send delete to db at id="+id);
            const td = await props.del.mutateAsync(id);
        } catch (error) {
            console.log(error);
        } finally {
            handleClose();
        }
    }

    return (
        <>
            <DialogComponent onClose={handleClose} open={open}>
                <DialogTitle>
                    <div className='title'>
                        <div>{props.task.name}</div>
                        <IconButton aria-label="expand" onClick={handleClose} className="close-button">
                            <CloseIcon className='icon'/>
                        </IconButton>
                    </div>
                    <div className={priorityColors[props.task.priority]}>Priority: {props.task.priority}</div>
                    <div className='date-time'>
                        <div>{props.day}</div>
                        <div className='time-block'>{props.start} - {props.end}</div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <h3>Description</h3>
                    <p>{props.task.description}</p>
                </DialogContent>
                <DialogActions sx={{paddingLeft: '24px', paddingRight: '24px'}}>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
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