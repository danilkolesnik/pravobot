'use client';
import React, { useState, useEffect } from 'react'
import Header from '@component/components/Header';
import { renderDocument } from '@component/services/renderDocument';

const page = () => {

    const [pageData, setPageData] = useState(null);
    const getDocuments = async () => {
        try {
            const res = await fetch(`/api/pages`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const { docs } = await res.json();
            console.log(docs);
            setPageData(docs);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            // setIsLoading(false);
        }
    };

    useEffect(() => {
        getDocuments();
    },[]);
    return (
        <div className="min-h-screen flex flex-col items-center bg-white">
            <Header title={'ПОЗОВ НА РОЗЛУЧЕННЯ'} />
            {pageData ? (
                <div className='mt-6 text-black flex justify-center'>
                    <p className='w-1/2' dangerouslySetInnerHTML={{__html: renderDocument(pageData[0].PageContent)}}>
                    </p>       
                </div>
            ) : 'Loading...'}
            
        </div>
    )
}

export default page;