import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Task(props) {

    useEffect(() => {
        console.log("props:", props);
    }, []);

    return (
        <Card sx={{minWidth: 350}}>
            <CardContent>
                
            </CardContent>
            <CardActions>
                <Button size="small">Productive?</Button>
            </CardActions>
        </Card>
    );
}