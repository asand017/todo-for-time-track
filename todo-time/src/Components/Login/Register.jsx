import { useState } from "react"
import { useAuth } from "../../custom_hooks/useAuth";
import { Button, Paper, TextField, Stack } from '@mui/material';
import './Register.css';

export default function Register() {
    const { onRegister } = useAuth();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="register-wrapper">
            <Paper elevation={3} sx={{padding: '1em 2em 2em 2em', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <h2 style={{textDecoration: 'underline'}}>Register</h2>
                <form style={{display: 'flex', flexDirection: 'column', margin: '0.75em 0'}} onSubmit={(e) => {
                    console.log("submitting registration");
                    onRegister(e, { 
                        first_name: firstName, 
                        last_name: lastName,
                        email: email,
                        password: password 
                    });
                }}>
                    <Stack spacing={2}>
                        <TextField id="firstName" label="First Name" type="text" onChange={(e) => setFirstName(e.target.value)}/>
                        <TextField id="lastName" label="Last Name" type="text" onChange={(e) => setLastName(e.target.value)}/>
                        <TextField id="email" label="Email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        <TextField id="password" label="Password" type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}/>
                        <label>
                            <input type="checkbox" onChange={(e) => setShowPassword(e.target.checked)}/>
                            Reveal
                        </label>
                        <Button className="action-button" variant='contained' type="submit">Submit</Button>
                    </Stack>
                </form>
            </Paper>
        </div>
    )
}