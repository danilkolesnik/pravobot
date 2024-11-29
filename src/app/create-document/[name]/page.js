'use client';
import React, { useState, useEffect } from "react";
import { Loader } from "@component/ui/loader";
import Header from "@component/components/Header";
import Footer from "@component/components/Footer";
import PersonalDataForm from "@component/forms/PersonalDataForm";
import DetailsForm from "@component/forms/DetailsForm";
import PaymentForm from "@component/forms/PaymentForm";
import DocumentPreview from "@component/forms/DocumentPreview";

const CreateDocument = ({ params }) => {
  
  const { name } = React.use(params)

  const [progressIndex, setProgressIndex] = useState(4);
  
  const [isLoading, setIsLoading] = useState(true);
  const [documentData, setDocumentData] = useState(null);
  
  const getDocuments = async () => {
    try {
      const res = await fetch(`/api/documents`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const { docs } = await res.json();
      const url = '/' + name;
      const matchingDocument = docs.find(document => document.Url === url);

      if (matchingDocument) {
        setDocumentData(matchingDocument);
      } else {
        console.log("No matching document found for URL:", url);
      };
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  useEffect(() => {
    getDocuments();
  },[]);

  const handleSetIndex = (index) => {
    setProgressIndex(index);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {isLoading ? (
        <Loader />
      ) : documentData ? (
        <>
          <Header title={'ПОЗОВ НА РОЗЛУЧЕННЯ'} />
          <div className="flex flex-col min-h-screen bg-white w-3/5 mt-8 mx-auto">
            <nav className="h-12 flex flex-row gap-3">
                <button className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 0 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>1 ТИП ПОЗОВУ</span>
                  {progressIndex >= 1 && <span>✓</span>}
                </button>
                <button className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 1 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>2 Персональні дані</span>
                  {progressIndex >= 2 && <span>✓</span>}
                </button>
                <button className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 2 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>3 Деталі справи</span>
                  {progressIndex >= 3 && <span>✓</span>}
                </button>
                <button className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 3 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>4 Онлайн-оплата</span>
                  {progressIndex >= 4 && <span>✓</span>}
                </button>
                <button className={`flex items-center justify-between w-full p-2 text-left border ${progressIndex >= 4 ? 'border-blue-500 rounded text-blue-500' : ' rounded'}`}>
                  <span>5 Готовий позов</span>
                </button>
            </nav>
            <main className="flex-1">
              {progressIndex === 1 && <PersonalDataForm progressIndex={progressIndex} handleSetIndex={handleSetIndex} />}
              {progressIndex === 2 && <DetailsForm progressIndex={progressIndex} handleSetIndex={handleSetIndex} documentData={documentData}/>}
              {progressIndex === 3 && <PaymentForm progressIndex={progressIndex} handleSetIndex={handleSetIndex} />}
              {progressIndex === 4 && <DocumentPreview documentData={documentData} />}
            </main>
          </div>
          <Footer />
        </>
      ) : (
        <div>Ми не змогли знайти такого позову!</div>
      )}
    </div>
  );
};

export default CreateDocument;
