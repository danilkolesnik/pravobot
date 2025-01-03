'use client';
import MenuIcon from '@component/assets/icons/menuIcon';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@component/supabase/supabaseClient';

const Header = ({ title }) => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleReturn = () => {
        router.push('/');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleAuth = async () => {
        if (isLoginMode) {
            const { user, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Error logging in:', error.message);
            } else {
                console.log('User logged in:', user);
                setIsPopupOpen(false);
            }
        } else {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error('Error signing up:', error.message);
            } else {
                console.log('User signed up:', user);
                setIsPopupOpen(false);
            }
        }
    };

    return (
        <header className='w-full'>
            <div className='flex flex-row justify-between items-center mx-6 py-6 border-b border-[#CFC7C7]'>
                <h1 onClick={handleReturn} className='text-2xl text-blue-500 text-bold font-bold cursor-pointer select-none'>Pravobot</h1>
                {title && <h1 className='hidden md:block text-3xl text-blue-500 font-medium'>{title}</h1>}
                <button onClick={toggleSidebar}>
                    <MenuIcon className='cursor-pointer' />
                </button>
            </div>
            <div className={`fixed flex flex-col gap-5 right-0 top-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button className='text-black' onClick={() => setIsSidebarOpen(false)}>Закрыть</button>
                <button className='text-black' onClick={() => setIsPopupOpen(true)}>Войти / Зарегистрироваться</button>
            </div>

            {isPopupOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded shadow-lg'>
                        <h2 className='text-xl text-black mb-4'>{isLoginMode ? 'Вход' : 'Регистрация'}</h2>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full text-black mb-2 p-2 border rounded'
                        />
                        <input
                            type='password'
                            placeholder='Пароль'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full text-black mb-4 p-2 border rounded'
                        />
                        <button onClick={handleAuth} className='bg-mainBlue text-white px-4 py-2 rounded'>{isLoginMode ? 'Войти' : 'Зарегистрироваться'}</button>
                        <button onClick={() => setIsPopupOpen(false)} className='ml-2 text-black'>Отмена</button>
                        <button onClick={() => setIsLoginMode(!isLoginMode)} className='mt-2 text-blue-500'>
                            {isLoginMode ? 'Нет аккаунта? Зарегистрироваться' : 'Уже есть аккаунт? Войти'}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;