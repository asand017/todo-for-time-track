import * as React from 'react';
import { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import './Task.css';


export default function Task(props) {

    useEffect(() => {
        console.log("props:", props);
    }, []);

    return (
        <Card sx={{minWidth: 350}}>
            <div className='card-face_container'>
                <h2>{props.no}. </h2>
                <h2>{props.name}</h2> 
                <h3>{props.start} <span>-</span> {props.end}</h3>
                <div className='expand'>
                    <DensityMediumIcon />
                </div>
            </div>
        </Card>
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