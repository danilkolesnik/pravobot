import Image from "next/image";
import logo from '@component/assets/images/logo.png';
import PhoneIcon from "@component/assets/icons/phoneIcon";
import MailIcon from "@component/assets/icons/mailIcon";

const Footer = () => {
    return (
        <footer className="w-full bg-slate-100">
            <div className='mx-7 flex flex-col'>
                <div className='flex flex-row items-center pb-5 pt-4 gap-3'>
                    <Image
                        src={logo}
                        alt='Scales of Justice'
                        width={30} 
                        height={30}
                    />
                    <h1 className='text-xl text-blue-500 font-medium cursor-pointer select-none'>Pravobot</h1>
                </div>
                <div className='flex flex-row items-center align-center justify-between pb-5 border-b'>
                    <div className='flex flex-row gap-5 text-gray-800 flex-wrap'>
                        <h3 className='font-bold'>Служба пiдтримки:</h3>
                        <span className='flex flex-row items-center gap-2'><PhoneIcon />+380677660708</span>
                        <span className='flex flex-row items-center gap-2'><MailIcon />help@pravobot.com</span>
                    </div>
                    {/* <div className='bg-black'>icons</div> */}
                </div>
                <p className='flex items-center text-gray-800 py-3'>© {new Date().getFullYear()} Pravobot. Усі права захищено.</p>
            </div>
        </footer>
    );
};

export default Footer;