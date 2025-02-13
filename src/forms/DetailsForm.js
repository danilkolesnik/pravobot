'use client';
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import ChildrenForm from "./ChildrenForm";

const DetailsForm = ({ 
        progressIndex, 
        handleSetIndex,
        selectedAnswers, 
        setSelectedAnswers,
        documentData, 
        updatedSample, 
        setUpdatedSample 
    }) => {
    
    console.log('document Data', documentData);

    const componentMap = {
        "[CHILDREN]": ChildrenForm,
    };

    const [activeSection, setActiveSection] = useState(0);

    const [showCalendar, setShowCalendar] = useState(false);

    const handleAnswerChange = (questionShortcode, FinalField) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionShortcode]: FinalField,
        }));
    };

    const handleFieldChange = (fieldShortcode, value, validationType) => {
        console.log('VALIDATION');
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

    const handleNextStep = () => {
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

        const resetToMidnightUTC = (date) => {
            const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            return utcDate;
        };

        if (slide.Validation === "Date") {

            return (
                <div key={slide.id} className="w-full relative">
                    <input
                        type="text"
                        readOnly
                        value={selectedAnswers[slide.FieldShortcode] ? selectedAnswers[slide.FieldShortcode] : ''}
                        onClick={() => setShowCalendar(!showCalendar)}
                        placeholder={slide.FieldTitle}
                        className="w-full border p-2 rounded-xl text-gray-800 cursor-pointer"
                    />
                    {showCalendar && (
                        <div className="absolute z-10 bg-white border p-2 rounded-xl mt-2">
                            <DayPicker
                                mode="single"
                                selected={selectedAnswers[slide.FieldShortcode] ? new Date(selectedAnswers[slide.FieldShortcode]) : undefined}
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
                            />
                        </div>
                    )}
                </div>
            );
        } else {
            return (
                <input
                    key={slide.id}
                    value={selectedAnswers[slide.FieldShortcode] || ''}
                    onChange={(e) => handleFieldChange(slide.FieldShortcode, e.target.value, slide.Validation)}
                    type={slide.Validation === "digits_only" ? "number" : "text"}
                    placeholder={slide.FieldTitle}
                    className={`w-${slide.FieldWidth} border p-2 rounded-xl text-gray-800`}
                />
            );
        }
    };

    const combinedSlider = [
        ...documentData?.sectionsSlider,
        ...(documentData?.additionalSlider || []),
    ];

    useEffect(() => { 
        if (!documentData.sectionsSlider) handleSetIndex(progressIndex + 1)
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
                                    <span style={{ color: 'red' }}>*{' '}</span>{field.FieldSectionTitle}
                                </label>
                                <div className='w-full flex flex-wrap'>
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
                                            <span style={{ color: "red" }}>*{' '}</span>
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
                        onClick={() => {
                            window.scrollTo(0, 0);
                            handleNextStep();
                        }}
                        className="w-full mt-6 bg-mainBlue text-white px-4 py-2 rounded-2xl"
                    >
                        Далі
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DetailsForm;
