'use client';
import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@component/ui/loader";
import ProgressBar from "@component/ui/ProgressBar";
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
            {/* Progress bar */}
            <div className='sticky w-4/5' style={{ top: '5rem' }}>
              <ProgressBar progressIndex={progressIndex} />
              {/* <div id='progress_bar' className={`h-1 self-start bg-mainBlue rounded-xl`} style={{ width: `${(progressIndex / 4) * 100}%` }}></div> */}
            </div>
            {/* Forms */}
            <div className="flex flex-col min-h-screen w-4/5 mt-8 mb-8 mx-auto">
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
                {progressIndex === 3 && 
                  <PaymentForm 
                    documentData={documentData} 
                    progressIndex={progressIndex} 
                    handleSetIndex={handleSetIndex} 
                  />}
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
