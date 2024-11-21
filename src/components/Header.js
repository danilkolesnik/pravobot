import MenuIcon from '@component/assets/icons/menuIcon';

const Header = ({ title }) => {
    return (
        <header className='w-full'>
            <div className='flex flex-row justify-between items-center mx-6 py-6 border-b border-[#CFC7C7]'>
                <h1 className='text-2xl text-blue-500'>Pravobot</h1>
                {title && <h1 className='text-3xl text-blue-500 font-bold'>{title}</h1>}
                <button>
                    <MenuIcon className='cursor-pointer' />
                </button>
            </div>
        </header>
    );
};

export default Header;