import React, { useState, useEffect } from "react";
import { renderDocument } from "@component/services/renderDocument";
import { Loader } from '@component/ui/loader';
import downloadDocument from "@component/services/downloadDocument";

const DocumentPreview = ({ sample }) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [finalSample, setFinalSample] = useState(null);

    const regenerateSample = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/openai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    sample: sample
                }),
            });
            if (!response.ok) {
                throw new Error('Failed');
            }
            const data = await response.json();

            setFinalSample(data.generatedSample);

        } catch (error) {
            console.error('Error generating blog queries:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        regenerateSample();
    },[sample]);

    return (
        <div className="flex flex-col items-center gap-8 mt-8">
            {isLoading ? (
                <Loader />
            ) : finalSample && (
                <>
                    <div className="text-center">
                        <h1 className="text-3xl text-gray-800">Дякуємо!</h1>
                        <p className="text-gray-800 mt-2">Ваш позов на розлучення готовий</p>
                        <button onClick={downloadDocument} className="text-white mt-2 p-2 bg-mainBlue rounded">Завантажити документ</button>
                    </div>
                    <div
                        id='document_preview'
                        className="w-full border border-black p-4 text-gray-900"
                        // dangerouslySetInnerHTML={{ __html: renderDocument(finalSample) }}
                        dangerouslySetInnerHTML={{ __html: renderDocument(sample) }}
                    ></div>
                </>
            )} 
        </div>
    );
};

export default DocumentPreview;
