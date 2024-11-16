
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function SidebarLinks(){
    
    const links = [
        { url: '/clients' , name: 'Client', icon:''},
        { url: '/users' , name: 'Users', icon:''},
        { url: '/products' , name: 'Products', icon:''},
        { url: '/repart' , name: 'Reparto', icon:''},
        { url: '/configuration_aquaenvio' , name: 'Configuration', icon:''},
        { url: '/dashboard' , name: 'Dashboard', icon:''},
    ]

    return (
        <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.url} passHref>
              <span>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> {link.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    );
}