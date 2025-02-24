'use client';
import React, { useEffect, useState } from "react";
import CourtForm from "../addons/CourtForm";
import CustomInput from "@component/ui/forms/CustomInput";
import DatePickerInput from "@component/ui/forms/DatePickerInput";
import { resetToMidnightUTC } from "@component/services/resetToMidnightUTC";
import ChildrenForm from "../addons/ChildrenForm";
import SuccessIcon from "@component/assets/icons/successIcon";

const CustomData = ({ 
        progressIndex, 
        handleSetIndex,
        selectedAnswers, 
        setSelectedAnswers,
        documentData, 
        updatedSample, 
        setUpdatedSample 
    }) => {
    
    const addons = {
        "[CHILDREN]": { 
            title: "Діти",
            component: ChildrenForm,
        },
        "[COURT]": {
            title: "Суд",
            component: CourtForm,
        },
    };

    const [activeSection, setActiveSection] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [connectedAddons, setConnectedAddons] = useState({
        "[COURT]": true,
    });
    const [selectedAddons, setSelectedAddons] = useState({});
    const [completedSections, setCompletedSections] = useState({});

    useEffect(() => {
        console.log(Object.keys(connectedAddons)[activeSection - Object.keys(selectedAddons).length]);
        console.log(addons[Object.keys(connectedAddons)[0]]);
        console.log('index', activeSection - Object.keys(selectedAddons).length);
        console.log('vot:', Object.keys(connectedAddons)[activeSection - Object.keys(selectedAddons).length])
    });

    const combinedSections = [
        ...documentData?.sectionsSlider || [],
        ...Object.keys(connectedAddons).filter(key => connectedAddons[key]).map(key => ({
            SectionTitle: addons[key].title,
            id: key
        }))
    ];

    const renderFieldInput = (slide) => {
        if (slide.Validation === "Date") {
            return (
                <DatePickerInput
                    key={slide.id}
                    value={selectedAnswers[slide.FieldShortcode] ? selectedAnswers[slide.FieldShortcode] : ''}
                    onClick={() => setShowCalendar((prev) => !prev)}
                    onSelect={(date) => {
                        if (date) {
                            const normalizedDate = resetToMidnightUTC(date);
                            handleFieldChange(
                                slide.FieldShortcode,
                                normalizedDate.toISOString().split("T")[0],
                                slide.Validation
                            );
                            setShowCalendar(false);
                        }
                    }}
                    showCalendar={showCalendar}
                />
            );
        } else {
            return (
                <CustomInput 
                    key={slide.id}
                    value={selectedAnswers[slide.FieldShortcode] || ''}
                    onChange={(newValue) => handleFieldChange(slide.FieldShortcode, newValue, slide.Validation)}
                    type={slide.Validation === "digits_only" ? "number" : "text"}
                    placeholder={slide.FieldTitle}
                />
            );
        }
    };

    const handleFieldChange = (fieldShortcode, value, validationType) => {
        let validatedValue = value;

        if (validationType === "uppercase") {
            validatedValue = value.toUpperCase(); 
        } else if (validationType === "digits_only") {
            validatedValue = value.replace(/\D/g, "");
        }

        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [fieldShortcode]: validatedValue,
        }));
    };

    const handleAnswerChange = (questionShortcode, FinalField) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionShortcode]: FinalField,
        }));
    };

    const handleAddonChange = (addonCode, isChecked) => {
        setSelectedAddons(prev => ({
            ...prev,
            [addonCode]: isChecked
        }));

        if (isChecked) {
            setConnectedAddons(prev => ({
                ...prev,
                [addonCode]: true
            }));
        } else {
            setConnectedAddons(prev => {
                const newAddons = { ...prev };
                delete newAddons[addonCode];
                return newAddons;
            });
        }
    };

    const handleSave = () => {
        if (activeSection + 1 < combinedSections.length) {
            setActiveSection(activeSection + 1);
        } else {
            Object.keys(selectedAnswers).forEach((shortcode) => {
                updatedSample = updatedSample.replace(shortcode, selectedAnswers[shortcode]);
            });
            setUpdatedSample(updatedSample);
            handleSetIndex(progressIndex + 1);
        }

        setCompletedSections((prev) => ({
            ...prev,
            [combinedSections[activeSection].id]: true,
        }));
    };

    const requiredFields = [
        ...documentData?.sectionsSlider[activeSection]?.fieldsSlider.flatMap(field => 
            field.slider.map(slide => slide.FieldShortcode)
        ) || [],
        ...documentData?.sectionsSlider[activeSection]?.questionsSlider.flatMap(question => 
            question.slider.map(slide => question.QuestionShortcode)
        ) || []
    ];

    const isFormComplete = requiredFields.every(field => selectedAnswers[field]?.trim());

    return (
        <div className="flex flex-col md:flex-row gap-8 mt-8">
            {/* Navigation */}
            <nav className='w-full md:w-1/5 flex flex-col gap-2 items-left md:sticky' style={{ top: '15rem' }}>
                {combinedSections.map((section, index) => (
                    <button 
                        key={section.id}
                        onClick={() => setActiveSection(index)}
                        className={`flex flex-row items-center gap-3 p-3 text-gray-700 rounded-3xl text-sm tracking-wider font-medium text-left ${activeSection === index ? 'bg-white text-gray-700' : 'bg-gray-200 text-gray-800 opacity-50'}`}
                    >
                        <span>
                            {section.SectionTitle}
                        </span>
                        {completedSections[section.id] && <SuccessIcon />}
                    </button>
                ))}
            </nav>
            
            {/* Forms */}
            <form className="w-full">
                <div className="w-full md:w-3/6 md:ml-32">
                    {documentData?.sectionsSlider[activeSection]?.questionsSlider.length > 0 && (
                        documentData.sectionsSlider[activeSection]?.questionsSlider.map((question) => (
                            <div key={question.id}>
                                {/* FIELDS */}
                                {documentData.sectionsSlider &&
                                documentData.sectionsSlider[activeSection]?.fieldsSlider?.map((field) => (
                                    <div className="flex flex-wrap gap-3 mt-3" key={field.id}>
                                        <label className='text-l font-medium text-gray-800'>
                                            {field.FieldSectionTitle}
                                        </label>
                                        <div className='w-full flex flex-wrap gap-3'>
                                            {field.slider.map((slide) => renderFieldInput(slide))}
                                        </div>
                                    </div>
                                ))}
                                {/* QUESTIONS */}
                                {documentData.sectionsSlider &&
                                documentData.sectionsSlider[activeSection]?.questionsSlider?.map((question) => {
                                    const selectedFinalField = selectedAnswers[question.QuestionShortcode] || '';
                                    const selectedAnswer = question.slider.find(
                                        (s) => s.FinalField === selectedFinalField
                                    )?.Answer || '';

                                    return (
                                        <div className="mt-6 flex flex-wrap gap-3" key={question.id}>
                                            <label className="text-l font-medium text-gray-800">
                                                {question.Question}
                                            </label>
                                            <select
                                                className="w-full p-3 rounded-xl text-gray-800 focus:outline-none focus:ring-0"
                                                value={selectedAnswer}
                                                onChange={(e) => {
                                                    const selectedAnswer = e.target.value;
                                                    const finalField = question.slider.find(
                                                        (s) => s.Answer === selectedAnswer
                                                    )?.FinalField || '';
                                                    handleAnswerChange(question.QuestionShortcode, finalField);
                                                }}
                                            >
                                                <option value="" disabled>
                                                    Виберiть вiдповiдь
                                                </option>
                                                {question.slider.map((answer) => (
                                                    <option key={answer.id} value={answer.Answer}>
                                                        {answer.Answer}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    );
                                })}
                                {/* ADDON SELECT */}
                                {documentData?.sectionsSlider[activeSection]?.addonsSlider.map(addon => (
                                    <div key={addon.id} className="flex items-center mt-6">
                                        <input 
                                            type="checkbox" 
                                            id={addon.AddonCode} 
                                            checked={selectedAddons[addon.AddonCode] || false}
                                            onChange={(e) => handleAddonChange(addon.AddonCode, e.target.checked)} 
                                        />
                                        <label htmlFor={addon.AddonCode} className="ml-3 text-l font-medium text-gray-800 text-black">{addon.AddonHeader}</label>
                                    </div>
                                ))}
                            </div>
                        ))
                    )}
                    {/* Addons */}
                    {!documentData?.sectionsSlider[activeSection]?.questionsSlider?.length && (
                        Object.keys(connectedAddons)[activeSection - Object.keys(selectedAddons).length] ? (
                            React.createElement(
                            addons[Object.keys(connectedAddons)[activeSection - Object.keys(selectedAddons).length]]?.component,
                            { selectedAnswers: selectedAnswers, handleAnswerChange: handleAnswerChange, handleFieldChange: handleFieldChange }
                            )
                        ) : (
                            React.createElement(
                            addons[Object.keys(connectedAddons)[0]]?.component,
                            { selectedAnswers: selectedAnswers, handleAnswerChange: handleAnswerChange, handleFieldChange: handleFieldChange }
                            )
                        )
                    )}
                    {/* Save button */}
                    <button 
                        type="button" 
                        onClick={handleSave}
                        className={`w-full mt-10 mb-10 bg-mainBlue text-white px-4 py-2 rounded-2xl ${isFormComplete ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 opacity-50'}`}
                        disabled={!isFormComplete}
                    >
                        Зберегти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomData;
