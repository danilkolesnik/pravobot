'use client';
import { useState } from "react";
import PlusIcon from "@component/assets/icons/plusIcon";
import CustomInput from "@component/ui/forms/CustomInput";
import DatePickerInput from "@component/ui/forms/DatePickerInput";

const ChildrenForm = () => {
    
    const [childrenForms, setChildrenForms] = useState([]);
    const [showCalendar, setShowCalendar] = useState({}); 

    const AddChild = () => {
        return (
            <div className="w-full flex flex-col">
                <label className='text-l font-medium text-gray-800 text-black'>Додати сумiсну дитину</label>
                <div className="mt-3 flex flex-row gap-3">
                    <div className='bg-white h-14 w-14 rounded-2xl flex flex-row justify-center items-center'>
                        <PlusIcon />
                    </div>
                    <select onChange={(e) => addChildForm(e.target.value)} className="grow w-full text-gray-800 p-2 rounded-xl">
                        <option value="">Оберіть стать дитини</option>
                        <option value="Хлопчик">Чоловiча</option>
                        <option value="Дівчинка">Жiноча</option>
                    </select>
                </div>
            </div>
        );
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
            {/* <AddChild /> */}
            {childrenForms.map((child, index) => (
                <div key={child.id} className='mb-8'>
                    <AddChild />
                    <div className="w-full flex flex-col gap-3 mt-6">
                        <label className='text-l font-medium text-gray-800 text-black'>ПIБ дитини</label>
                        <CustomInput 
                            placeholder={'Прiзвище'}
                        />
                        <CustomInput 
                            placeholder={'Iм\'я'}
                        />
                        <CustomInput 
                            placeholder={'По батьковi'}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-3 mt-6">
                        <label className='text-l font-medium text-gray-800 text-black'>Дата народження дитини</label>
                        <DatePickerInput

                            // showCalendar={showCalendar}
                        />
                    </div>
                    <div className="w-full flex flex-col gap-3 mt-6">
                        <label className='text-l font-medium text-gray-800 text-black'>Мiсце проживання дитини</label>
                        <select
                            className="w-full p-3 rounded-xl text-gray-800 focus:outline-none focus:ring-0"
                            defaultValue={1}
                        >
                            <option value={1}>
                                З ким проживає на даний момент
                            </option>
                        </select>
                    </div>
                    {/* {index === childrenForms.length - 1 && (
                        <div className='mt-8'>
                            <AddChild />
                        </div>
                    )} */}
                </div>
            ))}      
        </div>
    );
};

export default ChildrenForm;
