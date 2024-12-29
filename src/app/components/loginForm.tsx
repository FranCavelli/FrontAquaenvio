'use client'
import { useState } from 'react';
import { useAuth } from '../hooks/auth';
import {Button, Input} from "@nextui-org/react";
import { EyeSlashFilledIcon } from '../utils/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../utils/EyeFilledIcon';

export default function LoginForm() {

    const { login } = useAuth({
        middleware: 'guest',
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [shouldRemember, setShouldRemember] = useState(false);
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

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
                 <Input type="email" label="Email" id='email' value={email} className='w-full no-border-input' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className='w-full'>
                <Input
                    label="Password"
                    variant="bordered"
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full no-border-input"
                    id='password'
                />
            </div>
            <Button color="success" type="submit" >
                Login
            </Button>
        </form>
    );
}