'use client';
import React, { useEffect, useState } from "react";
import CourtForm from "../addons/CourtForm";
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
    const [connectedAddons, setConnectedAddons] = useState({
        "[COURT]": true,
    });
    const [selectedAddons, setSelectedAddons] = useState({});

    useEffect(() => {
        console.log(documentData);
    }, []);

    const combinedSections = [
        ...documentData?.sectionsSlider || [],
        ...Object.keys(connectedAddons).filter(key => connectedAddons[key]).map(key => ({
            SectionTitle: addons[key].title,
            id: key
        }))
    ];

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

    useEffect(() => {
        console.log('connectedAddons', connectedAddons);
        console.log('selectedAddons', selectedAddons);
        console.log('evrika', activeSection - Object.keys(connectedAddons).length, Object.keys(connectedAddons)[activeSection - Object.keys(selectedAddons).length]);

    });
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
                        <SuccessIcon />
                    </button>
                ))}
            </nav>
            
            {/* Forms */}
            <form className="w-full">

                <div className="w-full md:w-4/5 flex flex-col gap-4">
                    {documentData?.sectionsSlider[activeSection]?.questionsSlider.length > 0 && (
                        documentData.sectionsSlider[activeSection]?.questionsSlider.map((question) => (
                            <div key={question.id}>
                            VOPROS
                            {documentData?.sectionsSlider[activeSection]?.addonsSlider.map(addon => (
                                <div key={addon.id} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={addon.AddonCode} 
                                        checked={selectedAddons[addon.AddonCode] || false}
                                        onChange={(e) => handleAddonChange(addon.AddonCode, e.target.checked)} 
                                    />
                                    <label htmlFor={addon.AddonCode} className="ml-2">{addon.AddonHeader}</label>
                                </div>
                            ))}
                            </div>
                        ))
                    )}
                    {!documentData?.sectionsSlider[activeSection]?.questionsSlider?.length && (
                        Object.keys(connectedAddons)[activeSection - Object.keys(selectedAddons).length] ? (
                            React.createElement(
                                addons[Object.keys(connectedAddons)[activeSection - Object.keys(selectedAddons).length]]?.component
                            )
                        ) : (
                            React.createElement(
                                addons[Object.keys(connectedAddons)[0]]?.component
                            )
                        )
                    )}
                </div>
            </form>
        </div>
    );
};

export default CustomData;
