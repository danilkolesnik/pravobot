'use client';
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import PlusIcon from "@component/assets/icons/plusIcon";

const ChildrenForm = ({ selectedAnswers, handleAnswerChange, handleFieldChange }) => {
    const [childrenForms, setChildrenForms] = useState([]);
    const [showCalendars, setShowCalendars] = useState({}); 

    const resetToMidnightUTC = (date) => {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    const addChildForm = (gender) => {
        const newIndex = childrenForms.length + 1;
        setChildrenForms([...childrenForms, { id: newIndex, gender }]);
    };

    const removeChildForm = (index) => {
        const updatedForms = childrenForms.filter((child) => child.id !== index);
        setChildrenForms(updatedForms);
    };

    return (
        <div className="w-full">
            {childrenForms.map((child, index) => (
                <div key={child.id} className="p-4 rounded-xl mb-5 relative border bg-gray-100">
                    <h3 className="font-bold text-lg">Дитина {index + 1} ({child.gender})</h3>
                    <button
                        type="button"
                        onClick={() => removeChildForm(child.id)}
                        className="absolute top-2 right-2 text-red-500"
                    >
                        🗑 Видалити
                    </button>
                    
                    <div className="flex flex-col gap-3 mt-3">
                        <label className="text-l font-medium text-black">
                            <span style={{ color: 'red' }}>* </span>ПIБ Дитини
                        </label>
                        <input type="text" placeholder="Прізвище" className="text-gray-900 border p-2 rounded-xl" />
                        <input type="text" placeholder="Ім'я" className="text-gray-900 border p-2 rounded-xl" />
                        <input type="text" placeholder="По батькові" className="text-gray-900 border p-2 rounded-xl" />
                    </div>
                    
                    <div className="w-full mt-5">
                        <label className="text-l font-medium text-black">
                            <span style={{ color: 'red' }}>* </span>Дата народження дитини
                        </label>
                        <input
                            type="text"
                            readOnly
                            placeholder="Дата народження"
                            className="w-full border p-2 rounded-xl text-gray-800 cursor-pointer"
                        />
                    </div>
                </div>
            ))}

            <div className="mt-3 flex flex-row gap-3">
                <div className='bg-white h-14 w-14 rounded-2xl flex flex-row justify-center items-center'>
                    <PlusIcon />
                </div>
                <select onChange={(e) => addChildForm(e.target.value)} className="grow w-full text-gray-800 p-2 rounded-xl">
                    <option value="">Оберіть стать дитини</option>
                    <option value="Хлопчик">Хлопчик</option>
                    <option value="Дівчинка">Дівчинка</option>
                </select>
            </div>
        </div>
    );
};

export default ChildrenForm;
