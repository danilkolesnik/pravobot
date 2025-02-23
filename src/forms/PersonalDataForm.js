'use client';
import CustomInput from "@component/ui/forms/CustomInput";
import DatePickerInput from "@component/ui/forms/DatePickerInput";
import { resetToMidnightUTC } from "@component/services/resetToMidnightUTC";
import { useState } from "react";
import LocationIcon from "@component/assets/icons/locationIcon";

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
    const [showCalendar, setShowCalendar] = useState(false);

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

            {/* Navigation */}
            <nav className='w-full md:w-1/5 flex flex-col gap-2 items-left md:sticky' style={{ top: '15rem' }}>
                <button onClick={() => setPerson('COMPLAINANT')} className={`p-3 text-gray-700 rounded-3xl text-sm tracking-wider font-medium text-left ${person === 'COMPLAINANT' ? 'bg-white text-gray-700' : 'bg-gray-200 text-gray-800 opacity-50'}`}>Данi позивача</button>
                <button onClick={() => setPerson('DEFENDANT')} className={`p-3 rounded-3xl text-sm tracking-wider font-medium text-left ${person === 'DEFENDANT' ? 'bg-white text-gray-700' : 'bg-gray-200 text-gray-800 opacity-50'}`}>Данi вiдповiдача</button>
            </nav>

            <form className="w-full">
              {/* ПIБ */}
              <div className='w-full md:w-3/6 md:ml-32'>
                <div className=" flex flex-col gap-3">
                  <label className='text-l font-medium text-gray-800 text-black'>ПIБ {person === 'COMPLAINANT' ? 'Позивача' : 'Вiдповiдача'}</label>
                  <CustomInput
                    value={selectedAnswers[`[${person}_NAME]`]}
                    onChange={(newValue) => handleDataChange(`[${person}_NAME]`, newValue)}
                    placeholder="Ім'я"
                  />
                  <CustomInput
                    value={selectedAnswers[`[${person}_LASTNAME]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_LASTNAME]`, newValue)}
                    placeholder="Прізвище"
                  />
                  <CustomInput
                    value={selectedAnswers[`[${person}_SURNAME]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_SURNAME]`, newValue)}
                    placeholder="По батькові"
                  />
                </div>
                {/* Дата */}
                <div className="mt-6 flex flex-col gap-3">
                  <label className='text-l font-medium text-gray-800'>Дата народження {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}</label>
                  <DatePickerInput
                    value={selectedAnswers[`[${person}_BIRTH_DATE]`] || ''}
                    onClick={() => setShowCalendar((prev) => !prev)}
                    onSelect={(date) => {
                        if (date) {
                            const normalizedDate = resetToMidnightUTC(date);
                            handleDataChange(
                                `[${person}_BIRTH_DATE]`,
                                normalizedDate.toISOString().split("T")[0],
                            );
                            setShowCalendar(false);
                        }
                    }}
                    showCalendar={showCalendar}
                />
                </div>
                {/* Паспортнi данi */}
                <div className="mt-6 flex flex-col gap-3">
                  <label className='text-l font-medium text-gray-800'>Паспортнi данi {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}</label>
                  <CustomInput
                    value={selectedAnswers[`[${person}_PASSPORT_SERIES]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_PASSPORT_SERIES]`, newValue)}
                    placeholder="СЕРІЯ"
                  />
                  <CustomInput
                    value={selectedAnswers[`[${person}_PASSPORT_NUMBER]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_PASSPORT_NUMBER]`, newValue)}
                    placeholder="Номер Паспорту"
                  />
                  <CustomInput
                    value={selectedAnswers[`[${person}_ID_NUMBER]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_ID_NUMBER]`, newValue)}
                    placeholder="Ідентифікаційний номер"
                  />
                </div>
                {/* Адреса Прописки */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <label className="w-full font-medium text-gray-800 text-l">
                    Адреса реєстрації {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}
                  </label>
                  <div className='w-full relative'>
                    <CustomInput
                      value={selectedAnswers[`[${person}_REGISTRATION_INDEX]`] || ''}
                      onChange={(newValue) => handleDataChange(`[${person}_REGISTRATION_INDEX]`, newValue)}
                      placeholder="Індекс"
                    />
                    <span className='absolute top-3 right-3 opacity-50 scale-75'>
                      <LocationIcon />
                    </span>
                  </div>
                  <CustomInput
                    value={selectedAnswers[`[${person}_REGISTRATION_CITY]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_REGISTRATION_CITY]`, newValue)}
                    placeholder="Місто"
                  />
                  <CustomInput
                    value={selectedAnswers[`[${person}_REGISTRATION_STREET]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_REGISTRATION_STREET]`, newValue)}
                    placeholder="Вулиця"
                  />
                  <CustomInput
                    inputWidth="50%"
                    value={selectedAnswers[`[${person}_REGISTRATION_HOUSE]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_REGISTRATION_HOUSE]`, newValue)}
                    placeholder="Будинок"
                  />
                  <CustomInput
                    inputWidth="50%"
                    value={selectedAnswers[`[${person}_REGISTRATION_FLAT]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_REGISTRATION_FLAT]`, newValue)}
                    placeholder="Квартира"
                  />
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      value={isAddressMatch} 
                      onChange={(e) => setIsAddressMatch(e.target.checked)} 
                    />
                    <label className='text-gray-500'>Співпадає з фактичною адресою проживання</label>
                  </div>
                </div>
                {/* Адреса Проживання */}
                {!isAddressMatch && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <label className="w-full text-l font-medium text-gray-800">
                      Адреса фактичного проживання {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}
                    </label>
                    <CustomInput
                      value={selectedAnswers[`[${person}_ACTUAL_CITY]`] || ''}
                      onChange={(newValue) => handleDataChange(`[${person}_ACTUAL_CITY]`, newValue)}
                      placeholder="Місто"
                    />
                    <CustomInput
                      value={selectedAnswers[`[${person}_ACTUAL_STREET]`] || ''}
                      onChange={(newValue) => handleDataChange(`[${person}_ACTUAL_STREET]`, newValue)}
                      placeholder="Вулиця"
                    />
                    <CustomInput
                      inputWidth="50%"
                      value={selectedAnswers[`[${person}_ACTUAL_HOUSE]`] || ''}
                      onChange={(newValue) => handleDataChange(`[${person}_ACTUAL_HOUSE]`, newValue)}
                      placeholder="Будинок"
                    />
                    <CustomInput
                      inputWidth="50%"
                      value={selectedAnswers[`[${person}_ACTUAL_FLAT]`] || ''}
                      onChange={(newValue) => handleDataChange(`[${person}_ACTUAL_FLAT]`, newValue)}
                      placeholder="Квартира"
                    />
                  </div>
                )}
                {/* Контактнi данi */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <label className="w-full text-l font-medium text-gray-800">
                    Контактнi данi {person === 'COMPLAINANT' ? 'позивача' : 'вiдповiдача'}
                  </label>
                  <CustomInput
                    value={selectedAnswers[`[${person}_PHONE_NUMBER]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_PHONE_NUMBER]`, newValue)}
                    placeholder="Номер телефону"
                  />
                  <CustomInput
                    value={selectedAnswers[`[${person}_EMAIL]`] || ''}
                    onChange={(newValue) => handleDataChange(`[${person}_EMAIL]`, newValue)}
                    placeholder="Електронна пошта"
                  />
                </div>
                <button type="button" onClick={() => {
                    window.scrollTo(0, 0);
                    handleNextStep();
                  }} className="w-full mt-6 bg-mainBlue text-white px-4 py-2 rounded-2xl">
                  Зберегти
                </button>
              </div>
            </form>
        </div>
    );
};

export default PersonalDataForm;