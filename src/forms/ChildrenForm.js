'use client';
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const ChildrenForm = ({selectedAnswers, handleAnswerChange, handleFieldChange}) => {

    const [showCalendar, setShowCalendar] = useState(false);

    const resetToMidnightUTC = (date) => {
      const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      return utcDate;
    };

    return (
        <div className="w-full">
            {/* ПIБ */}
              <div className='w-full'>
                <div className="flex flex-col gap-3">
                  <label className='text-l font-medium text-gray-800 text-black'><span style={{color: 'red'}}>* </span>ПIБ Дитини</label>
                  <input
                    value={selectedAnswers[`[СHILDREN_LASTNAME]`] || ''}
                    onChange={(e) => handleAnswerChange(`[СHILDREN_LASTNAME]`, e.target.value)}
                    type="text"
                    placeholder="Прізвище"
                    className="text-gray-900 border p-2 rounded-xl"
                  />
                  <input
                    value={selectedAnswers[`[СHILDREN_NAME]`] || ''}
                    onChange={(e) => handleAnswerChange(`[СHILDREN_NAME]`, e.target.value)}
                    type="text"
                    placeholder="Ім'я"
                    className="text-gray-900 border p-2 rounded-xl"
                  />
                  <input
                    value={selectedAnswers[`[СHILDREN_SURNAME]`] || ''}
                    onChange={(e) => handleAnswerChange(`[СHILDREN_SURNAME]`, e.target.value)}
                    type="text"
                    placeholder="По батькові"
                    className="text-gray-900 border p-2 rounded-xl"
                  />
                </div>
              </div>

              <div className='w-full mt-5'>
                <div className="flex flex-col gap-3">
                  <label className='text-l font-medium text-gray-800 text-black'><span style={{color: 'red'}}>* </span>Дата народження дитини</label>
                  <input
                    type="text"
                    readOnly
                    value={selectedAnswers[`[СHILDREN_BIRTHDATE]`] ? selectedAnswers[`[СHILDREN_BIRTHDATE]`] : ''}
                    onClick={() => setShowCalendar(!showCalendar)}
                    placeholder='Дата народженння'
                    className="w-full border p-2 rounded-xl text-gray-800 cursor-pointer"
                  />
                  {showCalendar && (
                    <div className="absolute z-10 bg-white border p-2 rounded-xl mt-2">
                        <DayPicker
                            mode="single"
                            selected={selectedAnswers[`[СHILDREN_BIRTHDATE]`] ? new Date(selectedAnswers[`[СHILDREN_BIRTHDATE]`]) : undefined}
                            onSelect={(date) => {
                                if (date) {
                                    const normalizedDate = resetToMidnightUTC(date);
                                    handleFieldChange(
                                        '[СHILDREN_BIRTHDATE]',
                                        normalizedDate.toISOString().split("T")[0],
                                        'none'
                                    );
                                    setShowCalendar(false);
                                }
                            }}
                        />
                    </div>
                  )}
                </div>
              </div>

        </div>
    );
};

export default ChildrenForm;