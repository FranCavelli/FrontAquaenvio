import axios from '../lib/axios';
import { useAuth } from './auth';

export const useRoles = () => {

    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    })
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const getRoles = async () => {
        await csrf();
        const response = await axios.get('api/getRoles'); 

        if(response.data.error==1) logout();
        
        return response.data;
    }

    return {
        getRoles,
    };
};
