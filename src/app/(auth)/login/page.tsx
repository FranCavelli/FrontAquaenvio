import LoginForm from '../../components/loginForm'

export default function Login() {
    return (
        <div className='min-w-full min-h-screen bg-red-500 flex flex-col items-center justify-center'>
            <h1 className='text-6xl font-bold'>LOGIN</h1>
            <LoginForm />
        </div>
    );
}
