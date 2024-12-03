import LiqPayIcon from "@component/assets/icons/liqPayIcon";
import VisaIcon from "@component/assets/icons/visaIcon";
import IdCheckIcon from "@component/assets/icons/idCheckIcon";
import NortonSecuredIcon from "@component/assets/icons/nortonSecuredIcon";
import McAfeeIcon from "@component/assets/icons/mcAfeeIcon";

const Footer = () => {
    return (
        <footer className="w-full p-6">
            <div className='border border-blue-500 p-6'>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                    <h2 className="font-bold mb-2 text-black">Юридична інформація:</h2>
                    <ul className="space-y-1">
                        <li>
                        <a href="#" className="text-blue-500">
                            Політика конфіденційності
                        </a>
                        </li>
                        <li>
                        <a href="#" className="text-blue-500">
                            Публічна оферта
                        </a>
                        </li>
                        <li>
                        <a href="#" className="text-blue-500">
                            Угода користувача
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div>
                    <h2 className="font-bold mb-2 text-black">Контактна інформація:</h2>
                    <ul className="space-y-1">
                        <li>
                        <a href="mailto:example@example.com" className="text-blue-500">
                            example@example.com
                        </a>
                        </li>
                        <li>
                        <a href="tel:+123456789" className="text-blue-500">
                            +123456789
                        </a>
                        </li>
                    </ul>
                    </div>
                    <div>
                    <h2 className="font-bold mb-2 text-black">Додаткові посилання:</h2>
                    <ul className="space-y-1">
                        <li>
                        <a href="#" className="text-blue-500">
                            info
                        </a>
                        </li>
                        <li>
                        <a href="tel:+123456789" className="text-blue-500">
                            +123456789
                        </a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className='mt-8 flex justify-between space-x-4'>
                    <div className='flex flex-row flex-wrap gap-4'>
                        <LiqPayIcon />
                        <VisaIcon />
                        <IdCheckIcon />
                        <NortonSecuredIcon />
                        <McAfeeIcon />
                    </div>
                    <a href="https://onebig.pro" className="text-blue-500">
                        onebig.pro
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;