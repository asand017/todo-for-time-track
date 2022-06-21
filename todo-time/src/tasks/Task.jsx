import * as React from 'react';
import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';
import './Task.css';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';
import DialogComponent from './Dialog';
import DialogForm from './DialogForm';

function InfoDialog(props) {
    const { onClose, open } = props;
    const [priorityColor, setPriorityColor] = useState('');
    const [openDelete, setOpenDelete] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleClose = () => {
        onClose();
    }

    const handleDeleteClose = () => {
        handleClose();
        setOpenDelete(false);
    }

    const handleEditClose = () => {
        handleClose();
        setEdit(false);
    }

    const handleDelete = () => {
        setOpenDelete(true);
    }
    
    const handleEdit = () => {
        setEdit(true);
    }

    const sendUpdate = (values) => {
        console.log("send update to db", values);
    }

    const sendDelete = () => {
        console.log("send delete to db");
    }

    useEffect(() => {
        console.log("task info from dialog", props.task)
    }, []);

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>
                    <div>{props.task.name} <span className='priority'>Priority: {props.task.priority}</span></div>
                    <div>{props.task.start} - {props.task.end}</div>
                </DialogTitle>
                <DialogContent>
                    <h3>Description</h3>
                    <p>{props.task.description}</p>
                </DialogContent>
                <DialogActions>
                    <IconButton aria-label="expand" onClick={handleClose}>
                        <CloseIcon className='icon'/>
                    </IconButton>
                    <Button onClick={handleEdit}>Edit</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
            <DialogForm onClose={handleEditClose}
                open={edit}
                task={props.task}
                submitCallback={sendUpdate}
                action_button_text="Update"
                close_button_text="Cancel"
                />
            <DialogComponent onClose={handleDeleteClose} 
                open={openDelete} 
                title="Delete Task"
                content="Are you sure you want to delete?"
                action_button_text="Yes"
                close_button_text="No"
                handleAction={sendDelete}
                />
        </>
    )
}

export default function Task(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    // update task productivity flag
    const handleSetProductivity = () => {
        
    }

    useEffect(() => {
        console.log("props:", props);
    }, []);

    return (
        <>
            <Card>
                <div className='card-face_container'>
                    <div className='task-info'>
                        <div className='task-id'>
                            <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <FormControlLabel control={
                                    <Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 30} }} onClick={handleSetProductivity}/>
                                } sx={{ '& .MuiFormControlLabel-label': {fontSize: 18, fontWeight: 600}}}/>
                            </FormGroup>  
                        </div>
                        <div className='task-title'><p>{props.name}</p></div> 
                        <div className='task-time-frame'><p>{props.start} <span>-</span> {props.end}</p></div>
                    </div>
                    <div className='expand-icon'>
                        <IconButton aria-label="expand" onClick={handleClickOpen}>
                            <DensityMediumIcon className='icon'/>
                        </IconButton>
                    </div>
                </div>
            </Card>
            <InfoDialog open={open} onClose={handleClose} task={props}/>
        </>
    );
}


/*function DeleteDialog(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose()
    }

    const deleteTask = () => {
        // trigger db delete
        onClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                Are you sure you want to delete?
            </DialogTitle>
            <DialogActions>
                <Button onClick={deleteTask}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
            </DialogActions>
        </Dialog>
    )
}*/


// <DeleteDialog onClose={handleDeleteClose} open={openDelete}></DeleteDialog>
// <Badge badgeContent={props.priority} color="primary"></Badge>