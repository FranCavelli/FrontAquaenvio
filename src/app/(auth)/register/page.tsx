'use client'
import { useState } from 'react';
import { useAuth } from '../../hooks/auth'

export default function Register() {

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/',
    })

    const [cuit, setCuit] = useState('')
    const [name, setName] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordconfirmation] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        register({
            cuit,
            name,
            last_name,
            email,
            password,
            password_confirmation,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <div>
            <h1>Register</h1>
            <form method="POST" onSubmit={submitLogin}>
                <div>
                    <label>CUIT:</label>
                    <input 
                        type="text" 
                        value={cuit} 
                        onChange={(e) => setCuit(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Last name:</label>
                    <input 
                        type="text" 
                        value={last_name} 
                        onChange={(e) => setLast_name(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password_confirmation} 
                        onChange={(e) => setPasswordconfirmation(e.target.value)} 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
