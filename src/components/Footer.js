import Image from "next/image";
import logo from '@component/assets/images/logo.png';
import PhoneIcon from "@component/assets/icons/phoneIcon";
import MailIcon from "@component/assets/icons/mailIcon";
import LiqPayIcon from "@component/assets/icons/liqPayIcon";
import VisaIcon from "@component/assets/icons/visaIcon";
import IdCheckIcon from "@component/assets/icons/idCheckIcon";

const Footer = () => {
    return (
        <footer className="w-full flex flex-row justify-center bg-white">
            <div className='w-4/5 flex flex-col py-7'>
                <div className='flex flex-row items-center align-center justify-between'>
                    <div className='flex flex-row gap-5 text-gray-800 flex-wrap'>
                        <h3 className='font-bold'>Служба пiдтримки:</h3>
                        <span className='flex flex-row items-center gap-2'><PhoneIcon />+380677660708</span>
                        <span className='flex flex-row items-center gap-2'><MailIcon />help@pravobot.com</span>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <LiqPayIcon />
                        <VisaIcon />
                        <IdCheckIcon />
                    </div>
                </div>
                <div className='w-full flex flex-row justify-between items-center'>
                    <p className='flex items-center text-gray-800 py-3'>© {new Date().getFullYear()} Pravobot. Усі права захищено.</p>
                    <a target="_blank" href="https://onebig.pro/" className='text-mainBlue'>onebig.pro</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;