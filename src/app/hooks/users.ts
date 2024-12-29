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

    return {
        getUsers,
    };
};
