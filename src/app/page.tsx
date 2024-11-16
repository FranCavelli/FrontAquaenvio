'use client'
import { useAuth } from './hooks/auth'

export default function Home() {

    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    })

    const logoutEvent = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        logout()
    }

    return (
        <div>
          <h1>HOME</h1>
        </div>
    );
}
