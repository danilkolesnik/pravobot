'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Используем для получения `params`
import Header from '@component/components/Header';
import Footer from '@component/components/Footer';
import { renderDocument } from '@component/services/renderDocument';

const Page = () => {
    const params = useParams(); // Получаем params через хук
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Функция для получения данных страниц
    const getPages = async () => {
        try {
            const res = await fetch('/api/pages');
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const { docs } = await res.json();

            // Фильтрация страницы по URL
            const currentPage = docs.find((page) => page.URL === params.url); // Используем params.url
            if (currentPage) {
                setPageData(currentPage);
            } else {
                setPageData(null); // Если страница не найдена
            }
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        if (params?.url) {
            getPages();
        }
    }, [params?.url]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Загрузка...</p>
            </div>
        );
    }

    if (!pageData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl text-red-600">Страница не найдена</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-white">
            <Header title={pageData.PageContent || 'Страница'} />
            <div className="mt-6 text-black flex flex-grow justify-center">
                <p
                    className="w-1/2"
                    dangerouslySetInnerHTML={{ __html: renderDocument(pageData.PageContent) }}
                />
            </div>
            <Footer />
        </div>
    );
};

export default Page;
