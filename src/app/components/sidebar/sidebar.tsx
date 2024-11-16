import LogoutButton from '../logout';
import SidebarLinks from './sidebarLinks'
import SidebarUserInfo from './sidebarUserInfo';
import Image from 'next/image'
import Logo from '../../media/logoNegative.png';

export default function Sidebar() {
    return (
        <div className="h-full min-h-screen w-80 bg-white flex flex-col ps-2">
            <Image src={Logo} alt='logo'/>
            <SidebarUserInfo/>
            <SidebarLinks/>
            <LogoutButton/>
        </div>
    );
}
