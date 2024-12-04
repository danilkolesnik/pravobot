'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Loader } from '@component/ui/loader';
import Header from '@component/components/Header';
import Footer from '@component/components/Footer';
import logo from '@component/assets/images/logo.png';

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

    useEffect(() => {
        getDocuments();
    },[]);
    
    const handleChange = (event) => {
        const selectedIndex = event.target.value; 
        console.log('Selected index:', selectedIndex);
        setSelectedType(selectedIndex);
    };

    const handleContinue = () => {
        router.push(`/create-document?document=${documentData[selectedType].Url}`);
    };

    return (
        <div className='min-h-screen flex flex-col items-center bg-white'>
            
            {isLoading ? <Loader /> : 
                (<>
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
                                    id="lawsuit-type"
                                    className="text-gray-600 border border-gray-300 rounded px-4 py-2"
                                    value={selectedType}
                                    onChange={handleChange}
                                >
                                    {!isTypePicked && <option value="">Вибрати опцiю</option>}
                                    {documentData &&
                                        documentData.map((item, index) => (
                                            <option key={item.id} value={index}>
                                                {item.ScenarioTitle}
                                            </option>
                                        ))}
                                </select>

                                {isTypePicked && <button onClick={handleContinue} className='mt-6 bg-mainBlue h-10 rounded'>Далi</button>}
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