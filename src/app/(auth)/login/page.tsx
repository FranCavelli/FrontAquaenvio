import LoginForm from '../../components/loginForm'
import Image from 'next/image'
import Logo from '../../media/logoNegative.png';

export default function Login() {
    return (
        <div className='min-w-full min-h-screen bg-slate-100 flex flex-col items-center justify-center'>
            <div className='bg-white w-full xl:w-2/3 xl:h-5/6 h-full flex flex-col items-center justify-center rounded-md shadow-sm'>
                <Image src={Logo} alt='logo' className='w-64 -mt-12 mb-8'/>
                <h1 className='text-5xl font-bold mb-6'>INICIAR SESIÓN</h1>
                <LoginForm />
            </div>
        </div>
    );
}
