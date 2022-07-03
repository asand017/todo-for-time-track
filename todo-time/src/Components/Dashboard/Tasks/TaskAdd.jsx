import React, { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TaskFormDialog from '../../Dialog/TaskFormDialog';
import './TaskAdd.css';

export default function TaskAdd(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div className="container">
            <Fab color="primary" size="medium" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <TaskFormDialog onClose={handleClose}
                open={open}
                task={{}}
                submitCallback={props.mutation.mutate}
                action_button_text="Confirm"
                close_button_text="Cancel"
                />
        </div>
    )
}