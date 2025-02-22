import Image from "next/image";
import logo from '@component/assets/images/logo.png';
import PhoneIcon from "@component/assets/icons/phoneIcon";
import MailIcon from "@component/assets/icons/mailIcon";
import LiqPayIcon from "@component/assets/icons/liqPayIcon";
import VisaIcon from "@component/assets/icons/visaIcon";
import IdCheckIcon from "@component/assets/icons/idCheckIcon";

const Footer = () => {

    const space = ' ';

    return (
        <footer className="w-full flex flex-row justify-center bg-white">
            <div className='w-4/5 flex flex-col py-7'>
                <div className='hidden md:flex flex-row items-center align-center justify-between'>
                    <div className='flex flex-row gap-5 text-gray-800 flex-wrap'>
                        <h3 className='font-bold'>Служба пiдтримки:</h3>
                        <span className='flex flex-row items-center gap-2'><PhoneIcon />+380677660708</span>
                        <span className='flex flex-row items-center gap-2'><MailIcon />help@pravobot.com</span>
                    </div>
                    <div className='w-full md:w-auto flex flex-row gap-2 items-center justify-center md:justify-auto'>
                        <LiqPayIcon />
                        <VisaIcon />
                        <IdCheckIcon />
                    </div>
                </div>
                {/* extra block for mobile */}
                <div className='w-full md:w-auto flex flex-row gap-2 items-center justify-center md:justify-auto md:hidden'>
                    <LiqPayIcon />
                    <VisaIcon />
                    <IdCheckIcon />
                </div>
                <div className='hidden md:block w-full flex flex-row justify-between items-center'>
                    <p className='text-gray-800 py-3'>© {new Date().getFullYear()} Pravobot. Використання цього вебсайту означає прийняття<a href='/terms' target='_blank'><span>{' '}<b>Умов використання </b></span></a>та<a href='/policy' target='_blank'><span>{' '}<b>Політики конфіденційності</b></span></a>.</p>
                    <a target="_blank" href="https://onebig.pro/" className='text-mainBlue'>onebig.pro</a>
                </div>
                <a className='block md:hidden text-mainBlue w-full text-center mt-4'>Умови користування</a>
            </div>
        </footer>
    );
};

export default Footer;