import * as React from 'react';
import { useEffect } from 'react';

export default function Task(props) {

    useEffect(() => {
        console.log(props);
    }, []);

    return (
        <div></div>
    );
}