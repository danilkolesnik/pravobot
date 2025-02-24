import React, { useState, useEffect } from "react";
import { renderDocument } from "@component/services/renderDocument";
import { Loader } from '@component/ui/loader';
import downloadWordDocument from "@component/services/downloadWordDocument";
import downloadPDFDocument from "@component/services/downloadPDFDocument";
import AttentionIcon from "@component/assets/icons/attentionIcon";

const DocumentPreview = () => {
    
    const [sample] = useState(() => JSON.parse(localStorage.getItem('updatedSample')));
    
    const [isLoading, setIsLoading] = useState(false);
    const [finalSample, setFinalSample] = useState(null);
    const [documentFormat, setDocumentFormat] = useState('Word');

    const handleFormatChange = (event) => {
        setDocumentFormat(event.target.value);
    };

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
        // regenerateSample();
    },[sample]);

    return (
        <div className="flex flex-col items-center gap-8 mt-8">
            {isLoading ? (
                <Loader />
            ) : sample && (
                <>
                    <div className="w-2/4 text-left">
                        <h1 className="text-3xl font-medium text-gray-800">Дякуємо!</h1>
                        <p className="text-gray-800 mt-2">Ваш позов на розлучення готовий</p>
                        <div className='mt-6'>
                        <label className='text-gray-800 text-l font-bold'>Оберіть формат файлу</label>
                        <select
                            className="mt-3 flex text-black flex-col w-full p-3 rounded-xl "
                            value={documentFormat}
                            onChange={handleFormatChange} // Обработчик изменения
                        >
                            <option value="Word">Word (.doc)</option>
                            {/* <option value="PDF">PDF</option> */}
                        </select>
                        <div className='flex flex-row gap-3 mt-3 p-3 rounded-xl bg-green-100'>
                            <span className='scale-50 mb-5'>
                                <AttentionIcon/>
                            </span>
                            <p className='text-gray-800'>Подальші інструкції відправлені на пошту o-kovel@gmail.com та доступні за посиланням steps_rozluchennya.pdf</p>
                        </div>
                        </div>
                        <button onClick={documentFormat === 'Word' ? downloadWordDocument : downloadPDFDocument} className="mt-5 w-full text-white mt-2 p-2 bg-mainBlue rounded-2xl">Зберегти</button>
                    </div>
                    <div
                        id='document_preview'
                        className="w-full rounded-xl bg-white p-4 text-gray-900"
                        // dangerouslySetInnerHTML={{ __html: renderDocument(finalSample) }}
                        dangerouslySetInnerHTML={{ __html: renderDocument(sample) }}
                    ></div>
                </>
            )} 
        </div>
    );
};

export default DocumentPreview;
