'use client';
import { useState } from "react";

const PersonalDataForm = ({ 
    progressIndex, 
    handleSetIndex, 
    selectedAnswers, 
    setSelectedAnswers, 
    documentData, 
    setUpdatedSample 
  }) => {
    
    const [person, setPerson] = useState('COMPLAINANT');
    const [isAddressMatch, setIsAddressMatch] = useState(false);
    
    const handleDataChange = (shortcode, FinalField) => {
      setSelectedAnswers((prevAnswers) => ({
          ...prevAnswers,
          [shortcode]: FinalField,
      }));
    };

    const handleNextStep = () => {
      if (person === 'COMPLAINANT') {
        setPerson('DEFENDANT');
      } else {
        let updatedSample = documentData.Sample;
        Object.keys(selectedAnswers).forEach((shortcode) => {
            updatedSample = updatedSample.replace(shortcode, selectedAnswers[shortcode]);
        });
        setUpdatedSample(updatedSample);
        handleSetIndex(progressIndex + 1);
      }
    };

    return (
          <div className='flex flex-col md:flex-row gap-8 mt-8'>
            <nav className='w-full md:w-3/5 flex flex-col gap-2 items-left'>
                <button onClick={() => setPerson('COMPLAINANT')} className={`p-2 text-left ${person === 'COMPLAINANT' ? 'bg-mainBlue' : 'text-gray-500 border border-gray-400'}`}>2.1 ДАННI ПОЗИВАЧА</button>
                <button onClick={() => setPerson('DEFENDANT')} className={`p-2 text-left ${person === 'DEFENDANT' ? 'bg-mainBlue' : 'text-gray-500 border border-gray-400'}`}>2.2 ДАННI ВIДПОВIДАЧА</button>
            </nav>

            <form className="w-full">
              {/* ПIБ */}
              <div className="flex flex-col gap-3">
                <label className='text-l text-black'><span style={{color: 'red'}}>* </span>ПIБ {person === 'COMPLAINANT' ? 'Позивача' : 'Вiдповiдача'}</label>
                <input
                  value={selectedAnswers[`[${person}_NAME]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_NAME]`, e.target.value)}
                  type="text"
                  placeholder="Ім'я"
                  className="text-gray-900 border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_LASTNAME]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_LASTNAME]`, e.target.value)}
                  type="text"
                  placeholder="Прізвище"
                  className="text-gray-900 border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_SURNAME]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_SURNAME]`, e.target.value)}
                  type="text"
                  placeholder="По батькові"
                  className="text-gray-900 border p-2 rounded"
                />
              </div>
              {/* Дата */}
              <div className="mt-6 flex flex-col gap-3">
                <label className='text-l text-black'><span style={{color: 'red'}}>* </span>Дата народження {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}</label>
                <div className="grid md:grid-cols-3 gap-4">
                    <input
                      value={selectedAnswers[`[${person}_BIRTH_YEAR]`] || ''}
                      onChange={(e) => handleDataChange(`[${person}_BIRTH_YEAR]`, e.target.value)}
                      type="text"
                      placeholder="Рік"
                      className="text-gray-900 border p-2 rounded"
                    />
                    <input
                      value={selectedAnswers[`[${person}_BIRTH_MONTH]`] || ''}
                      onChange={(e) => handleDataChange(`[${person}_BIRTH_MONTH]`, e.target.value)}
                      type="text"
                      placeholder="Місяць"
                      className="text-gray-900 border p-2 rounded"
                    />
                    <input
                      value={selectedAnswers[`[${person}_BIRTH_DAY]`] || ''}
                      onChange={(e) => handleDataChange(`[${person}_BIRTH_DAY]`, e.target.value)}
                      type="text"
                      placeholder="День"
                      className="text-gray-900 border p-2 rounded"
                    />
                </div>
              </div>
              {/* Паспортнi данi */}
              <div className="mt-6 flex flex-col gap-3">
                <label className='text-l text-black'><span style={{color: 'red'}}>* </span>Паспортнi данi {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}</label>
                <input
                  value={selectedAnswers[`[${person}_PASSPORT_SERIES]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_PASSPORT_SERIES]`, e.target.value)}
                  type="text"
                  placeholder="СЕРІЯ"
                  className="text-gray-900 border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_PASSPORT_NUMBER]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_PASSPORT_NUMBER]`, e.target.value)}
                  type="text"
                  placeholder="Номер Паспорту"
                  className="text-gray-900 border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_ID_NUMBER]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_ID_NUMBER]`, e.target.value)}
                  type="text"
                  placeholder="Ідентифікаційний номер"
                  className="text-gray-900 border p-2 rounded"
                />
              </div>
              {/* Адреса Прописки */}
              <div className="mt-6 flex flex-wrap gap-3">
                <label className="w-full text-l text-black">
                  <span style={{ color: 'red' }}>* </span>Адреса прописки {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}
                </label>
                <input
                  value={selectedAnswers[`[${person}_REGISTRATION_INDEX]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_REGISTRATION_INDEX]`, e.target.value)}
                  type="text"
                  placeholder="Індекс"
                  className="text-gray-900 grow-0 border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_REGISTRATION_CITY]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_REGISTRATION_CITY]`, e.target.value)}
                  type="text"
                  placeholder="Місто"
                  className="text-gray-900 grow border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_REGISTRATION_STREET]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_REGISTRATION_STREET]`, e.target.value)}
                  type="text"
                  placeholder="Вулиця"
                  className="text-gray-900 w-1/2 border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_REGISTRATION_HOUSE]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_REGISTRATION_HOUSE]`, e.target.value)}
                  type="text"
                  placeholder="Будинок"
                  className="text-gray-900 grow w-1/5 border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_REGISTRATION_FLAT]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_REGISTRATION_FLAT]`, e.target.value)}
                  type="text"
                  placeholder="Квартира"
                  className="text-gray-900 grow w-1/5 border p-2 rounded"
                />
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2" 
                    value={isAddressMatch} 
                    onChange={(e) => setIsAddressMatch(e.target.checked)} 
                  />
                  <label className='text-gray-900'>Співпадає з фактичною адресою проживання</label>
                </div>
              </div>
              {/* Адреса Проживання */}
              {!isAddressMatch && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <label className="w-full text-l text-black">
                    <span style={{ color: 'red' }}>* </span>Адреса фактичного проживання {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}
                  </label>
                  <input
                    value={selectedAnswers[`[${person}_ACTUAL_INDEX]`] || ''}
                    onChange={(e) => handleDataChange(`[${person}_ACTUAL_INDEX]`, e.target.value)}
                    type="text"
                    placeholder="Індекс"
                    className="text-gray-900 grow-0 border p-2 rounded"
                  />
                  <input
                    value={selectedAnswers[`[${person}_ACTUAL_CITY]`] || ''}
                    onChange={(e) => handleDataChange(`[${person}_ACTUAL_CITY]`, e.target.value)}
                    type="text"
                    placeholder="Місто"
                    className="text-gray-900 grow border p-2 rounded"
                  />
                  <input
                    value={selectedAnswers[`[${person}_ACTUAL_STREET]`] || ''}
                    onChange={(e) => handleDataChange(`[${person}_ACTUAL_STREET]`, e.target.value)}
                    type="text"
                    placeholder="Вулиця"
                    className="text-gray-900 w-1/2 border p-2 rounded"
                  />
                  <input
                    value={selectedAnswers[`[${person}_ACTUAL_HOUSE]`] || ''}
                    onChange={(e) => handleDataChange(`[${person}_ACTUAL_HOUSE]`, e.target.value)}
                    type="text"
                    placeholder="Будинок"
                    className="text-gray-900 grow w-1/5 border p-2 rounded"
                  />
                  <input
                    value={selectedAnswers[`[${person}_ACTUAL_FLAT]`] || ''}
                    onChange={(e) => handleDataChange(`[${person}_ACTUAL_FLAT]`, e.target.value)}
                    type="text"
                    placeholder="Квартира"
                    className="text-gray-900 grow w-1/5 border p-2 rounded"
                  />
                </div>
              )}
              {/* Контактнi данi */}
              <div className="mt-6 flex flex-wrap gap-3">
                <label className="w-full text-l text-black">
                  <span style={{ color: 'red' }}>* </span>Контактнi данi {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}
                </label>
                <input
                  value={selectedAnswers[`[${person}_PHONE_NUMBER]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_PHONE_NUMBER]`, e.target.value)}
                  type="text"
                  placeholder="Номер телефону"
                  className="text-gray-900 w-full border p-2 rounded"
                />
                <input
                  value={selectedAnswers[`[${person}_EMAIL]`] || ''}
                  onChange={(e) => handleDataChange(`[${person}_EMAIL]`, e.target.value)}
                  type="email"
                  placeholder="Електронна пошта"
                  className="text-gray-900 w-full border p-2 rounded"
                />
              </div>
              <button type="button" onClick={() => {
                  window.scrollTo(0, 0);
                  handleNextStep();
                }} className="w-full mt-6 bg-mainBlue text-white px-4 py-2 rounded">
                Далі
              </button>
            </form>
        </div>
    );
};

export default PersonalDataForm;