import axios from '../lib/axios';
import { useAuth } from './auth';

export const useCompany = () => {

    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    })
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const companiesByUser = async () => {
        await csrf();
        const response = await axios.get('api/companysByUser'); 

        if(response.data.error==1) logout();
        
        return response.data;
    }

    return {
        companiesByUser,
    };
};
