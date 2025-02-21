'use client'
import { useAuth } from '../hooks/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function LogoutButton() {

    const { logout } = useAuth({
        middleware: 'auth',
        redirectIfAuthenticated: '/login',
    })

    const logoutEvent = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()

        logout()
    }

    return (
            <button onClick={logoutEvent}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Log out</button>
    );
}
