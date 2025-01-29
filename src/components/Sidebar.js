import { useState } from "react";
import ArrowIcon from "@component/assets/icons/arrowIcon";
import HeadsetIcon from "@component/assets/icons/headsetIcon";
import LocationIcon from "@component/assets/icons/locationIcon";

const Sidebar = ({ isSidebarOpen, setIsPopupOpen }) => {
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    return (
        <div
            className={`z-40 fixed flex flex-col gap-5 right-0 top-20 w-full md:w-80 h-full bg-slate-100 shadow-lg transform transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <ul className="mx-5 mt-8 flex flex-col gap-6 text-black">
                <li
                    className="flex flex-row items-center justify-between cursor-pointer"
                    onClick={() => setIsSupportOpen(!isSupportOpen)}
                >
                    <span className="flex flex-row items-center gap-3 text-l">
                        <HeadsetIcon />
                        <p>Служба пiдтримки</p>
                    </span>
                    <div className={`transform transition-transform duration-300 ${isSupportOpen ? "rotate-180" : "rotate-0"}`}>
                        <ArrowIcon />
                    </div>
                </li>
                <div 
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${isSupportOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
                >
                    <div className="flex flex-col gap-3 pl-7">
                        <button className="text-left text-black">+380677660708</button>
                        <button className="text-left text-black">help@pravobot.com</button>
                    </div>
                </div>
                <li className="flex flex-row gap-3 items-center text-l">
                    <LocationIcon />
                    <span>Контакти</span>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
