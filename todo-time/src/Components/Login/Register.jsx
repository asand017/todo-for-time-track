import { useState } from "react"
import { useAuth } from "../../custom_hooks/useAuth";

export default function Register() {
    const { onRegister } = useAuth();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="register-wrapper">
            <h1>Register</h1>
            <form onSubmit={(e) => {
                
                console.log("submitting registration");
                onRegister(e, { 
                    first_name: firstName, 
                    last_name: lastName,
                    email: email,
                    password: password 
                });
            }}>
                <label>
                    <p>First Name</p>
                    <input type="text" onChange={(e) => setFirstName(e.target.value)}/>
                </label>
                <label>
                    <p>Last Name</p>
                    <input type="text" onChange={(e) => setLastName(e.target.value)}/>
                </label>
                <label>
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}/>
                    <label style={{marginLeft: '12px'}}>
                        <input type="checkbox" onChange={(e) => setShowPassword(e.target.checked)}/>
                        Reveal
                    </label>
                </label>
                <div style={{padding: '20px'}}>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}