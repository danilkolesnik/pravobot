'use client';
import Image from "next/image";
import coatOfArms from "@component/assets/images/coatofarms.png";
import AttentionIcon from "@component/assets/icons/attentionIcon";

const CourtForm = ({someProp}) => {

    console.log(someProp);
    
    return (
        <div className="w-full">
            <h1 className='text-gray-800 font-medium text-3xl'>Обраний суд за місцем реєстрації (прописки) відповідача</h1>
            <section className='w-full mt-6 px-4 py-6 bg-white rounded-2xl'>
                <div className='flex flex-row items-center gap-3'>
                    <Image
                        src={coatOfArms}
                        alt='Scales of Justice'
                        width={40} 
                        height={40}
                        className='hidden md:block'
                    />
                    <h3 className='text-l font-medium text-gray-800'>
                        Коропський районний суд Чернігівської області
                    </h3>
                </div>
                <div className='mt-3 flex flex-col gap-2 text-gray-800'>
                    <p>16200, м. Короп, вул. Миру, 9</p>
                    <p>(04656) 2-15-68</p>
                    <p>inbox@kp.cn.court.gov.ua</p>
                    <p>in.cn.court.gov.ua</p>
                </div>
            </section>
            <div className="mt-6 flex flex-wrap gap-3">
                <label className="text-l font-medium text-gray-800">
                    Суд
                </label>
                <select
                    className="w-full p-3 rounded-xl text-gray-800 focus:outline-none focus:ring-0"
                    defaultValue={1}
                >
                    <option value={1}>
                        Коропський районний суд Чернігівської області
                    </option>
                </select>
            </div>
            <div className='flex flex-row gap-3 mt-6 p-3 rounded-xl bg-yellow-100'>
                <span className='scale-50 mb-5'>
                    <AttentionIcon/>
                </span>
                <p className='text-gray-800'>Увага! Не змінюйте обраний суд, оскільки ми не можемо гарантувати якість послуг при зміні суду.</p>
            </div>
        </div>
    );
};

export default CourtForm;
