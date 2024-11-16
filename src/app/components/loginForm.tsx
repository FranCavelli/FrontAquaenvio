'use client'
import { useState } from 'react';
import { useAuth } from '../hooks/auth';

export default function LoginForm() {

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);

    const submitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    return (
        <form method="POST" onSubmit={submitLogin} className='flex flex-col gap-4 w-2/3 '>
            <div className='w-full'>
                <label htmlFor='email' className='text-white'>Email:</label><br />
                <input type="email" id='email' value={email} className='w-full' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='w-full'>
                <label htmlFor='password' className='text-white'>Password:</label><br />
                <input type="password" id='password' className='w-full' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className='w-full bg-green-600 py-1 rounded-md hover:bg-green-400 transition-all'>Login</button>
        </form>
    );
}