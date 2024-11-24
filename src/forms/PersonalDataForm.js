'use client';
import { useState } from "react";

const PersonalDataForm = ({ progressIndex, handleSetIndex }) => {
    
    const [isAddressMatch, setIsAddressMatch] = useState(false);

    return (
          <div className='flex flex-row gap-8 mt-8'>
            <nav className='w-3/5 flex flex-col gap-2 items-left'>
                <button className='p-2 text-left bg-mainBlue'>2.1 ДАННI ПОЗИВАЧА</button>
                <button className='p-2 text-left text-gray-500 border border-gray-400'>2.2 ДАННI ВIДПОВIДАЧА</button>
            </nav>

            <form className="w-full">
              {/* ПIБ Позивача */}
              <div className="flex flex-col gap-3">
                <label className='text-l text-black'><span style={{color: 'red'}}>* </span>ПIБ Позивача</label>
                <input
                  type="text"
                  placeholder="Ім'я"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Прізвище"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="По батькові"
                  className="border p-2 rounded"
                />
              </div>
              {/* Дата народження */}
              <div className="mt-6 flex flex-col gap-3">
                <label className='text-l text-black'><span style={{color: 'red'}}>* </span>Дата народження</label>
                <div className="grid md:grid-cols-3 gap-4">
                    <input
                    type="text"
                    placeholder="Рік"
                    className="border p-2 rounded"
                    />
                    <input
                    type="text"
                    placeholder="Місяць"
                    className="border p-2 rounded"
                    />
                    <input
                    type="text"
                    placeholder="День"
                    className="border p-2 rounded"
                    />
                </div>
              </div>
              {/* Паспортнi данi */}
              <div className="mt-6 flex flex-col gap-3">
                <label className='text-l text-black'><span style={{color: 'red'}}>* </span>Паспортнi данi</label>
                <input
                  type="text"
                  placeholder="СЕРІЯ"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Номер Паспорту"
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Ідентифікаційний номер"
                  className="border p-2 rounded"
                />
              </div>
              {/* Адреса Прописки Позивача */}
              <div className="mt-6 flex flex-wrap gap-3">
                <label className="w-full text-l text-black">
                  <span style={{ color: 'red' }}>* </span>Адреса Прописки Позивача
                </label>
                <input
                  type="text"
                  placeholder="Індекс"
                  className="grow-0 border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Місто"
                  className="grow border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Вулиця"
                  className="w-1/2 border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Будинок"
                  className="grow w-1/5 border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Квартира"
                  className="grow w-1/5 border p-2 rounded"
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
              {/* Адреса Проживання Позивача */}
              {!isAddressMatch && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <label className="w-full text-l text-black">
                    <span style={{ color: 'red' }}>* </span>Адреса Проживання Позивача
                  </label>
                  <input
                    type="text"
                    placeholder="Індекс"
                    className="grow-0 border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Місто"
                    className="grow border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Вулиця"
                    className="w-1/2 border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Будинок"
                    className="grow w-1/5 border p-2 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Квартира"
                    className="grow w-1/5 border p-2 rounded"
                  />
                </div>
              )}
              {/* Контактнi данi */}
              <div className="mt-6 flex flex-wrap gap-3">
                <label className="w-full text-l text-black">
                  <span style={{ color: 'red' }}>* </span>Контактнi данi
                </label>
                <input
                  type="text"
                  placeholder="Номер телефону"
                  className="w-full border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Електронна пошта"
                  className="w-full border p-2 rounded"
                />
              </div>
              <button type="button" onClick={() => handleSetIndex(progressIndex + 1)} className="w-full mt-6 bg-mainBlue text-white px-4 py-2 rounded">
                Далі
              </button>
            </form>
        </div>
    );
};

export default PersonalDataForm;