import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@mui/material';

export default function DialogComponent(props) {
    const { onClose, open } = props;

    const handleClose = () => {
        onClose()
    }

    const triggerTask = () => {
        // trigger db delete
        props.handleAction(props.no);
        handleClose();
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>
                {props.title}
            </DialogTitle>
            <DialogContent>
                {props.content}
            </DialogContent>
            <DialogActions>
                <Button onClick={triggerTask}>{props.action_button_text}</Button>
                <Button onClick={handleClose}>{props.close_button_text}</Button>
            </DialogActions>
        </Dialog>
    )
}