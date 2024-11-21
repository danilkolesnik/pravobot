'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@component/components/Header';
import Footer from '@component/components/Footer';
import logo from '@component/assets/images/logo.png';

const SelectClaimType = () => {
    const router = useRouter();

    const [selectedType, setSelectedType] = useState('');
    const isTypePicked = selectedType !== '';

    const handleChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleContinue = () => {
        router.push('/create-document');
    };

    return (
        <div className='min-h-screen flex flex-col items-center bg-white'>
            <Header />
            <main className='flex flex-col flex-grow items-center mt-28 w-1/5'>
                <div className='flex flex-col items-center'>
                    <Image
                            src={logo}
                            alt='Scales of Justice'
                            width={70} 
                            height={90}
                        />
                    <h1 className='text-2xl text-gray-600 font-bold mb-2 text-center'>
                        Автоматична Система Генерування Позовів
                    </h1>
                    <p className='text-gray-600 mb-8 text-center'>
                        Оберіть тип позову, введіть дані та отримайте готовий позов до суду:
                    </p>
                    <div className='flex flex-col items-left w-full'>
                        <label htmlFor='lawsuit-type' className='mb-2 text-gray-600'>
                            Тип позову
                        </label>
                        <select
                            id='lawsuit-type'
                            className='text-gray-600 border border-gray-300 rounded px-4 py-2'
                            value={selectedType}
                            onChange={handleChange}
                        >
                            {!isTypePicked && <option>Вибрати опцiю</option>}
                            <option>РОЗЛУЧЕННЯ</option>
                        </select>
                        {isTypePicked && <button onClick={handleContinue} className='mt-6 bg-[#1890FF] h-10 rounded'>Далi</button>}
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default SelectClaimType;