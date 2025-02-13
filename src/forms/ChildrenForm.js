'use client';
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const ChildrenForm = ({ selectedAnswers, handleAnswerChange, handleFieldChange }) => {
    const [childrenForms, setChildrenForms] = useState([1]);
    const [showCalendars, setShowCalendars] = useState({}); 

    const resetToMidnightUTC = (date) => {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    const addChildForm = () => {
        setChildrenForms([...childrenForms, childrenForms.length + 1]);
    };

    const removeChildForm = (index) => {
        // Удаляем данные о ребёнке из selectedAnswers
        const updatedAnswers = { ...selectedAnswers };
        childrenForms.forEach((childIndex, i) => {
            if (i + 1 >= index) {
                delete updatedAnswers[`[${childIndex}_СHILDREN_LASTNAME]`];
                delete updatedAnswers[`[${childIndex}_СHILDREN_NAME]`];
                delete updatedAnswers[`[${childIndex}_СHILDREN_SURNAME]`];
                delete updatedAnswers[`[${childIndex}_СHILDREN_BIRTHDATE]`];
            }
        });

        // Смещаем оставшихся детей
        const newChildrenForms = childrenForms
            .filter((childIndex) => childIndex !== index)
            .map((_, i) => i + 1);

        setChildrenForms(newChildrenForms);
        Object.keys(updatedAnswers).forEach((key) => {
            const match = key.match(/\[(\d+)_СHILDREN_(.+?)\]/);
            if (match) {
                const oldIndex = parseInt(match[1]);
                const newKey = key.replace(`[${oldIndex}_`, `[${oldIndex - 1}_`);
                updatedAnswers[newKey] = updatedAnswers[key];
                delete updatedAnswers[key];
            }
        });

        handleAnswerChange(updatedAnswers);
    };

    return (
        <div className="w-full">
            {childrenForms.map((childIndex) => (
                <div key={childIndex} className="border p-4 rounded-xl mb-5 relative">
                    <h3 className="font-bold text-lg">Дитина {childIndex}</h3>

                    {/* Кнопка удаления */}
                    <button
                        type="button"
                        onClick={() => removeChildForm(childIndex)}
                        className="absolute top-2 right-2 text-red-500"
                    >
                        🗑 Видалити
                    </button>

                    {/* ПІБ */}
                    <div className="flex flex-col gap-3">
                        <label className="text-l font-medium text-black">
                            <span style={{ color: 'red' }}>* </span>ПIБ Дитини
                        </label>
                        <input
                            value={selectedAnswers[`[${childIndex}_СHILDREN_LASTNAME]`] || ''}
                            onChange={(e) => handleAnswerChange(`[${childIndex}_СHILDREN_LASTNAME]`, e.target.value)}
                            type="text"
                            placeholder="Прізвище"
                            className="text-gray-900 border p-2 rounded-xl"
                        />
                        <input
                            value={selectedAnswers[`[${childIndex}_СHILDREN_NAME]`] || ''}
                            onChange={(e) => handleAnswerChange(`[${childIndex}_СHILDREN_NAME]`, e.target.value)}
                            type="text"
                            placeholder="Ім'я"
                            className="text-gray-900 border p-2 rounded-xl"
                        />
                        <input
                            value={selectedAnswers[`[${childIndex}_СHILDREN_SURNAME]`] || ''}
                            onChange={(e) => handleAnswerChange(`[${childIndex}_СHILDREN_SURNAME]`, e.target.value)}
                            type="text"
                            placeholder="По батькові"
                            className="text-gray-900 border p-2 rounded-xl"
                        />
                    </div>

                    {/* Дата народження */}
                    <div className="w-full mt-5">
                        <div className="flex flex-col gap-3">
                            <label className="text-l font-medium text-black">
                                <span style={{ color: 'red' }}>* </span>Дата народження дитини
                            </label>
                            <input
                                type="text"
                                readOnly
                                value={selectedAnswers[`[${childIndex}_СHILDREN_BIRTHDATE]`] || ''}
                                onClick={() =>
                                    setShowCalendars({ ...showCalendars, [childIndex]: !showCalendars[childIndex] })
                                }
                                placeholder="Дата народження"
                                className="w-full border p-2 rounded-xl text-gray-800 cursor-pointer"
                            />
                            {showCalendars[childIndex] && (
                                <div className="absolute z-10 bg-white border p-2 rounded-xl mt-2">
                                    <DayPicker
                                        mode="single"
                                        selected={
                                            selectedAnswers[`[${childIndex}_СHILDREN_BIRTHDATE]`]
                                                ? new Date(selectedAnswers[`[${childIndex}_СHILDREN_BIRTHDATE]`])
                                                : undefined
                                        }
                                        onSelect={(date) => {
                                            if (date) {
                                                const normalizedDate = resetToMidnightUTC(date);
                                                handleFieldChange(
                                                    `[${childIndex}_СHILDREN_BIRTHDATE]`,
                                                    normalizedDate.toISOString().split("T")[0],
                                                    'none'
                                                );
                                                setShowCalendars({ ...showCalendars, [childIndex]: false });
                                            }
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Кнопка добавления нового ребенка */}
            <button
                type="button"
                onClick={addChildForm}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-xl"
            >
                + Додати ще одну дитину
            </button>
        </div>
    );
};

export default ChildrenForm;
