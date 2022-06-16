import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import './Task.css';

function InfoDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose()
    }

    useEffect(() => {
        console.log("task info from dialog", props.task)
    }, []);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>{props.task.name}</DialogTitle>
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

    useEffect(() => {
        console.log("props:", props);
    }, []);

    return (
        <>
            <Card sx={{minWidth: 350}}>
                <div className='card-face_container'>
                    <div className='task-info'>
                        <h2 className='task-id'>{props.no}. </h2>
                        <h2 className='task-title'>{props.name}</h2> 
                        <h2 className='task-time-frame'>{props.start} <span>-</span> {props.end}</h2>
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

/*
 <Card sx={{minWidth: 350}}>
            <CardContent>
                
            </CardContent>
            <CardActions>
                <Button size="small">Productive?</Button>
            </CardActions>
        </Card>
*/