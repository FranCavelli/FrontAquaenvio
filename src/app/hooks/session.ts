interface Data {
    key: string;
    value?: string;
    company_id?: string;
}

interface Session {
    data: Data;
}

import useSWR from 'swr'
import axios from '../lib/axios';
import { useAuth } from './auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useCompany } from './company';

export const useSession = () => {
    const router = useRouter()

    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    })

    const { companiesByUser } = useCompany()

    const { data: session, error, mutate } = useSWR<Session>('/api/getSessionAll', () =>
        axios
            .get('/api/getSessionAll')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error

                logout();
            }),
    )
    
    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const setSessionValue = async (key: string, value: string) => {
        await csrf();

        const data: Data = {
            key: key,
            value: value
        };

        const response = await axios.post('api/setSessionValue', data);

        await mutate(); 

        if(response.data.error==1) logout();
        
        return response.data;
    }

    const getSessionValue = async (key: string) => {
        await csrf();

        const data: Data = {
            key: key,
        };

        const response = await axios.post('api/getSessionValue', data); 

        if(response.data.error==1) logout();
        
        console.log(response);
        return response.data;
    }

    const deleteSessionValue = async (key: string) => {
        await csrf();

        const data: Data = {
            key: key,
        };

        const response = await axios.post('api/deleteSessionValue', data); 

        if(response.data.error==1) logout();
        
        return response.data;
    }

    useEffect(() => {
        if (session){
            companiesByUser()
                .then((data) => {
                    if(data.length==1){
                        setSessionValue('company_id', data[0].id);

                        router.push('/dashboard');
                    }
                })
                .catch((err) => {
                  console.log(err);
                });
            
        }
    }, [session, error])

    return {
        session,
        setSessionValue,
        getSessionValue,
        deleteSessionValue,
    };
};
