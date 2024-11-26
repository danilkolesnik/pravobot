'use client';
import MenuIcon from '@component/assets/icons/menuIcon';
import { useRouter } from 'next/navigation';

const Header = ({ title }) => {
    const router = useRouter();

    const handleReturn = () => {
        router.push('/home');
    };

    return (
        <header className='w-full'>
            <div className='flex flex-row justify-between items-center mx-6 py-6 border-b border-[#CFC7C7]'>
                <h1 onClick={handleReturn} className='text-2xl text-blue-500 cursor-pointer select-none'>Pravobot</h1>
                {title && <h1 className='text-3xl text-blue-500 font-bold'>{title}</h1>}
                <button>
                    <MenuIcon className='cursor-pointer' />
                </button>
            </div>
        </header>
    );
};

export default Header;