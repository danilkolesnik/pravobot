'use client';
import React, { useEffect, useState } from "react";
import CustomInput from "@component/ui/forms/CustomInput";
import { resetToMidnightUTC } from "@component/services/resetToMidnightUTC";
import "react-day-picker/dist/style.css";
import ChildrenForm from "./addons/ChildrenForm";
import DatePickerInput from '../ui/forms/DatePickerInput';

const DetailsForm = ({ 
        progressIndex, 
        handleSetIndex,
        selectedAnswers, 
        setSelectedAnswers,
        documentData, 
        updatedSample, 
        setUpdatedSample 
    }) => {

    const componentMap = {
        "[CHILDREN]": ChildrenForm,
    };

    const [activeSection, setActiveSection] = useState(0);
    const [showCalendar, setShowCalendar] = useState(false);
    const [completedSteps, setCompletedSteps] = useState({});

    const handleAnswerChange = (questionShortcode, FinalField) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionShortcode]: FinalField,
        }));
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

    const handleSave = () => {
        window.scrollTo(0, 0);
        if (activeSection+1 < documentData.sectionsSlider.length) {
            setActiveSection(activeSection+1);
        } else {
            Object.keys(selectedAnswers).forEach((shortcode) => {
                updatedSample = updatedSample.replace(shortcode, selectedAnswers[shortcode]);
            });
            setUpdatedSample(updatedSample);
            handleSetIndex(progressIndex + 1);
        }
    };

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
    
    const requiredFields = documentData.sectionsSlider[activeSection]?.fieldsSlider.flatMap(field => 
        field.slider.map(slide => slide.FieldShortcode)
    ) || [];

    const isFormComplete = requiredFields.every((field) => selectedAnswers[field]?.trim());

    // console.log('requiredFields:', requiredFields);
    // console.log('isFormComplete:', isFormComplete);

    const combinedSlider = [
        ...documentData?.sectionsSlider,
        ...(documentData?.additionalSlider || []),
    ];

    useEffect(() => {
        if (!documentData.sectionsSlider) handleSetIndex(progressIndex + 1);
        console.log('documentData:', documentData);
    }, [documentData]);

    return (
        <div className="flex flex-col md:flex-row gap-8 mt-8">
            <nav className="w-full md:w-2/5 flex flex-col gap-2 items-left">
                {documentData && combinedSlider?.map((item, index) => (
                    <button 
                        key={item.id}
                        onClick={() => setActiveSection(index)}
                        className={`p-3 rounded-3xl text-xs tracking-wider font-medium text-left ${activeSection === index ? 'bg-mainBlue' : 'bg-gray-100 text-gray-400'}`}
                    >
                        {item.SectionTitle || item.AdditionalFieldName}
                    </button>
                ))}
            </nav>

            <form className="w-full">
                <div className='w-full md:w-3/5'>
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
                                            className="w-full border p-2 rounded-xl text-gray-800"
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

                        {!documentData.sectionsSlider[activeSection] && documentData?.additionalSlider?.map((item) => {
                            const ComponentToRender = componentMap[item.AdditionalFieldCode];
                            if (ComponentToRender) {
                                return <ComponentToRender selectedAnswers={selectedAnswers} handleAnswerChange={handleAnswerChange} handleFieldChange={handleFieldChange} key={item.id} />;
                            }
                        })}

                    <button
                        type="button"
                        onClick={handleSave}
                        className="w-full mt-6 bg-mainBlue text-white px-4 py-2 rounded-2xl"
                        disabled={!isFormComplete}
                    >
                        Далі
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DetailsForm;
