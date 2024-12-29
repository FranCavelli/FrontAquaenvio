interface UseAuthProps {
    middleware?: string;
    redirectIfAuthenticated?: string;
}

interface User {
    id: number;
    name: string;
    last_name: string;
    cuit: string;
    email: string;
    email_verified_at?: string | null;
}

interface ErrorResponse {
    [key: string]: string[];
}

interface RegisterLoginProps {
    setErrors: (errors: ErrorResponse) => void;
    setStatus?: (status: string | null) => void;
    [key: string]: any;
}

interface ForgotPasswordProps {
    setErrors: (errors: ErrorResponse) => void;
    setStatus: (status: string | null) => void;
    email: string;
}


import useSWR from 'swr'
import axios from '../lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR<User>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                router.push('/verify-email')
            }),
    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ setErrors, ...props }: RegisterLoginProps) => {
        await csrf()

        setErrors({})

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, ...props }: RegisterLoginProps) => {
        await csrf();
    
        setErrors({});
        if (setStatus) setStatus(null);
    
        try {
            const response = await axios.post('/login', props);
    
            const { data } = response;
    
            await mutate();
            
            if(data.length==1){
                router.push('/dashboard');
            }else if(data.length==0){
                router.push('/not-configurated-account');
            }else{
                router.push('/select-company');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error en login:', error);
                throw error;
            }
        }
    };

    const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordProps) => {
        await csrf()

        setErrors({})
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }: RegisterLoginProps) => {
        await csrf()

        setErrors({})
        if (setStatus) setStatus(null);

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }: { setStatus: (status: string) => void }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status));
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate())
        }

        window.location.pathname = '/login'
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated)
        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated || '/login'); 
        if (middleware === 'auth' && error) logout()
        if (middleware === 'auth' && window.location.pathname === '/login') router.push(redirectIfAuthenticated || '/dashboard')
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
