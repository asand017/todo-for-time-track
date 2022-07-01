import * as React from 'react';
import { Dialog } from '@mui/material';

export default function DialogComponent(props) {
    const { onClose, open } = props;

    return (
        <Dialog onClose={onClose} open={open}>
            {props.children}
        </Dialog>
    )
}