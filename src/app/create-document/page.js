'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@component/ui/loader";
import Header from "@component/components/Header";
import Footer from "@component/components/Footer";
import PersonalDataForm from "@component/forms/PersonalDataForm";
import DetailsForm from "@component/forms/DetailsForm";
import PaymentForm from "@component/forms/PaymentForm";

const CreateDocument = () => {

  const router = useRouter();

  const [progressIndex, setProgressIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [documentData, setDocumentData] = useState(null);
  const [updatedSample, setUpdatedSample] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  useEffect(() => { console.log(selectedAnswers) },[selectedAnswers]);
  useEffect(() => { localStorage.setItem('updatedSample', JSON.stringify(updatedSample)) },[updatedSample]);

  const getDocuments = async (name) => {
    try {
      const res = await fetch(`/api/documents`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const { docs } = await res.json();
      const matchingDocument = docs.find(document => document.Url === name);

      if (matchingDocument) {
        // console.log('OUR DOC:', matchingDocument);
        setDocumentData(matchingDocument);
      } else {
        console.log("No matching document found for URL:", url);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleSetIndex = (index) => {
    setProgressIndex(index);
  };

  const getProgressName = (index) => {
    const names = [
        "Тип позову", 
        "Персональнi данi",
        "Деталi справи",
        "Онлайн-оплата",
        "Готовий позов"
    ];
    return names[index-1] || "Невiдомий етап"; 
  };

  const ProgressBar = ({ progressIndex }) => {
    // Количество этапов
    const totalSteps = 4;
  
    return (
      <div className="flex gap-2">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-xl ${
              index < progressIndex ? 'bg-mainBlue' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    );
  };
  
  useEffect(() => {
    const queryString = window.location.search;
    const documentName = queryString.split('=')[1];
    getDocuments(documentName);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Suspense fallback={<Loader />}>
        {isLoading ? (
          <Loader /> 
        ) : documentData ? (
          <>
            <Header title={'ПОЗОВ НА РОЗЛУЧЕННЯ'} />
            <div className='w-4/5 bg-white'>
              <div id='progress_bar' className={`h-1 self-start bg-mainBlue rounded-xl`} style={{ width: `${(progressIndex / 4) * 100}%` }}></div>
            </div>
            {/* <ProgressBar /> */}
            <div className="flex flex-col min-h-screen w-4/5 mt-8 mb-8 mx-auto">
              {/* <nav className="h-12 hidden md:flex flex-row gap-3">
                <button onClick={() => router.push('/')} className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 0 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>1 {getProgressName(1)}</span>
                  {progressIndex >= 1 && <span>✓</span>}
                </button>
                <button onClick={() => setProgressIndex(1)} className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 1 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>2 {getProgressName(2)}</span>
                  {progressIndex >= 2 && <span>✓</span>}
                </button>
                <button onClick={() => setProgressIndex(2)} className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 2 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>3 {getProgressName(3)}</span>
                  {progressIndex >= 3 && <span>✓</span>}
                </button>
                <button className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 3 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>4 {getProgressName(4)}</span>
                  {progressIndex >= 4 && <span>✓</span>}
                </button>
                <button className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 4 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>5 {getProgressName(5)}</span>
                </button>
              </nav> */}

              {/* <button className='block md:hidden p-2 text-left text-mainBlue border border-mainBlue'>{progressIndex+1} {getProgressName(progressIndex+1)}</button> */}
              <main className="flex-1">
                {progressIndex === 1 && 
                  <PersonalDataForm 
                    progressIndex={progressIndex} 
                    handleSetIndex={handleSetIndex} 
                    selectedAnswers={selectedAnswers} 
                    setSelectedAnswers={setSelectedAnswers} 
                    documentData={documentData} 
                    setUpdatedSample={setUpdatedSample} 
                  />}
                {progressIndex === 2 && 
                  <DetailsForm 
                    progressIndex={progressIndex} 
                    handleSetIndex={handleSetIndex}
                    selectedAnswers={selectedAnswers} 
                    setSelectedAnswers={setSelectedAnswers} 
                    documentData={documentData} 
                    updatedSample={updatedSample} 
                    setUpdatedSample={setUpdatedSample} 
                  />}
                {progressIndex === 3 && <PaymentForm documentData={documentData} progressIndex={progressIndex} handleSetIndex={handleSetIndex} />}
              </main>
            </div>
            <Footer />
          </>
        ) : (
          <div>Ми не змогли знайти такого позову!</div>
        )}
      </Suspense>
    </div>
  );
};

export default CreateDocument;
