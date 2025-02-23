import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import CalendarIcon from '@component/assets/icons/calendarIcon';

const DatePickerInput = ({ value, onClick, onSelect, showCalendar }) => {
    return (
        <div className="w-full relative">
            <input
                type="text"
                readOnly
                value={value}
                onClick={onClick}
                placeholder="Выберите дату"
                className="w-full p-2 rounded-xl text-gray-800 cursor-pointer focus:outline-none"
            />
            <span className='absolute top-3 right-3'>
                <CalendarIcon />
            </span>
            {showCalendar && (
                <div className="absolute z-10 bg-white border p-2 rounded-xl mt-2">
                    <DayPicker
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onSelect={onSelect}
                    />
                </div>
            )}
        </div>
    );
};

export default DatePickerInput; 