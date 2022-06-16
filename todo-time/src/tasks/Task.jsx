import * as React from 'react';
import { useEffect, useState } from 'react';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import './Task.css';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@mui/material';


function InfoDialog(props) {
    const { onClose, open } = props;
    const [priorityColor, setPriorityColor] = useState('');

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        console.log("task info from dialog", props.task)
    }, []);

    return (
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
                <Button>Edit</Button>
                <Button>Delete</Button>
            </DialogActions>
        </Dialog>
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

    const handleSetProductivity = () => {
        
    }

    useEffect(() => {
        console.log("props:", props);
    }, []);

    return (
        <>
            <Card sx={{minWidth: 350}}>
                <div className='card-face_container'>
                    <div className='task-info'>
                        <div className='task-id'>
                            <h2>
                                <Badge badgeContent={props.priority} color="primary">
                                    {props.no}. 
                                </Badge>
                            </h2>
                        </div>
                        <div className='task-title'><h2>{props.name}</h2></div> 
                        <div className='task-time-frame'><h2>{props.start} <span>-</span> {props.end}</h2></div>
                        <FormGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <FormControlLabel control={
                                <Checkbox sx={{ '& .MuiSvgIcon-root': {fontSize: 30} }} onClick={handleSetProductivity}/>
                            } label="Productive?" sx={{ '& .MuiFormControlLabel-label': {fontSize: 18, fontWeight: 600}}}/>
                        </FormGroup>
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