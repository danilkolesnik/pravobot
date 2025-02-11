'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader } from '@component/ui/loader';
import Header from '@component/components/Header';
import Footer from '@component/components/Footer';
import logo from '@component/assets/images/logo.png';
import SearchIcon from '@component/assets/icons/searchIcon';

const Home = () => {
    
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('');
    const isTypePicked = selectedType !== '';

    const [documentData, setDocumentData] = useState(null);

    const getDocuments = async () => {
        try {
            const res = await fetch(`/api/documents`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const { docs } = await res.json();
            setDocumentData(docs);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPages = async () => {
        try {
            const res = await fetch(`/api/pages`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const { docs } = await res.json();
            localStorage.setItem('page_data', JSON.stringify(docs));
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getDocuments();
        getPages();
    },[]);
    
    const handleChange = (event) => {
        const selectedIndex = event.target.value; 
        console.log('Selected index:', selectedIndex);
        setSelectedType(selectedIndex);
    };

    const handleContinue = () => {
        if (isTypePicked) router.push(`/create-document?document=${documentData[selectedType].Url}`);
    };

    return (
        <div className='min-h-screen flex flex-col items-center'>
            
            {isLoading ? <Loader /> : 
                (<>
                    <Header />
                    <main className='flex flex-col flex-grow items-center mt-4 md:mt-28 w-4/5 md:w-1/3'>
                        <div className='flex flex-col items-center'>
                            <Image
                                src={logo}
                                alt='Scales of Justice'
                                width={50} 
                                height={70}
                                className='hidden md:block'
                            />
                            <h1 className='text-4xl text-gray-700 font-medium mb-2 mt-5 text-left md:text-center'>
                                Автоматична Система Генерування Позовів
                            </h1>
                            <p className='text-gray-600 mb-8 mt-3 md:mt-0 text-left md:text-center'>
                            Оберіть тип позову, заповніть дані та отримайте готову заяву для подання до суду.
                            </p>
                            <div className='flex flex-col items-left w-full md:w-2/3'>
                                <div className='relative'>
                                    <select
                                        id="lawsuit-type"
                                        className='w-full text-gray-600 rounded-3xl px-4 py-3 focus:outline-none focus:ring-0'
                                        value={selectedType}
                                        onChange={handleChange}
                                    >
                                        {!isTypePicked && <option value="">Оберіть тип позову</option>}
                                        {documentData &&
                                            documentData.map((item, index) => (
                                                <option key={item.id} value={index}>
                                                    {item.ScenarioTitle}
                                                </option>
                                            ))}
                                        
                                    </select>
                                    <span className='absolute top-4 right-4'>
                                        <SearchIcon />
                                    </span>
                                </div>
                                <button onClick={handleContinue} className={`${!isTypePicked && 'opacity-20 cursor-default'} mt-3 bg-mainBlue h-12 rounded-3xl`}>Далi</button>
                            </div>
                        </div>
                    </main>
                    <Footer/>
                </>)
            }
            
            
        </div>
    );
}

export default Home;