interface ErrorResponse {
    [key: string]: string[];
}

interface RegisterLoginProps {
    setErrors: (errors: ErrorResponse) => void;
    setStatus?: (status: string | null) => void;
    [key: string]: any;
}

import axios from '../lib/axios';
import { useAuth } from './auth';

export const useUsers = () => {

    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    })
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getUsers = async () => {
        await csrf();
        const response = await axios.get('api/getUsers'); 

        if(response.data.error==1) logout();
        
        return response.data;
    }
    const newUsers = async ({ setErrors, setStatus, ...props }: RegisterLoginProps) => {
        await csrf();
    
        setErrors({});
        if (setStatus) setStatus(null);
    
        try {
            const response = await axios.post('/users', props);
    
            console.log(response.data);
            if(response.data.error==1) logout();

        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error: ', error);
                throw error;
            }
        }
    };

    return {
        getUsers,
        newUsers
    };
};
