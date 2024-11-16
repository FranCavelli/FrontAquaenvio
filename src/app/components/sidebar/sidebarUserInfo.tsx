'use client'
import { useAuth } from '../../hooks/auth'

export default function SidebarUserInfo() {

    const { user } = useAuth({ middleware: 'auth' })
    
    return (
            <div className="w-full min-w-full bg-blue-500 text-white flex flex-col rounded-r-lg scale-x-110 -translate-x-1 ps-2 py-1">
                {user?.cuit}<br/>
                {user?.name}<br/>
                {user?.last_name}<br/>
                {user?.email}
        </div>
    );
}
