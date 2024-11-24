'use client';
import { useState } from "react";
import Header from "@component/components/Header";
import Footer from "@component/components/Footer";
import PersonalDataForm from "@component/forms/PersonalDataForm";
import DetailsForm from "@component/forms/DetailsForm";

const CreateDocument = () => {

  const [progressIndex, setProgressIndex] = useState(1);
  const handleSetIndex = (index) => {
    setProgressIndex(index);
    console.log('triggered');
  };

  return (
      <div className='min-h-screen flex flex-col items-center bg-white'>
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
            {progressIndex === 2 && <DetailsForm progressIndex={progressIndex} handleSetIndex={handleSetIndex} />}
          </main>
        </div>
        <Footer />
      </div>
    )
};

export default CreateDocument;